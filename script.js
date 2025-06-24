const boardContainer = document.querySelector(".board-container");
function renderCells() {
    let row = 0;
    let col = 0;
    let color = "";
    for (let i = 0; i < 64; i++) {
        const cell = document.createElement("div");
        row = Math.floor(i / 8);
        col = i % 8;
        // color=(row%2==0 ^ col%2==0)?"black":"white";
        color = ((row + col) % 2 == 0) ? "bg-black" : "bg-white";
        cell.classList.add("h-20", "w-20", "border-1", `${color}`);
        cell.id = `${row}${col}`;
        boardContainer.appendChild(cell);
    }
}
renderCells();
let redCells = [];
boardContainer.addEventListener("click", (e) => {
    let element = e.target;
    removeRed();
    makeRed(element.id);
})
function makeRed(id) {
    let row = +id[0];
    let col = +id[1];
    for (let dist = 0; dist <= 7; dist++) {
        let upLeft = ((row - dist >= 0) && (col - dist >= 0)) ? document.getElementById(`${row - dist}${col - dist}`) : "";
        let upRight = ((row - dist >= 0) && (col + dist <= 7)) ? document.getElementById(`${row - dist}${col + dist}`) : "";
        let downLeft = ((row + dist <= 7) && (col - dist >= 0)) ? document.getElementById(`${row + dist}${col - dist}`) : "";
        let downRight = ((row + dist <= 7) && (col + dist <= 7)) ? document.getElementById(`${row + dist}${col + dist}`) : "";
        if (upLeft) {
            redCells.push(`${row - dist}${col - dist}`)
            upLeft.classList.remove("bg-white", "bg-black");
            upLeft.classList.add("bg-red-500");
        }
        if (upRight) {
            redCells.push(`${row - dist}${col + dist}`)
            upRight.classList.remove("bg-white", "bg-black");
            upRight.classList.add("bg-red-500");
        }
        if (downLeft) {
            redCells.push(`${row + dist}${col - dist}`)
            downLeft.classList.remove("bg-white", "bg-black");
            downLeft.classList.add("bg-red-500");
        }
        if (downRight) {
            redCells.push(`${row + dist}${col + dist}`)
            downRight.classList.remove("bg-white", "bg-black");
            downRight.classList.add("bg-red-500");
        }
    }
}
function removeRed() {
    if (redCells.length == 0) return;
    redCells.forEach((id) => {
        const cell = document.getElementById(id);
        let row = +id[0];
        let col = +id[1];
        cell.classList.remove("bg-red-500");
        if ((row + col) % 2 == 0) {
            cell.classList.add("bg-black");
        }
        else {
            cell.classList.add("bg-white");
        }
    })
    redCells = [];
}