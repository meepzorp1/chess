/* Calculates moves for a given piece

    @param {string} piece - the piece to calculate moves for
    @param row - the row of the piece
    @param col - the column of the piece

    @return {array} - an two dimensional array of moves for the piece

    @checks
        - piece is a string
        - row is a number
        - col is a number
        - piece is a valid piece
        - row is a valid row
        - col is a valid column

    @move checks
        - stop if piece is in the way
        - stop if piece is the same color
        - stop if piece is out of bounds
        - stop if piece is in check
        - stop if piece is in checkmate
        - stop if piece is in stalemate

*/

export const getMoves = (board, piece, row, col, color, hasMoved) => {
    switch (piece) {
        case 'pawn':
            return getPawnMoves(board, row, col, color, hasMoved);
        case 'rook':
            return getRookMoves(board, row, col, color);
        case 'knight':
            return getKnightMoves(board, row, col, color);
        case 'bishop':
            return getBishopMoves(board, row, col, color);
        case 'queen':
            return getQueenMoves(board, row, col, color);
        case 'king':
            return getKingMoves(board, row, col, color);
        default:
            return [];
    }
}

const getPawnMoves = (board, row, col, color, hasMoved) => {
    {/* Pawn moves */}
    let direction;
    color === 'black' ? direction = 1 : direction = -1;
    let moves = [];

    if (board[row + direction][col] === null) moves.push([row + direction, col]);
    if (hasMoved === false && board[row + 2 * direction][col] === null) moves.push([row + 2 * direction, col]);
    if (board[row + direction][col-1] !== null 
        && col - 1 >= 0 
        && board[row + direction][col-1]?.color !== color) 
            moves.push([row + direction, col - 1]);
    if (board[row + direction][col+1] !== null 
        && col + 1 < 8 
        && board[row + direction][col + 1]?.color !== color) 
            moves.push([row + direction, col + 1]);

    return moves;
}

const getRookMoves = (board, row, col, color) => {
    let moves = [];

    // check north
    for (let i = row - 1; i >= 0; i--) {
        if (board[i][col] === null) moves.push([i, col]);
        else {
            if (board[i][col].color !== color) moves.push([i, col]);
            break;
        }
    }
    // check west
    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] === null) moves.push([row, i]);
        else {
            if (board[row][i].color !== color) moves.push([row, i]);
            break;
        }
    }
    // check south
    for (let i = row + 1; i < 8; i++) {
        if (board[i][col] === null) moves.push([i, col]);
        else {
            if (board[i][col].color !== color) moves.push([i, col]);
            break;
        }
    }
    // check east
    for (let i = col + 1; i < 8; i++) {
        if (board[row][i] === null) moves.push([row, i]);
        else {
            if (board[row][i].color !== color) moves.push([row, i]);
            break;
        }
    }

    return moves;
}

const getKnightMoves = (board, row, col, color) => {
    let moves = [];

    if (row - 2 >= 0 && col - 1 >= 0) {
        if (board[row - 2][col - 1] === null || board[row - 2][col - 1].color !== color) moves.push([row - 2, col - 1]);
    }   
    if (row - 2 >= 0 && col + 1 < 8) {
        if (board[row - 2][col + 1] === null || board[row - 2][col + 1].color !== color) moves.push([row - 2, col + 1]);
    }
    if (row - 1 >= 0 && col - 2 >= 0) {
        if (board[row - 1][col - 2] === null || board[row - 1][col - 2].color !== color) moves.push([row - 1, col - 2]);
    }   
    if (row - 1 >= 0 && col + 2 < 8) {
        if (board[row - 1][col + 2] === null || board[row - 1][col + 2].color !== color) moves.push([row - 1, col + 2]);
    }
    if (row + 1 < 8 && col - 2 >= 0) {
        if (board[row + 1][col - 2] === null || board[row + 1][col - 2].color !== color) moves.push([row + 1, col - 2]);
    }
    if (row + 1 < 8 && col + 2 < 8) {
        if (board[row + 1][col + 2] === null || board[row + 1][col + 2].color !== color) moves.push([row + 1, col + 2]);
    }
    if (row + 2 < 8 && col - 1 >= 0) {
        if (board[row + 2][col - 1] === null || board[row + 2][col - 1].color !== color) moves.push([row + 2, col - 1]);
    }
    if (row + 2 < 8 && col + 1 < 8) {
        if (board[row + 2][col + 1] === null || board[row + 2][col + 1].color !== color) moves.push([row + 2, col + 1]);
    }
    
    return moves;
}

const getBishopMoves = (board, row, col, color) => {
    let moves = [];

    // check north west
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }
    // check north east
    for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }
    // check south west
    for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }
    // check south east
    for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }

    return moves;
}

const getQueenMoves = (board, row, col, color) => {
    let moves = [];

    // check north
    for (let i = row - 1; i >= 0; i--) {
        if (board[i][col] === null) moves.push([i, col]);
        else {
            if (board[i][col].color !== color) moves.push([i, col]);
            break;
        }
    }
    // check west
    for (let i = col - 1; i >= 0; i--) {
        if (board[row][i] === null) moves.push([row, i]);
        else {
            if (board[row][i].color !== color) moves.push([row, i]);
            break;
        }
    }
    // check south
    for (let i = row + 1; i < 8; i++) {
        if (board[i][col] === null) moves.push([i, col]);
        else {
            if (board[i][col].color !== color) moves.push([i, col]);
            break;
        }
    }
    // check east
    for (let i = col + 1; i < 8; i++) {
        if (board[row][i] === null) moves.push([row, i]);
        else {
            if (board[row][i].color !== color) moves.push([row, i]);
            break;
        }
    }
    // check north west
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }
    // check north east
    for (let i = row - 1, j = col + 1; i >= 0 && j < 8; i--, j++) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }
    // check south west
    for (let i = row + 1, j = col - 1; i < 8 && j >= 0; i++, j--) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }
    // check south east
    for (let i = row + 1, j = col + 1; i < 8 && j < 8; i++, j++) {
        if (board[i][j] === null) moves.push([i, j]);
        else {
            if (board[i][j].color !== color) moves.push([i, j]);
            break;
        }
    }

    return moves;
}

const getKingMoves = (board, row, col, color) => {

    return [];
}
