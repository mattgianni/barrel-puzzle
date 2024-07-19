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

    return (
        <>
            <div
                className={`h-[23px] w-[23px] border-[1px] border-black border-solid rounded-[23px] m-[3px] text-center text-[0.6em] leading-[23px] align-middle p-0${
                    selected ? " bg-red-500 text-white font-bold" : ""
                }${!selected && selectable ? " hover:cursor-pointer" : ""}${
                    !selected && filled ? " bg-blue-800 text-white" : ""
                }`}
                onClick={() => game.handleClick(index)}
            >
                {index}
            </div>
        </>
    );
};

export default Peg;
