export class Move {
    constructor(public source: number, public capture: number, public target: number) { }
}

export interface Variation { movelist: Move[], score: number }

export class PV {
    current_movelist: Move[] = []
    best_variations: Variation[] = []

    constructor(public board: boolean[], public size = 5) { }

    makeMove = (move: Move) => { this.current_movelist.push(move) }
    unmakeMove = () => { this.current_movelist.pop() }
    evaluate = (score: number) => {
        if (this.best_variations.length < this.size) {
            this.best_variations.push({ movelist: [...this.current_movelist], score })
        } else {
            for (let index = 0; index < this.best_variations.length; index++) {
                if (score > this.best_variations[index].score) {
                    this.best_variations[index] = { movelist: [...this.current_movelist], score }
                    break
                }
            }
        }
    }
    sort = () => this.best_variations.sort((a, b) => b.score - a.score)

    static varString(movelist: Move[], maxlen: number = 4) {
        const elipsis = movelist.length > maxlen ? ', ...' : ''
        const movelist_string = movelist.map(move => `[${move.source} -> ${move.target}]`).slice(0, maxlen).join(', ')
        return `${movelist_string}${elipsis}`
    }
}

export class Engine {
    static i2r = new Map<number, number>([[0, 1], [1, 2], [2, 2], [3, 3], [4, 3], [5, 3], [6, 4], [7, 4], [8, 4], [9, 4], [10, 5], [11, 5], [12, 5], [13, 5], [14, 5]])
    static movegen_byindex = (board: boolean[], index: number): Move[] => {
        if (index < 0 || index > 14) return []
        if (!board[index]) return []

        const row = Engine.i2r.get(index)
        if (typeof row === 'undefined') return []

        let capture: number, target: number
        const moves: Move[] = []

        // top left
        capture = index - row
        target = capture - (row - 1)
        if (Engine.i2r.get(target) == row - 2 && board[capture] && !board[target]) {
            moves.push(new Move(index, capture, target))
        }

        // top right
        capture = index - row + 1
        target = capture - (row - 2)
        if (Engine.i2r.get(target) == row - 2 && board[capture] && !board[target]) {
            moves.push(new Move(index, capture, target))
        }

        // bottom left
        capture = index + row
        target = capture + (row + 1)
        if (Engine.i2r.get(target) == row + 2 && board[capture] && !board[target]) {
            moves.push(new Move(index, capture, target))
        }

        // bottom right
        capture = index + row + 1
        target = capture + (row + 2)
        if (Engine.i2r.get(target) == row + 2 && board[capture] && !board[target]) {
            moves.push(new Move(index, capture, target))
        }

        // directly left
        capture = index - 1
        target = capture - 1
        if (Engine.i2r.get(target) == row && board[capture] && !board[target]) {
            moves.push(new Move(index, capture, target))
        }

        // directly right
        capture = index + 1
        target = capture + 1
        if (Engine.i2r.get(target) == row && board[capture] && !board[target]) {
            moves.push(new Move(index, capture, target))
        }

        return moves
    }

    static movemapgen = (board: boolean[]): Map<number, Move[]> => {
        const movemap: Map<number, Move[]> = new Map<number, Move[]>()
        for (let index = 0; index < 15; index++) {
            movemap.set(index, Engine.movegen_byindex(board, index))
        }

        return movemap
    }

    static score = (board: boolean[]): number => 14 ** 2 - board.reduce((acc, val) => acc + (val ? 1 : 0), 0) ** 2

    static movegen = (board: boolean[]): Move[] => {
        const moves: Move[] = []
        for (let i = 0; i < 15; i++) {
            moves.push(...Engine.movegen_byindex(board, i))
        }
        return moves
    }

    static makeMove = (board: boolean[], move: Move): boolean[] => {
        const newboard = [...board]
        newboard[move.source] = false
        newboard[move.capture] = false
        newboard[move.target] = true
        return newboard
    }

    static search(board: boolean[], pv: PV) {
        const moves = Engine.movegen(board)
        if (moves.length == 0) {
            pv.evaluate(Engine.score(board))
            return
        }

        for (const move of moves) {
            pv.makeMove(move)
            Engine.search(Engine.makeMove(board, move), pv)
            pv.unmakeMove()
        }
    }

    static getPV = (board: boolean[], size: number = 5): PV => {
        const pv = new PV(board, size)
        Engine.search(board, pv)
        pv.sort()
        return pv
    }
}