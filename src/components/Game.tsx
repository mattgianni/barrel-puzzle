import { useState, useTransition } from "react";
import { GameState, GameStateManager } from "../lib/GameState";
import Peg from "./Peg";
import github_logo from "../assets/github-mark.png";

const Game = () => {
    const [state, setState] = useState<GameState>(
        GameStateManager.createRandomInitialState
    );
    const game = new GameStateManager(state, setState);

    const [, startHint] = useTransition();
    const handleHintClick = () => {
        startHint(() => {
            game.getHint();
            return;
        });
    };

    return (
        <div className="w-full px-6 py-3 bg-white absolute left-0 right-0 m-auto">
            <div className="font-bold text-center m-2 text-[6vw] lg:text-[72px]">
                Cracker Barrel Puzzle
            </div>
            {/* <hr className="m-2 [border-style:inset] border" /> */}
            <div className="grid grid-cols-2 mx-0 my-auto justify-center">
                <div className="grid">
                    <div className="grid justify-center grid-cols-[repeat(1,_15%)]">
                        <Peg index={0} game={game} />
                    </div>
                    <div className="grid justify-center grid-cols-[repeat(2,_15%)]">
                        <Peg index={1} game={game} />
                        <Peg index={2} game={game} />
                    </div>
                    <div className="grid justify-center grid-cols-[repeat(3,_15%)]">
                        <Peg index={3} game={game} />
                        <Peg index={4} game={game} />
                        <Peg index={5} game={game} />
                    </div>
                    <div className="grid justify-center grid-cols-[repeat(4,_15%)]">
                        <Peg index={6} game={game} />
                        <Peg index={7} game={game} />
                        <Peg index={8} game={game} />
                        <Peg index={9} game={game} />
                    </div>
                    <div className="grid justify-center grid-cols-[repeat(5,_15%)]">
                        <Peg index={10} game={game} />
                        <Peg index={11} game={game} />
                        <Peg index={12} game={game} />
                        <Peg index={13} game={game} />
                        <Peg index={14} game={game} />
                    </div>
                </div>
                <div className="py-[5px] text-[3vw] lg:text-[41px] my-auto">
                    <div className="p-2">
                        <p>Pegs: {game.getPegCount()} remaining</p>
                        <p>Moves: {game.getMoveCount()} available</p>
                        <p>Score: {game.getScore()} points</p>
                    </div>
                    <div className="mt-3">
                        <button
                            className="text-[3vw] lg:text-[31px] m-1 mt-2 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-[2px] px-2 border border-blue-500 hover:border-transparent rounded"
                            onClick={handleHintClick}
                        >
                            Hint
                        </button>
                        <button
                            className="text-[3vw] lg:text-[31px] m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-[2px] px-2 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => game.reset()}
                        >
                            Reset
                        </button>
                        <button
                            className="text-[3vw] lg:text-[31px] m-1 bg-transparent hover:bg-blue-500 text-blue-700 hover:text-white py-[2px] px-2 border border-blue-500 hover:border-transparent rounded"
                            onClick={() => game.random_reset()}
                        >
                            Random
                        </button>
                    </div>
                </div>
            </div>

            <hr className="mt-4 sm:mt-6 [border-style:inset] border-2" />

            <div className="text-center">
                <a
                    className="p-2 underline text-blue-600 hover:text-blue-800 visited:text-purple-600 inline-flex self-center"
                    href="https://github.com/mattgianni/barrel-puzzle"
                    target="_blank"
                >
                    <img width="32" src={github_logo} />
                </a>
            </div>
        </div>
    );
};

export default Game;
