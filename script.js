//function that checks username and password if  they are correct a difficulty page will open
function show() {
    userName = document.getElementById('userName').value;
    console.log(userName);
    password = document.getElementById('password').value;
    if (userName != 'abcd') {
        document.getElementById('nameError').innerHTML = "Incorrect Username!"
    }
    else if (password != 1234) {
        document.getElementById('passError').innerHTML = "Incorrect Password!"
    }
    else {
        document.getElementById('greeting').innerHTML = 'wellcome ' + userName;
        document.getElementById("loginDiv").style.display = "none";
        document.getElementById("difficultyDiv").style.display = "block";
        document.getElementById("finishDiv").style.display = "none";
        document.getElementById("loseDiv").style.display = "none";
    }
}
//function thet return us to a difficlty page when the back button is pressed
function back() {
    document.getElementById("difficultyDiv").style.display = "block";
    document.getElementById("sudokuDiv").style.display = "none";
}
let arr1 = [[5, 3, 4, 6, 7, 8, 9, 1, 2],
[6, 7, 2, 1, 9, 5, 3, 4, 8],
[1, 9, 8, 3, 4, 2, 5, 6, 7],
[8, 5, 9, 7, 6, 1, 4, 2, 3],
[4, 2, 6, 8, 5, 3, 7, 9, 1],
[7, 1, 3, 9, 2, 4, 8, 5, 6],
[9, 6, 1, 5, 3, 7, 2, 8, 4],
[2, 8, 7, 4, 1, 9, 6, 3, 5],
[3, 4, 5, 2, 8, 6, 1, 7, 9]];

let arr2 = [[7, 5, 9, 1, 8, 2, 4, 6, 3],
[8, 1, 6, 3, 4, 7, 5, 2, 9],
[2, 3, 4, 5, 6, 9, 7, 1, 8],
[9, 6, 7, 2, 5, 8, 3, 4, 1],
[1, 4, 8, 7, 3, 6, 2, 9, 5],
[3, 2, 5, 9, 1, 4, 6, 8, 7],
[5, 8, 2, 6, 7, 1, 9, 3, 4],
[4, 9, 3, 8, 2, 5, 1, 7, 6],
[6, 7, 1, 4, 9, 3, 8, 5, 2]];

let arr3 = [[6, 3, 2, 7, 8, 1, 9, 4, 5],
[4, 8, 7, 5, 9, 6, 2, 1, 3],
[5, 1, 9, 2, 4, 3, 8, 7, 6],
[8, 6, 4, 3, 5, 2, 7, 9, 1],
[7, 5, 1, 9, 6, 8, 3, 2, 4],
[2, 9, 3, 1, 7, 4, 6, 5, 8],
[9, 4, 5, 6, 3, 7, 1, 8, 2],
[1, 7, 6, 8, 2, 5, 4, 3, 9],
[3, 2, 8, 4, 1, 9, 5, 6, 7]];

let sdkArr = [arr1, arr2, arr3];
let arr = [];
let empty = [];
let hints = 0;
let wrong = 0;

