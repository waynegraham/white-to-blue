/* eslint-disable react/prop-types */
import { IoMicOutline, IoMicOffOutline } from "react-icons/io5";
import { GiBlackBelt } from "react-icons/gi";
import { useTestModeController } from "./useTestModeController";
import { buildYoutubeUrl } from "./testModeUtils";

const defaultVoiceCommands = {
  next: [/next move/, /\bnext\b/, /\bgo next\b/, /\bforward\b/],
  previous: [/last move/, /\bprevious\b/, /\bgo back\b/, /\bback\b/],
  exit: [/tap out/, /\bexit\b/, /\bquit\b/, /\bstop\b/, /leave test mode/],
};

const styles = {
  voiceIcon: "text-base",
  banner:
    "absolute left-1/2 top-4 z-20 w-[92%] max-w-xl -translate-x-1/2 rounded-full border border-white/20 bg-slate-900/90 px-6 py-3 text-center text-sm text-white shadow-lg backdrop-blur",
  baseScreen: "fixed inset-0 flex flex-col text-white",
  emptyScreen: "items-center justify-center bg-slate-950",
  completionScreen:
    "items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900",
  activeScreen: "bg-slate-950",
  topBar: "flex items-center justify-between px-6 py-6",
  badge: "text-xs uppercase tracking-[0.35em] text-purple-200",
  actionGroup: "flex items-center gap-3",
  buttonGhost:
    "rounded-full border border-white/30 px-4 py-2 text-sm text-white transition hover:bg-white/10",
  buttonGhostLarge:
    "rounded-full border border-white/30 px-5 py-2 text-white transition hover:bg-white/10",
  buttonPrimary:
    "rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-purple-100",
  buttonBorder:
    "rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10",
  buttonVideo:
    "rounded-full bg-purple-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-purple-400",
  floatingExit: "absolute right-6 top-6",
  floatingControls: "absolute left-6 top-6 flex items-center gap-3",
  completionWrap: "max-w-3xl px-6 text-center",
  completionLabel: "text-sm uppercase tracking-[0.3em] text-purple-200",
  completionTitle: "mt-6 text-4xl font-bold md:text-6xl",
  completionSubtitle: "mt-6 text-lg text-purple-100 md:text-2xl",
  completionButtons:
    "mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center",
  mainContent: "flex flex-1 items-center justify-center px-6",
  contentWrap: "w-full max-w-4xl",
  sectionLabel: "text-sm uppercase tracking-[0.3em] text-purple-300",
  moveTitle: "mt-6 text-4xl font-bold md:text-6xl",
  moveDescription: "mt-6 text-lg text-slate-200 md:text-2xl",
  moveActions: "mt-10 flex flex-wrap items-center gap-4",
  helperText: "text-sm text-slate-300",
  footerBar:
    "flex items-center justify-between border-t border-white/10 px-6 py-4 text-sm text-slate-300",
};

function VoiceButtonContent({ isListening }) {
  if (isListening) {
    return (
      <span className="flex items-center gap-2">
        <IoMicOffOutline className={styles.voiceIcon} />
        <span>Stop Voice</span>
      </span>
    );
  }

  return (
    <span className="flex items-center gap-2">
      <IoMicOutline className={styles.voiceIcon} />
      <span>Start Voice</span>
    </span>
  );
}

function Banner({ message }) {
  if (!message) {
    return null;
  }

  return <div className={styles.banner}>{message}</div>;
}

function GhostButton({ className = "", children, ...props }) {
  return (
    <button {...props} className={`${styles.buttonGhost} ${className}`.trim()}>
      {children}
    </button>
  );
}

function IconLabel({ icon: Icon, label }) {
  return (
    <span className="flex items-center gap-2">
      <Icon className={styles.voiceIcon} />
      <span>{label}</span>
    </span>
  );
}

