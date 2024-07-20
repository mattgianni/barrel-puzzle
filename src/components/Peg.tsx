// import { MouseEventHandler } from 'react'

import { GameStateManager } from "../lib/GameState";

interface PegProps {
    index: number;
    game: GameStateManager;
}

const Peg = (props: PegProps) => {
    const index = props.index;
    const game = props.game;

    const selected = index == game.state.selected;
    const selectable = game.isSelectable(index);
    const filled = game.state.board[index];

    const base_css =
        "select-none border-[1px] border-black border-solid m-[3px] text-center text-[2vw] align-middle p-0 h-[5vw] w-[5vw] leading-[5vw] rounded-[5vw] sm:h-[4vw] sm:w-[4vw] sm:leading-[4vw] sm:rounded-[4vw] lg:h-[5vw] lg:w-[5vw] lg:leading-[5vw] lg:rounded-[5vw]";

    return (
        <>
            <div
                className={`${base_css}${
                    selected ? " bg-red-500 text-white font-bold" : ""
                }${
                    !selected && selectable && filled
                        ? " hover:cursor-pointer  bg-blue-500 text-white hover:bg-blue-300"
                        : ""
                }${
                    !selected && filled && !selectable
                        ? " bg-blue-800 text-white"
                        : ""
                }`}
                onClick={() => game.handleClick(index)}
            >
                {index}
            </div>
        </>
    );
};

export default Peg;
