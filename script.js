const boardContainer = document.querySelector(".board-container");
function renderCells(){
    
    let row=0;
    let col=0;
    let color="black";
    for(let i=0;i<64;i++){
        const cell = document.createElement("div");
        row=Math.floor(i/8);
        col=i%8;
        // color=(row%2==0 ^ col%2==0)?"black":"white";
        color=((row+col)%2==0)?"black":"white";
        cell.classList.add("h-20","w-20","border-1");
        cell.id=`${row}${col}`;
        if(color=="black"){
            cell.classList.add("bg-black");
            color="white";
        }else{
            cell.classList.add("bg-white");
            color="black";
        }
        boardContainer.appendChild(cell);
    }
}
renderCells();
let redCells = [];
boardContainer.addEventListener("click",(e)=>{
    let element = e.target;
    console.log(element)
    let id = element.id;
    removeRed();
    makeRed(id);
})
function makeRed(id){
    console.log(id);
    let row = +id[0];
    let col = +id[1];
    //upLeft
    let tempRow = row;
    let tempCol = col;
    while(tempRow>=0 && tempCol>=0){
        if(!redCells.includes(`${tempRow}${tempCol}`)){
            redCells.push(`${tempRow}${tempCol}`)
        }
        let cell = document.getElementById(`${tempRow--}${tempCol--}`);
        if(cell.classList.contains("bg-black")){
            cell.classList.remove("bg-black");
        }else if(cell.classList.contains("bg-white")){
            cell.classList.remove("bg-white");
        }
        
        if(!cell.classList.contains("bg-red-500")){
            cell.classList.add("bg-red-500");
        }
        
    }
    
    //upRight
    tempRow = row;
    tempCol = col;
    while(tempRow>=0 && tempCol<=7){
        if(!redCells.includes(`${tempRow}${tempCol}`)){
            redCells.push(`${tempRow}${tempCol}`)
        }
        let cell = document.getElementById(`${tempRow--}${tempCol++}`);
        if(cell.classList.contains("bg-black")){
            cell.classList.remove("bg-black");
        }else if(cell.classList.contains("bg-white")){
            cell.classList.remove("bg-white");
        }
       
        if(!cell.classList.contains("bg-red-500")){
            cell.classList.add("bg-red-500");
            
        }
    }

    //downLeft
    tempRow = row;
    tempCol = col;
    while(tempRow<=7 && tempCol>=0){
        if(!redCells.includes(`${tempRow}${tempCol}`)){
            redCells.push(`${tempRow}${tempCol}`)
        }
        let cell = document.getElementById(`${tempRow++}${tempCol--}`);
        if(cell.classList.contains("bg-black")){
            cell.classList.remove("bg-black");
        }else if(cell.classList.contains("bg-white")){
            cell.classList.remove("bg-white");
        }
        
        if(!cell.classList.contains("bg-red-500")){
            cell.classList.add("bg-red-500");
        }
    }

    //downRight
    tempRow = row;
    tempCol = col;
    while(tempRow<=7 && tempCol<=7){
        if(!redCells.includes(`${tempRow}${tempCol}`)){
            redCells.push(`${tempRow}${tempCol}`)
        }
        let cell = document.getElementById(`${tempRow++}${tempCol++}`);
        if(cell.classList.contains("bg-black")){
            cell.classList.remove("bg-black");
        }else if(cell.classList.contains("bg-white")){
            cell.classList.remove("bg-white");
        }
        
        if(!cell.classList.contains("bg-red-500")){
            cell.classList.add("bg-red-500");
        }
        
    }
}

function removeRed(){
    if(redCells.length==0)return;
    redCells.forEach((id)=>{
        const cell = document.getElementById(id);
        let row = +id[0];
        let col = +id[1];
        if(cell.classList.contains("bg-red-500")){
            cell.classList.remove("bg-red-500");
        }
        if((row+col)%2==0){
            cell.classList.add("bg-black");
        }
        else{
            cell.classList.add("bg-white");
        }
    })
    redCells=[];
}