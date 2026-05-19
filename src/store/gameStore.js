import { create } from 'zustand'
import { generateQueue } from '../data/vehicles'
import { isVehicleValid } from '../data/rules'

const VEHICLES_PER_DAY = 8
const MAX_MISTAKES = 3

export const useGameStore = create((set, get) => ({
  screen: 'title',
  day: 1,
  score: 0,
  mistakes: 0,
  MAX_MISTAKES,
  queue: [],
  currentVehicle: null,
  decisions: [],
  lastResult: null,

  startGame: () => {
    set({ screen: 'briefing', day: 1, score: 0, mistakes: 0, decisions: [] })
  },

  beginShift: () => {
    const { day } = get()
    const queue = generateQueue(day, VEHICLES_PER_DAY)
    const [first, ...rest] = queue
    set({ screen: 'game', queue: rest, currentVehicle: first, decisions: [] })
  },

  decide: (action) => {
    const { currentVehicle, queue, score, mistakes, day, decisions } = get()
    if (!currentVehicle) return

    const shouldApprove = isVehicleValid(currentVehicle, day)
    const wasCorrect =
      (action === 'approve' && shouldApprove) ||
      (action === 'deny' && !shouldApprove)

    const newDecisions = [
      ...decisions,
      {
        plate: currentVehicle.plate,
        action: action === 'approve' ? 'APPROVED' : 'DENIED',
        correct: wasCorrect,
      },
    ]

    const newScore = score + (wasCorrect ? 10 : -5)
    const newMistakes = mistakes + (wasCorrect ? 0 : 1)
    const newLastResult = wasCorrect ? null : 'wrong'

    if (newMistakes >= MAX_MISTAKES) {
      set({ screen: 'gameover', score: newScore, mistakes: newMistakes, decisions: newDecisions, lastResult: 'gameover' })
      return
    }

    if (queue.length === 0) {
      set({
        screen: 'report',
        score: newScore,
        mistakes: newMistakes,
        currentVehicle: null,
        decisions: newDecisions,
        lastResult: newLastResult,
      })
      return
    }

    const [next, ...rest] = queue
    set({
      score: newScore,
      mistakes: newMistakes,
      currentVehicle: next,
      queue: rest,
      decisions: newDecisions,
      lastResult: newLastResult,
    })
  },

  nextDay: () => {
    const { day } = get()
    set({ day: day + 1, screen: 'briefing' })
  },

  clearLastResult: () => set({ lastResult: null }),

  resetGame: () => {
    set({ screen: 'title', day: 1, score: 0, mistakes: 0, queue: [], currentVehicle: null, decisions: [], lastResult: null })
  },
}))
