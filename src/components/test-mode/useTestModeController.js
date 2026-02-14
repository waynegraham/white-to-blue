import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSwipeable } from "react-swipeable";
import { useWakeLock } from "react-screen-wake-lock";
import { flattenMoveSections } from "./testModeUtils";

const SWIPE_DISTANCE_THRESHOLD = 70;
const SWIPE_VELOCITY_THRESHOLD = 0.35;
const WHEEL_DISTANCE_THRESHOLD = 85;
const WHEEL_VELOCITY_THRESHOLD = 0.45;
const WHEEL_NAVIGATION_COOLDOWN_MS = 320;

export function useTestModeController({
  moveSections,
  getJumpIndex,
  onExit,
  voiceCommands,
}) {
  const containerRef = useRef(null);
  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const wheelGestureRef = useRef({ x: 0, y: 0, lastTime: 0 });
  const lastWheelNavigationRef = useRef(0);
  const wantsListeningRef = useRef(false);
  const stoppingRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullscreenFailed, setFullscreenFailed] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const [banner, setBanner] = useState(null);

  const { isSupported, request: requestWakeLock, release: releaseWakeLock } =
    useWakeLock();

  const flattenedMoves = useMemo(() => flattenMoveSections(moveSections), [moveSections]);
  const totalMoves = flattenedMoves.length;
  const jumpIndex = useMemo(
    () => (typeof getJumpIndex === "function" ? getJumpIndex(flattenedMoves) : -1),
    [flattenedMoves, getJumpIndex]
  );
  const isComplete = currentIndex >= totalMoves;
  const currentMove = flattenedMoves[currentIndex];

  const goNext = useCallback(() => {
    setCurrentIndex((index) => Math.min(index + 1, totalMoves));
  }, [totalMoves]);

  const goPrevious = useCallback(() => {
    setCurrentIndex((index) => Math.max(index - 1, 0));
  }, []);

  const jumpToTarget = useCallback(() => {
    if (jumpIndex >= 0) {
      setCurrentIndex(jumpIndex);
    }
  }, [jumpIndex]);

  const showBanner = useCallback((message) => {
    setBanner(message);
  }, []);

  const handleExit = useCallback(async () => {
    if (recognitionRef.current) {
      wantsListeningRef.current = false;
      stoppingRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch {
        // Ignore stop errors.
      }
      setIsListening(false);
    }
    if (document.fullscreenElement) {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore fullscreen exit errors.
      }
    }
    if (typeof onExit === "function") {
      onExit();
    }
  }, [onExit]);

  const goFromGesture = useCallback(
    (direction) => {
      if (direction === "Up" || direction === "Right") {
        goNext();
        return;
      }
      if (direction === "Down" || direction === "Left") {
        goPrevious();
      }
    },
    [goNext, goPrevious]
  );

  const swipeHandlers = useSwipeable({
    onSwiped: ({ dir, absX, absY, velocity }) => {
      const isHorizontalSwipe = absX >= absY;
      const distance = isHorizontalSwipe ? absX : absY;
      if (
        distance < SWIPE_DISTANCE_THRESHOLD &&
        velocity < SWIPE_VELOCITY_THRESHOLD
      ) {
        return;
      }
      goFromGesture(dir);
    },
    preventScrollOnSwipe: true,
    trackMouse: true,
    delta: 10,
  });

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    setVoiceSupported(Boolean(SpeechRecognition));
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      const now = performance.now();
      if (now - lastWheelNavigationRef.current < WHEEL_NAVIGATION_COOLDOWN_MS) {
        return;
      }

      const absX = Math.abs(event.deltaX);
      const absY = Math.abs(event.deltaY);
      if (absX === 0 && absY === 0) {
        return;
      }

      const axis = absX >= absY ? "x" : "y";
      const dominantDelta = axis === "x" ? event.deltaX : event.deltaY;
      const elapsed = Math.max(now - (wheelGestureRef.current.lastTime || now), 1);
      const velocity = Math.abs(dominantDelta) / elapsed;

      if (axis === "x") {
        wheelGestureRef.current.x += dominantDelta;
        wheelGestureRef.current.y = 0;
      } else {
        wheelGestureRef.current.y += dominantDelta;
        wheelGestureRef.current.x = 0;
      }
      wheelGestureRef.current.lastTime = now;

      const distance = Math.abs(
        axis === "x" ? wheelGestureRef.current.x : wheelGestureRef.current.y
      );
      if (
        distance < WHEEL_DISTANCE_THRESHOLD &&
        velocity < WHEEL_VELOCITY_THRESHOLD
      ) {
        return;
      }

      event.preventDefault();
      goFromGesture(
        axis === "x"
          ? dominantDelta > 0
            ? "Left"
            : "Right"
          : dominantDelta > 0
          ? "Down"
          : "Up"
      );
      lastWheelNavigationRef.current = now;
      wheelGestureRef.current = { x: 0, y: 0, lastTime: 0 };
    };

    const element = containerRef.current;
    if (!element) {
      return undefined;
    }

    element.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      element.removeEventListener("wheel", handleWheel);
    };
  }, [goFromGesture]);

  useEffect(() => {
    let isActive = true;

    const requestFullscreen = async () => {
      const element = containerRef.current;
      if (!element || !element.requestFullscreen) {
        return;
      }
      try {
        await element.requestFullscreen();
      } catch {
        if (isActive) {
          setFullscreenFailed(true);
        }
      }
    };

    requestFullscreen();

    if (isSupported) {
      requestWakeLock().catch(() => {});
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      isActive = false;
      document.body.style.overflow = previousOverflow;
      releaseWakeLock().catch(() => {});
    };
  }, [isSupported, requestWakeLock, releaseWakeLock]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        event.key === "ArrowUp" ||
        event.key === "PageDown" ||
        event.key === "ArrowRight"
      ) {
        goNext();
      }
      if (
        event.key === "ArrowDown" ||
        event.key === "PageUp" ||
        event.key === "ArrowLeft"
      ) {
        goPrevious();
      }
      if (event.key === "Escape") {
        handleExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, handleExit]);

  useEffect(() => {
    if (!banner) {
      return undefined;
    }
    const timeout = window.setTimeout(() => {
      setBanner(null);
    }, 3200);
    return () => window.clearTimeout(timeout);
  }, [banner]);

  useEffect(() => {
    return () => {
      if (restartTimeoutRef.current) {
        window.clearTimeout(restartTimeoutRef.current);
      }
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // Ignore cleanup errors.
        }
      }
    };
  }, []);

  const executeVoiceCommand = useCallback(
    (transcript) => {
      const matchesAny = (patterns) =>
        patterns.some((pattern) => pattern.test(transcript));

      if (matchesAny(voiceCommands?.next || [])) {
        goNext();
        return;
      }

      if (matchesAny(voiceCommands?.previous || [])) {
        goPrevious();
        return;
      }

      if (matchesAny(voiceCommands?.exit || [])) {
        handleExit();
      }
    },
    [goNext, goPrevious, handleExit, voiceCommands]
  );

  const getRecognition = useCallback(() => {
    if (recognitionRef.current) {
      return recognitionRef.current;
    }
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceSupported(false);
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (!result || !result[0]) {
        return;
      }
      executeVoiceCommand(result[0].transcript.toLowerCase());
    };

    recognition.onerror = (event) => {
      if (event?.error === "not-allowed" || event?.error === "service-not-allowed") {
        setPermissionDenied(true);
        wantsListeningRef.current = false;
        setIsListening(false);
        showBanner("Microphone permission denied. Enable access to use voice.");
        return;
      }
      showBanner("Voice recognition error. Retrying...");
    };

    recognition.onend = () => {
      if (stoppingRef.current) {
        stoppingRef.current = false;
        return;
      }
      if (!wantsListeningRef.current || permissionDenied) {
        setIsListening(false);
        return;
      }
      restartTimeoutRef.current = window.setTimeout(() => {
        try {
          recognition.start();
        } catch {
          // Ignore restart errors.
        }
      }, 600);
    };

    recognitionRef.current = recognition;
    return recognition;
  }, [executeVoiceCommand, permissionDenied, showBanner]);

  const startVoice = useCallback(() => {
    const recognition = getRecognition();
    if (!recognition) {
      showBanner("Voice control not supported on this browser.");
      return;
    }
    setPermissionDenied(false);
    wantsListeningRef.current = true;
    stoppingRef.current = false;
    try {
      recognition.start();
      setIsListening(true);
      showBanner("Voice listening started.");
    } catch {
      showBanner("Voice recognition error. Retrying...");
    }
  }, [getRecognition, showBanner]);

  const stopVoice = useCallback(() => {
    if (!recognitionRef.current) {
      return;
    }
    wantsListeningRef.current = false;
    stoppingRef.current = true;
    try {
      recognitionRef.current.stop();
    } catch {
      // Ignore stop errors.
    }
    setIsListening(false);
    showBanner("Voice listening stopped.");
  }, [showBanner]);

  return {
    banner,
    containerRef,
    currentIndex,
    currentMove,
    flattenedMoves,
    fullscreenFailed,
    goPrevious,
    handleExit,
    isComplete,
    isListening,
    isSupported,
    jumpIndex,
    jumpToTarget,
    permissionDenied,
    setCurrentIndex,
    startVoice,
    stopVoice,
    swipeHandlers,
    totalMoves,
    voiceSupported,
  };
}
