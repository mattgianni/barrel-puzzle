import { useState } from 'react'
import { GameState, GameStateManager } from '../lib/GameState'
import Peg from './Peg'
import Variations from './Variations'
import './Game.css'

const Game = () => {
    const [state, setState] = useState<GameState>(GameStateManager.createRandomInitialState)
    const [randomizeStart, setRandomizeStart] = useState<boolean>(false)

    const game = new GameStateManager(state, setState)

    return (
        <div className="outer-wrapper">
            <div className="gametitle">Cracker Barrel Puzzle</div>
            <hr />
            <div className="console-wrapper">
                <div className="game-wrapper">
                    <div className="game-row1">
                        <Peg index={0} game={game} />
                    </div>
                    <div className="game-row2">
                        <Peg index={1} game={game} />
                        <Peg index={2} game={game} />
                    </div>
                    <div className="game-row3">
                        <Peg index={3} game={game} />
                        <Peg index={4} game={game} />
                        <Peg index={5} game={game} />
                    </div>
                    <div className="game-row4">
                        <Peg index={6} game={game} />
                        <Peg index={7} game={game} />
                        <Peg index={8} game={game} />
                        <Peg index={9} game={game} />
                    </div>
                    <div className="game-row5">
                        <Peg index={10} game={game} />
                        <Peg index={11} game={game} />
                        <Peg index={12} game={game} />
                        <Peg index={13} game={game} />
                        <Peg index={14} game={game} />
                    </div>
                </div>
                <div className="stats-panel">
                    <p>Turn: {game.getTurnCount()}</p>
                    <input type="checkbox" onChange={() => setRandomizeStart(!randomizeStart)} checked={randomizeStart} />
                    <p>Pegs: {game.getPegCount()} remaining</p>
                    <p>Moves: {game.getMoveCount()} available</p>
                    <p>Score: {game.getScore()} points</p>
                    <button onClick={() => game.getHint()}>Hint</button> <button onClick={() => game.reset()}>Reset</button>
                </div>
            </div>
            <hr />
            <div className="pv-panel"><Variations pv={state.pv} /></div>
        </div>
    )
}

export default Game