import { useGameStore } from './store/gameStore'
import TitleScreen from './screens/TitleScreen'
import DayBriefing from './screens/DayBriefing'
import GameScreen from './screens/GameScreen'
import ShiftReport from './screens/ShiftReport'
import GameOver from './screens/GameOver'
import BossFeedback from './components/BossFeedback'

const SCREENS = {
  title: TitleScreen,
  briefing: DayBriefing,
  game: GameScreen,
  report: ShiftReport,
  gameover: GameOver,
}

export default function App() {
  const screen = useGameStore((s) => s.screen)
  const Screen = SCREENS[screen]
  return (
    <>
      <Screen />
      <BossFeedback />
    </>
  )
}
