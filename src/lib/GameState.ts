import { Engine, Move, Variation } from "./Engine";

export interface GameState {
    board: boolean[];
    selected: number;
    pv: Variation[];
}

export class GameStateManager {
    state: GameState;
    setState: (state: GameState) => void;
    moves: Map<number, Move[]> = new Map<number, Move[]>();

    constructor(state: GameState, setState: (state: GameState) => void) {
        this.setState = setState;
        this.state = state;
        this.moves = Engine.movemapgen(state.board);
    }

    reset = () => this.setState(GameStateManager.createInitialState());
    random_reset = () =>
        this.setState(GameStateManager.createRandomInitialState());

    getScore = () => Engine.score(this.state.board);

    isSelectable = (index: number) => {
        const filled = this.state.board[index];
        if (!filled && this.state.selected != -1) {
            const moves = this.moves.get(this.state.selected);
            if (typeof moves === "undefined") return false;

            for (const move of moves) {
                if (move.target == index && this.state.board[move.capture])
                    return true;
            }

            return false;
        }

        const moves = this.moves.get(index);
        return !(typeof moves === "undefined") && moves.length > 0;
    };

    handleClick = (index: number) => {
        console.log(`handleClick: index: ${index}`);
        if (this.isSelectable(index)) {
            if (index == this.state.selected)
                this.setState({ ...this.state, selected: -1 });
            else if (!this.state.board[index]) {
                // make move
                this.makeMove(index);
            } else {
                this.setState({ ...this.state, selected: index });
            }
        }
    };

    makeMove = (index: number) => {
        console.log(`makeMove: index: ${index}`);
        const moves = this.moves.get(this.state.selected);
        if (typeof moves === "undefined") return;
        for (const move of moves) {
            console.log(
                `makeMove: capture: ${move.capture}, target: ${move.target}`
            );
            if (move.target == index && this.state.board[move.capture]) {
                console.log(
                    `makeMove: changing state for capture: ${move.capture}, target: ${move.target}`
                );
                const board = [...this.state.board];
                board[this.state.selected] = false;
                board[move.capture] = false;
                board[move.target] = true;
                this.setState({ ...this.state, board, selected: -1, pv: [] });
                return;
            }
        }
    };

    getHint = async () => {
        console.log(`getHint: called`);
        const pv = Engine.getPV(this.state.board, 5);
        console.log(pv);
        if (pv.best_variations.length > 0)
            this.setState({
                ...this.state,
                pv: pv.best_variations,
                selected: pv.best_variations[0].movelist[0].source,
            });
        else this.setState({ ...this.state, pv: pv.best_variations });
    };

    getPV = (size: number = 5) => Engine.getPV(this.state.board, size);

    getMoveCount = () =>
        Array.from(this.moves.values()).reduce(
            (acc, val) => acc + val.length,
            0
        );
    getPegCount = () =>
        this.state.board.reduce((acc, val) => acc + (val ? 1 : 0), 0);
    getTurnCount = () => 14 - this.getPegCount();

    static createRandomInitialState = (): GameState => {
        const board = Array(15).fill(true);
        board[Math.floor(Math.random() * 15)] = false;
        return { selected: -1, board, pv: [] };
    };

    static createInitialState = (): GameState => ({
        selected: -1,
        board: [
            false,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
            true,
        ],
        pv: [],
    });
}