export default function ReusableTestMode({
  moveSections,
  onExit,
  title = "Test Mode",
  jumpButtonLabel = "Jump to Purple",
  completionHeading = "Congratulations, you're now a purple belt.",
  completionSubheading =
    "Swipe down or left to review the last move, up or right to restart the sequence.",
  defaultMoveDescription = "Perform the move with control and intent.",
  getJumpIndex = (moves) => moves.findIndex((move) => move.bold === true),
  voiceCommands = defaultVoiceCommands,
}) {
  const {
    banner,
    containerRef,
    currentIndex,
    currentMove,
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
  } = useTestModeController({
    moveSections,
    getJumpIndex,
    onExit,
    voiceCommands,
  });

  const voiceButtonContent = <VoiceButtonContent isListening={isListening} />;
  const toggleVoice = isListening ? stopVoice : startVoice;
  const canJump = jumpIndex >= 0;

  if (totalMoves === 0) {
    return (
      <div ref={containerRef} className={`${styles.baseScreen} ${styles.emptyScreen}`}>
        <Banner message={banner} />
        <p className="text-2xl font-semibold">No moves available.</p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button onClick={toggleVoice} className={styles.buttonGhostLarge}>
            {voiceButtonContent}
          </button>
          <button onClick={handleExit} className={styles.buttonGhostLarge}>
            Exit Fullscreen
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div
        ref={containerRef}
        {...swipeHandlers}
        className={`${styles.baseScreen} ${styles.completionScreen}`}
      >
        <Banner message={banner} />
        <GhostButton onClick={handleExit} className={styles.floatingExit}>
          Exit Fullscreen
        </GhostButton>
        <div className={styles.floatingControls}>
          {canJump ? (
            <GhostButton onClick={jumpToTarget}>
              <IconLabel icon={GiBlackBelt} label={jumpButtonLabel} />
            </GhostButton>
          ) : null}
          <GhostButton onClick={toggleVoice}>{voiceButtonContent}</GhostButton>
        </div>
        <div className={styles.completionWrap}>
          <p className={styles.completionLabel}>Completion</p>
          <h1 className={styles.completionTitle}>{completionHeading}</h1>
          <p className={styles.completionSubtitle}>{completionSubheading}</p>
          <div className={styles.completionButtons}>
            <button onClick={() => setCurrentIndex(0)} className={styles.buttonPrimary}>
              Restart
            </button>
            <button onClick={goPrevious} className={styles.buttonBorder}>
              Previous Move
            </button>
          </div>
        </div>
      </div>
    );
  }

  const videoUrl = buildYoutubeUrl(currentMove?.youtube);
  const description = currentMove?.note?.trim() || defaultMoveDescription;

  return (
    <div
      ref={containerRef}
      {...swipeHandlers}
      className={`${styles.baseScreen} ${styles.activeScreen}`}
    >
      <Banner message={banner} />
      <div className={styles.topBar}>
        <div className={styles.badge}>{title}</div>
        <div className={styles.actionGroup}>
          {canJump ? (
            <GhostButton onClick={jumpToTarget}>
              <IconLabel icon={GiBlackBelt} label={jumpButtonLabel} />
            </GhostButton>
          ) : null}
          <GhostButton onClick={toggleVoice}>{voiceButtonContent}</GhostButton>
          <GhostButton onClick={handleExit}>Exit Fullscreen</GhostButton>
        </div>
      </div>

      <div className={styles.mainContent}>
        <div className={styles.contentWrap}>
          <p className={styles.sectionLabel}>{currentMove?.sectionLabel}</p>
          <h1 className={styles.moveTitle}>{currentMove?.name}</h1>
          <p className={styles.moveDescription}>{description}</p>
          <div className={styles.moveActions}>
            <a href={videoUrl} target="_blank" rel="noreferrer" className={styles.buttonVideo}>
              Watch Video
            </a>
            <div className={styles.helperText}>
              Swipe up or right for next, down or left for previous.
            </div>
            <div className={styles.helperText}>
              {voiceSupported
                ? "Tap Start Voice to enable voice commands."
                : "Voice control not supported on this browser."}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footerBar}>
        <span>
          Move {currentIndex + 1} of {totalMoves}
        </span>
        <span>
          {permissionDenied
            ? "Microphone access blocked."
            : fullscreenFailed
              ? "Fullscreen request blocked."
              : isSupported
                ? "Screen stays awake."
                : "Wake Lock not supported."}
        </span>
      </div>
    </div>
  );
}
