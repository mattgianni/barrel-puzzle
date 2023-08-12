// import { MouseEventHandler } from 'react'

import { GameStateManager } from '../lib/GameState'
import './Peg.css'
interface PegProps {
    index: number,
    game: GameStateManager
}

const Peg = (props: PegProps) => {
    const index = props.index
    const game = props.game

    const selected = index == game.state.selected
    const selectable = game.isSelectable(index)
    const filled = game.state.board[index]

    const className = `peg${selected ? " selectedpeg" : ""}${selectable ? " selectablepeg" : ""}${filled ? " filledpeg" : ""}`
    // const status = game.state.board[index]

    return (
        <>
            <div className={className} onClick={() => game.handleClick(index)}>{index}</div>
        </>
    )
}

export default Peg