function sudoku() {
    let ind = Math.floor(Math.random() * (2 - 0));
    arr = [];
    arr = sdkArr[ind];
    hints = 0;
    wrong = 0;
    document.getElementById("hint").disabled = false;
    const sudokuBoard = document.querySelector("#puzzle");
    var child = sudokuBoard.lastElementChild;
    while (child) {
        sudokuBoard.removeChild(child);
        child = sudokuBoard.lastElementChild;
    }
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const inputElement = document.createElement("input");
            inputElement.setAttribute('id', "ind " + i + " " + j);
            inputElement.setAttribute('type', 'text')
            inputElement.setAttribute('maxlength', '1')
            inputElement.setAttribute('min', '1')
            inputElement.setAttribute('max', '9')
            inputElement.classList.add('numbers')
            inputElement.setAttribute('placeholder', arr[i][j]);
            inputElement.setAttribute('disabled', 'true');
            if (((j % 9 == 0 || j % 9 == 1 || j % 9 == 2) && i < 3) ||
                ((j % 9 == 6 || j % 9 == 7 || j % 9 == 8) && i < 3) ||
                ((j % 9 == 3 || j % 9 == 4 || j % 9 == 5) && (i > 2 && i < 6)) ||
                ((j % 9 == 0 || j % 9 == 1 || j % 9 == 2) && i > 5) ||
                ((j % 9 == 6 || j % 9 == 7 || j % 9 == 8) && i > 5)) {
                inputElement.classList.add('odd-section')
            } else { inputElement.style.background = 'white'; }
            sudokuBoard.appendChild(inputElement)
            document.getElementById("ind " + i + " " + j).onchange = function () { check("ind " + i + " " + j) };
            document.getElementById("ind " + i + " " + j).oninput = function () { this.value = this.value.replace(/[^1-9]/g, ''); }
        }
    }
}
//function that hides us numbers from the sudoku board according to the level of difficulty we cchose
function level(lvl) {
    document.getElementById("difficultyDiv").style.display = "none";
    document.getElementById("sudokuDiv").style.display = "block";
    sudoku();
    empty = [];
    for (let i = 0; i < 20 * lvl; i++) {
        let indexI = Math.floor(Math.random() * (9 - 0));
        let indexJ = Math.floor(Math.random() * (9 - 0));
        if (document.getElementById("ind " + indexI + " " + indexJ).getAttribute('placeholder') != '') {
            document.getElementById("ind " + indexI + " " + indexJ).setAttribute('placeholder', '');
            document.getElementById("ind " + indexI + " " + indexJ).disabled = false;
            //saving places of missing numbers 
            empty[i] = "ind " + indexI + " " + indexJ;
        } else {
            i--;
        }
    }
}
//function that clears numbers according to their position(numbers antered by the user )
function clearButton() {
    for (let i = 0; i < empty.length; i++) {
        document.getElementById(empty[i]).value = '';
        document.getElementById(empty[i]).style.borderColor = 'rgb(205, 157, 36)'
    }
}
//function that checks if sudoku is correct or not
function finish() {
    let flag = false;
    for (let i = 0; i < empty.length; i++) {
        let indI = empty[i].charAt(4);
        let indJ = empty[i].charAt(6);
        if (document.getElementById(empty[i]).value != arr[indI][indJ]) {
            document.getElementById(empty[i]).style.borderColor = 'red'
            flag = true;
        }
        else {
            document.getElementById("ind " + indI + " " + indJ).disabled = true;
            document.getElementById(empty[i]).style.color = 'green';
            document.getElementById(empty[i]).style.borderColor = 'rgb(205, 157, 36)'
        }
    }
    if (flag == false) {
        alert("YOU WIN");
        document.getElementById("finishDiv").style.display = "block";
        document.getElementById("sudokuDiv").style.display = "none";
    }
}
//function that mistakenly counts up to 3 mistakes
function check(id) {
    let indI = id.charAt(4);
    let indJ = id.charAt(6);
    if (document.getElementById(id).value != arr[indI][indJ]) {
        document.getElementById(id).style.borderColor = 'red';
        wrong++;
    }
    else {
        document.getElementById(id).style.borderColor = 'lime';
    }
    if (wrong > 2) {
        document.getElementById("loseDiv").style.display = "block";
        document.getElementById("sudokuDiv").style.display = "none";
    }
}
function hint() {
    if (hints <= 2) {
        let ind = Math.floor(Math.random() * ((empty.length - 1) - 0));
        let indI = empty[ind].charAt(4);
        let indJ = empty[ind].charAt(6);
        document.getElementById(empty[ind]).setAttribute('placeholder', arr[indI][indJ]);
        document.getElementById(empty[ind]).setAttribute('disabled', 'true');
        document.getElementById(empty[ind]).style.borderColor = 'blue';
        empty.splice(ind, 1);
    }
    else {
        document.getElementById("hint").setAttribute('disabled', 'true');
    }
    hints++;
}
function again(a) {
    if (a == 1) {
        document.getElementById("finishDiv").style.display = "none";
        document.getElementById("loseDiv").style.display = "none";
        document.getElementById("difficultyDiv").style.display = "block";
    }
    else if (a == 0) {
        document.getElementById("finishDiv").style.display = "none";
        document.getElementById("loseDiv").style.display = "none";
        document.getElementById("loginDiv").style.display = "block";
    }
}