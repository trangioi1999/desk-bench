import { Desktop } from './desktop/Desktop'
import { useDesktopEffects } from './store/useDesktopEffects'

function App() {
  useDesktopEffects()
  return <Desktop />
}

export default App
