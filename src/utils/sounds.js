function ctx() {
  return new (window.AudioContext || window.webkitAudioContext)()
}

export function playWrongDecision() {
  const ac = ctx()
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.connect(gain)
  gain.connect(ac.destination)

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(380, ac.currentTime)
  osc.frequency.exponentialRampToValueAtTime(120, ac.currentTime + 0.45)

  gain.gain.setValueAtTime(0.28, ac.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.45)

  osc.start(ac.currentTime)
  osc.stop(ac.currentTime + 0.45)
  osc.onended = () => ac.close()
}

export function playGameOver() {
  const ac = ctx()
  // Sad trombone: Bb4 G4 Eb4 Bb3
  const notes = [466, 392, 311, 233]
  const dur = 0.38

  notes.forEach((freq, i) => {
    const osc = ac.createOscillator()
    const gain = ac.createGain()
    osc.connect(gain)
    gain.connect(ac.destination)

    osc.type = 'sawtooth'
    osc.frequency.value = freq

    const t = ac.currentTime + i * dur
    gain.gain.setValueAtTime(0, t)
    gain.gain.linearRampToValueAtTime(0.3, t + 0.04)
    gain.gain.setValueAtTime(0.3, t + dur - 0.08)
    gain.gain.exponentialRampToValueAtTime(0.001, t + dur)

    osc.start(t)
    osc.stop(t + dur)
    if (i === notes.length - 1) osc.onended = () => ac.close()
  })
}
