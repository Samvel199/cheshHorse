// Alt + Shift стрелка вверх / вниз______|| Скопировать строку сверху или снизу
// Alt + стрелка вверх / вниз____________|| Replace
// Ctrl D _______________________________|| Выделение целых слов
// Ctrl Backspace________________________|| Удаление целых слов
// Ctrl + Shift + стрелка вправо / влево_|| Выделение целых слов
// Ctrl +X_______________________________|| Удаление строки
// Shift + Alt___________________________|| Выделение столбца
// Shift + Alt + F_______________________|| Форматирование кода
//**************************************Git****************************
// git init 
// git status
// git add * 
// git commit -m "comment"
// git remote add origin https://github.com/Samvel199/cheshHorse.git
// git push -u origin master
// git pull origin master
let board = [[0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0]]
function possibleHorseStep(x, y) {
    let deltaX
    let deltaY
    let possibleHorseStepM = [];
    for (let pi = Math.PI / 6; pi < 2 * Math.PI; pi += Math.PI / 6) {
        deltaY = Math.round((Math.sin(pi) * Math.sqrt(5)))
        deltaX = Math.round((Math.cos(pi) * Math.sqrt(5)))
        if (deltaX && deltaY && board[x + deltaX] != undefined && board[y + deltaY] != undefined && board[x + deltaX][y + deltaY] != 10) {
            possibleHorseStepM.push(x + deltaX)
            possibleHorseStepM.push(y + deltaY)
        }
    }
    for (let i = 0; i < possibleHorseStepM.length; i = i + 2) {
        if (board[possibleHorseStepM[i]][possibleHorseStepM[i + 1]] >= 10) {
            possibleHorseStepM.splice(i, 2)
        }
    }
    return possibleHorseStepM
}
function evaluation() {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] < 10) {
                board[i][j] = possibleHorseStep(i, j).length / 2
            }
        }
    }
}
function horseMinStep(x, y) {
    evaluation()
    let possibleHorseStep_1 = possibleHorseStep(x, y)
    let minCord = [10, 0, 0]
    for (let i = 0; i < possibleHorseStep_1.length - 1; i += 2) {
        if (board[possibleHorseStep_1[i]][possibleHorseStep_1[i + 1]] < minCord[0]) {
            minCord[0] = board[possibleHorseStep_1[i]][possibleHorseStep_1[i + 1]]
            minCord[1] = possibleHorseStep_1[i]
            minCord[2] = possibleHorseStep_1[i + 1]
        }
    }
    return minCord
}
function chesBoardEdit(arr) {
    let d = document.querySelector(".chess")
    let str = ""
    for (let i = 0; i < 8; i++) {
        str += "<tr>";
        for (let j = 0; j < 8; j++) {
            str += "<td style='background-color: rgb(255, 255," + board[i][j] * 3 + ")'>" + (board[i][j] - 10) + "</td>"
        }
        str += "</tr>"
    }
    d.innerHTML = "";
    d.innerHTML = str;
}
let m = 0
function horseMovement(x, y) {
    let cord = horseMinStep(x, y)
    board[x][y] = m + 10
    m++
    if (m == 64) {
        chesBoardEdit(board)
        return
    }
    horseMovement(cord[1], cord[2])
}
horseMovement(0, 0)