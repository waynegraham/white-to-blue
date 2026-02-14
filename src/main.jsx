import { useCallback, useEffect, useState, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import TestPreparationGuide from './TestPreparationGuide.jsx'
import { ReusableTestMode } from './components/test-mode'
import movesData from './data/moves.json'

export function RouterApp() {
  const [pathname, setPathname] = useState(window.location.pathname)

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname)
    }

    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  const navigate = useCallback((to) => {
    if (window.location.pathname === to) {
      return
    }

    window.history.pushState({}, '', to)
    setPathname(to)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  if (pathname === '/test-mode') {
    return <ReusableTestMode moveSections={movesData} onExit={() => navigate('/')} />
  }

  if (pathname === '/test-preparation-guide') {
    return <TestPreparationGuide onNavigate={navigate} />
  }

  return <App onNavigate={navigate} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)
