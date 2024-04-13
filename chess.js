const board = [];
const WIDTH = 8, HEIGHT = 8;
const boardE = document.getElementById('board');
const message = document.getElementById('message');

let turn = 'white';

const drawBoard = (board) => {
    let boardHTML = '';
    for (let i = 0; i < HEIGHT; i++) {
        board[i] = [];                                              // Create 2nd dimension for each row
        for (let j = 0; j < WIDTH; j++) {
            board[i][j] = '';                                       
            const element = document.createElement('div');            // Create a div element for each cell
            element.classList.add('cell');              
            (j + i) % 2 ? element.classList.add('black') : element.classList.add('white');  
            element.dataset.row = i;  // Add row and column data attributes
            element.dataset.col = j;
            console.log(element);
            element.addEventListener('click', cellClick, false);           // Add click event listener
            boardE.appendChild(element);                            // Add cell to the board
            console.log(boardE);
        }
    }
}
const placePieces = () => {
    const pawnCells = document.querySelectorAll(".cell[data-row='1'], .cell[data-row='6']");
    pawnCells.forEach((cell, index) => {
        cell.innerHTML = pawn;                                      // Add pawns to the board
    });
    const homeRows = document.querySelectorAll(".cell[data-row='0'], .cell[data-row='7']");
    homeRows.forEach((cell, index) => {
                                                                    // Add pieces to the board
        if (index === 0 || index === 7 || index === 8 || index === 15) {
            cell.innerHTML = rook;
        } else if (index === 1 || index === 6 || index === 9 || index === 14) {
            cell.innerHTML = knight;
        } else if (index === 2 || index === 5 || index === 10 || index === 13) {
            cell.innerHTML = bishop;
        } else if (index === 3 || index === 11) {
            cell.innerHTML = queen;
        } else {
            cell.innerHTML = king;
        }
    });
    const whiteRows = document.querySelectorAll(".cell[data-row='0'] svg, .cell[data-row='1'] svg");    // Fill white pieces
    whiteRows.forEach((cell, index) => {
        cell.setAttribute('fill', '#bbb');
    });
    const blackRows = document.querySelectorAll(".cell[data-row='6'] svg, .cell[data-row='7'] svg");    // Fill black pieces
    blackRows.forEach((cell, index) => {
        cell.setAttribute('fill', '#111');
    });
}
const validMoves = (piece, row, col) => {
    let moves = [];
    let dir = turn === 'white' ? 1 : -1;
    // a block for each piece type. should check bounds of board > 0 and < 7 and also detect if a piece is in the way using if instead of switch
    if (piece === 'pawn') {
        if (row + dir >= 0 && row + dir <= 7) {
            moves.push([row + dir, col]);
            if (row === 1 || row === 6) {
                moves.push([row + dir * 2, col]);
            }
        }
    } else if (piece === 'rook') {
        for (let i = 0; i < 8; i++) {
            moves.push([row, i]);
            moves.push([i, col]);
        }
    } else if (piece === 'knight') {
        if (row + 2 >= 0 && row + 2 <= 7 && col + 1 >= 0 && col + 1 <= 7 ) {
            moves.push([row + 2, col + 1]);
        }
        if (row + 2 >= 0 && row + 2 <= 7 && col - 1 >= 0 && col - 1 <= 7) {
            moves.push([row + 2, col - 1]);
        }
        if (row - 2 >= 0 && row - 2 <= 7 && col + 1 >= 0 && col + 1 <= 7) {
            moves.push([row - 2, col + 1]);
        }
        if (row - 2 >= 0 && row - 2 <= 7 && col - 1 >= 0 && col - 1 <= 7) {
            moves.push([row - 2, col - 1]);
        }
        if (row + 1 >= 0 && row + 1 <= 7 && col + 2 >= 0 && col + 2 <= 7) {
            moves.push([row + 1, col + 2]);
        }
        if (row + 1 >= 0 && row + 1 <= 7 && col - 2 >= 0 && col - 2 <= 7) {
            moves.push([row + 1, col - 2]);
        }
        if (row - 1 >= 0 && row - 1 <= 7 && col + 2 >= 0 && col + 2 <= 7) {
            moves.push([row - 1, col + 2]);
        }
        if (row - 1 >= 0 && row - 1 <= 7 && col - 2 >= 0 && col - 2 <= 7) {
            moves.push([row - 1, col - 2]);
        }
    } else if (piece === 'bishop') {
        for (let i = 0; i < 8; i++) {
            if (row + i >= 0 && row + i <= 7 && col + i >= 0 && col + i <= 7) {
                moves.push([row + i, col + i]);
            }
            if (row + i >= 0 && row + i <= 7 && col - i >= 0 && col - i <= 7) {
                moves.push([row + i, col - i]);
            }
            if (row - i >= 0 && row - i <= 7 && col + i >= 0 && col + i <= 7) {
                moves.push([row - i, col + i]);
            }
            if (row - i >= 0 && row - i <= 7 && col - i >= 0 && col - i <= 7) {
                moves.push([row - i, col - i]);
            }
        }
    } else if (piece === 'queen') { 
        for (let i = 0; i < 8; i++) {
            moves.push([row, i]);
            moves.push([i, col]);
        }
        for (let i = 0; i < 8; i++) {
            if (row + i >= 0 && row + i <= 7 && col + i >= 0 && col + i <= 7) {
                moves.push([row + i, col + i]);
            }
            if (row + i >= 0 && row + i <= 7 && col - i >= 0 && col - i <= 7) {
                moves.push([row + i, col - i]);
            }
            if (row - i >= 0 && row - i <= 7 && col + i >= 0 && col + i <= 7) {
                moves.push([row - i, col + i]);
            }
            if (row - i >= 0 && row - i <= 7 && col - i >= 0 && col - i <= 7) {
                moves.push([row - i, col - i]);
            }
        }
    } else if (piece === 'king') {
        if (row + 1 >= 0 && row + 1 <= 7) {
            moves.push([row + 1, col]);
        }
        if (row - 1 >= 0 && row - 1 <= 7) {
            moves.push([row - 1, col]);
        }
        if (col + 1 >= 0 && col + 1 <= 7) {
            moves.push([row, col + 1]);
        }
        if (col - 1 >= 0 && col - 1 <= 7) {
            moves.push([row, col - 1]);
        }
        if (row + 1 >= 0 && row + 1 <= 7 && col + 1 >= 0 && col + 1 <= 7) {
            moves.push([row + 1, col + 1]);
        }
        if (row + 1 >= 0 && row + 1 <= 7 && col - 1 >= 0 && col - 1 <= 7) {
            moves.push([row + 1, col - 1]);
        }
        if (row - 1 >= 0 && row - 1 <= 7 && col + 1 >= 0 && col + 1 <= 7) {
            moves.push([row - 1, col + 1]);
        }
        if (row - 1 >= 0 && row - 1 <= 7 && col - 1 >= 0 && col - 1 <= 7) {
            moves.push([row - 1, col - 1]);
        }
    }
    console.log(moves)
    return moves;
}

const highlightMoves = (cell) => {
    const row = cell.dataset.row;
    const col = cell.dataset.col;
    const piece = cell.firstElementChild.dataset.type;
    let moves = [];
    
    moves = validMoves(piece, parseInt(row), parseInt(col));

    console.log(moves);

    moves.forEach((move) => {
        let cell = document.querySelector(`.cell[data-row='${move[0]}'][data-col='${move[1]}']`);
        console.log(cell);
        cell.classList.add('highlight');
    });
}
const removeHightlights = () => {
    const highlighted = document.querySelectorAll('.highlight');
    highlighted.forEach((cell) => {
        cell.classList.remove('highlight');
    });
}   

const cellClick = (e) => {                                          
    let cell = e.currentTarget;

    removeHightlights();

    if (cell.firstElementChild && cell.firstElementChild.dataset.type != undefined) {
        highlightMoves(cell);
    }
}

drawBoard(board);
placePieces();
message.innerHTML = `White moves First`;