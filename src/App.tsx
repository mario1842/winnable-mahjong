import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'
import { playMatchBurst, playTileSelect, playUiClick, playWin } from './audio/sounds'
import { Board } from './components/Board'
import { GameOverModal } from './components/GameOverModal'
import { Hud } from './components/Hud'
import { LayoutPicker } from './components/LayoutPicker'
import {
  applyHint,
  CLEAR_ANIMATION_MS,
  completeClear,
  createGame,
  selectTile,
  tick,
  undo,
  type GameState,
} from './engine/game'
import { generateBoard } from './engine/generate'
import type { LayoutDefinition } from './engine/layout'
import { layouts } from './layouts'

type Screen = 'menu' | 'play'

function deal(layout: LayoutDefinition): GameState {
  const tiles = generateBoard(layout)
  return createGame(tiles, layout.id, layout.name)
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('menu')
  const [layout, setLayout] = useState<LayoutDefinition | null>(null)
  const [state, setState] = useState<GameState | null>(null)
  const prevStatus = useRef<GameState['status'] | null>(null)

  const startLayout = useCallback((next: LayoutDefinition) => {
    playUiClick()
    setLayout(next)
    setState(deal(next))
    setScreen('play')
  }, [])

  const newDeal = useCallback(() => {
    if (!layout) return
    playUiClick()
    setState(deal(layout))
  }, [layout])

  const toMenu = useCallback(() => {
    playUiClick()
    setScreen('menu')
    setState(null)
  }, [])

  const onUndo = useCallback(() => {
    playUiClick()
    setState((s) => (s ? undo(s) : s))
  }, [])

  const onHint = useCallback(() => {
    playUiClick()
    setState((s) => (s ? applyHint(s) : s))
  }, [])

  const onSelectTile = useCallback((id: string) => {
    setState((s) => {
      if (!s) return s
      const next = selectTile(s, id)
      if (next === s) return s
      if (next.clearingIds.length > 0 && s.clearingIds.length === 0) {
        playMatchBurst()
      } else if (next.selectedId && next.selectedId !== s.selectedId) {
        playTileSelect()
      }
      return next
    })
  }, [])

  useEffect(() => {
    if (screen !== 'play') return

    let frame = 0
    let last = performance.now()

    const loop = (now: number) => {
      const delta = now - last
      last = now
      setState((prev) => {
        if (!prev || prev.status !== 'playing') return prev
        return tick(prev, delta)
      })
      frame = requestAnimationFrame(loop)
    }

    frame = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(frame)
  }, [screen])

  useEffect(() => {
    if (!state || state.clearingIds.length === 0) return
    const timer = window.setTimeout(() => {
      setState((prev) => (prev ? completeClear(prev) : prev))
    }, CLEAR_ANIMATION_MS)
    return () => window.clearTimeout(timer)
  }, [state?.clearingIds.join(',')])

  useEffect(() => {
    if (!state) {
      prevStatus.current = null
      return
    }
    if (prevStatus.current === 'playing' && state.status === 'won') {
      playWin()
    }
    prevStatus.current = state.status
  }, [state?.status])

  if (screen === 'menu' || !state) {
    return (
      <div className="app">
        <LayoutPicker layouts={layouts} onPick={startLayout} />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="play">
        <Hud
          state={state}
          onUndo={onUndo}
          onHint={onHint}
          onNewGame={newDeal}
          onChangeLayout={toMenu}
        />
        <Board
          tiles={state.tiles}
          selectedId={state.selectedId}
          hintIds={state.hintIds}
          clearingIds={state.clearingIds}
          onSelect={onSelectTile}
        />
        <GameOverModal state={state} onNewGame={newDeal} onChangeLayout={toMenu} />
      </div>
    </div>
  )
}
