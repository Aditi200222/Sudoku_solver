var completion;
var solveBtn = document.getElementById("SolveButton");
var resetBtn = document.getElementById("ResetButton");
solveBtn.addEventListener('click', SolveSudoku);
resetBtn.addEventListener('click', ResetGrid);

var SIZE = 9;
var Grid = [];

function SolveSudoku() {
    var Sudoku = [];
    var tempRow = [];
    for (var i = 0; i < SIZE; i++)
        tempRow.push(0);
    for (i = 0; i < SIZE; i++)
        Sudoku.push(tempRow.slice());

    var str = "R1C1";
    for (i = 1; i <= SIZE; i++) {
        str = str.slice(0, 1) + i + str.slice(2, 3);
        for (var j = 1; j <= SIZE; j++) {
            str = str.slice(0, 3) + j;
            var value = Number(document.getElementById(str).value);
            if (value > 0)
                Sudoku[i - 1][j - 1] = value;
        }
    }

    if (SolveSudokuBacktracking(Sudoku)) {
        SolvedPuzzleOutput(Sudoku);
        document.getElementById("SolvedText").innerHTML = "Solved!";
    } else {
        document.getElementById("SolvedText").innerHTML = "No Solution";
    }
}

function SolveSudokuBacktracking(Sudoku) {
    var emptyCell = findEmptyCell(Sudoku);
    if (!emptyCell) {
        return true; // All cells are filled, puzzle is solved.
    }

    var [row, col] = emptyCell;
    for (var num = 1; num <= SIZE; num++) {
        if (isValidMove(Sudoku, row, col, num)) {
            Sudoku[row][col] = num;

            if (SolveSudokuBacktracking(Sudoku)) {
                return true;
            }

            Sudoku[row][col] = 0; // Backtrack if the current choice doesn't lead to a solution.
        }
    }
    return false; // No valid choice for this cell.
}

function findEmptyCell(Sudoku) {
    for (var row = 0; row < SIZE; row++) {
        for (var col = 0; col < SIZE; col++) {
            if (Sudoku[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null; // All cells are filled.
}

function isValidMove(Sudoku, row, col, num) {
    return (
        isRowSafe(Sudoku, row, num) &&
        isColSafe(Sudoku, col, num) &&
        isBoxSafe(Sudoku, row - (row % 3), col - (col % 3), num)
    );
}

function isRowSafe(Sudoku, row, num) {
    for (var col = 0; col < SIZE; col++) {
        if (Sudoku[row][col] === num) {
            return false;
        }
    }
    return true;
}

function isColSafe(Sudoku, col, num) {
    for (var row = 0; row < SIZE; row++) {
        if (Sudoku[row][col] === num) {
            return false;
        }
    }
    return true;
}

function isBoxSafe(Sudoku, boxStartRow, boxStartCol, num) {
    for (var row = 0; row < 3; row++) {
        for (var col = 0; col < 3; col++) {
            if (Sudoku[row + boxStartRow][col + boxStartCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function SolvedPuzzleOutput(Sudoku) {
    var str = "R1C1";
    for (var i = 1; i <= SIZE; i++) {
        str = str.slice(0, 1) + i + str.slice(2, 3);
        for (var j = 1; j <= SIZE; j++) {
            str = str.slice(0, 3) + j;
            var textField = document.getElementById(str);
            if (textField.value == '')
                textField.style.color = "#000000";
            textField.value = Sudoku[i - 1][j - 1];
            textField.readOnly = true;
        }
    }
}

function ResetGrid() {
    var str = "R1C1";
    for (var i = 1; i <= SIZE; i++) {
        str = str.slice(0, 1) + i + str.slice(2, 3);
        for (var j = 1; j <= SIZE; j++) {
            str = str.slice(0, 3) + j;
            var textField = document.getElementById(str);
            textField.readOnly = false;
            textField.value = "";
            textField.style.color = "red";
        }
    }
    document.getElementById("SolvedText").innerHTML = "&nbsp";
}

function limitKey(evt, num) {
    var key = window.evt ? evt.keyCode : evt.which;
    if (key < 49 || key > 57) return false;
    else if (num.length == 1) return false;
    else return true;
}
