 //definations
 let board = document.querySelector(".board");
 let score = document.querySelector(".score") ;
 let direction = {x:0, y:0};
 let points = 0;
// X moves from Right to Left &
//Y moves from Up to Down
 let SnakeArr = [{x:13, y:15}]
 let Speed = 19;
 let LastPaintTime = 0;
 let food = {x:5,y:10}
//Main Function
const main = (timeForSpeed)=>{
    window.requestAnimationFrame(main);
    if((timeForSpeed - LastPaintTime)/1000 < 1/Speed)
    {return;}
    LastPaintTime = timeForSpeed;
    gameEngine();
}
//Check GameOver

const isGameOver = (Snake)=>{
    // If snake bump himself
    for(let i=1; i< SnakeArr.length; i++){
        if(Snake[i].x === Snake[0].x && Snake[i].y === Snake[0].y)
        {return true;}}

    //If Bump into Wall
    if(Snake[0].x >= 18 || Snake[0].x <= 0 || Snake[0].y >= 18 || Snake[0].y <= 0){
        return true;
    }
    return false;
}

//Function game Engine

const gameEngine = ()=>{

    //GameOver
    if(isGameOver(SnakeArr)){
        direction = {x:0,y:0};
        alert("Game Over. Press any Key to Play Again");
        SnakeArr = [{x:13, y:15}];
        points = 0;
    }

    //If you Eat Food

    if(SnakeArr[0].y === food.y && SnakeArr[0].x === food.x){
        SnakeArr.unshift({x: SnakeArr[0].x + direction.x, y: SnakeArr[0].y + direction.y});
        points++;
        score.innerText = `Score - ${points}`
        let a = 2; //Grid Row Position
        let b = 16; //Grid Column Position
        food = {x: Math.round(a + (b-a)* Math.random()),y: Math.round(a + (b-a)* Math.random()),}
    }

    //Move Snake

    for(let i = SnakeArr.length -2 ; i >= 0; i--){
        SnakeArr[i+1] = {...SnakeArr[i]};
    }
    SnakeArr[0].x += direction.x;
    SnakeArr[0].y += direction.y;


    //Display Snake
    board.innerHTML = "";
    SnakeArr.forEach((e,index)=>{
    snakeElement = document.createElement("div");
    snakeElement.style.gridColumnStart = e.x;
    snakeElement.style.gridRowStart = e.y;
    if(index === 0){
        snakeElement.classList.add("head");
    }
    else{
        snakeElement.classList.add("body");
    }
    board.appendChild(snakeElement);
})


//Display Food
let Food = document.createElement("div");
Food.style.gridRowStart = food.y;
Food.style.gridColumnStart = food.x;
Food.classList.add("food");
board.appendChild(Food);
}

//key Events

window.addEventListener("keydown",(e)=>{


    //Start Input Direction / Game Direction

    direction = {x:0,y:1}

    switch(e.key){
        case "ArrowUp":
        case "w":
            direction.y = -1;
            direction.x = 0;
            // X moves from Right to Left &
            //Y moves from Up to Down            
            console.log(e.key)
            break;

        case "ArrowDown":
            case "s":
            direction.x = 0;
            direction.y = 1;           
            // X moves from Right to Left &
            //Y moves from Up to Down
            console.log(e.key)
            break;

        case "ArrowRight":
            case "d":
            direction.x = 1;
            direction.y = 0;           
            // X moves from Right to Left &
            //Y moves from Up to Down
            console.log(e.key)
            break;

        case "ArrowLeft":
            case "a":   
            direction.x = -1;
            direction.y = 0;
            // X moves from Right to Left &
            //Y moves from Up to Down
            console.log(e.key)
            break;

        default:
            return;
    }    
})

//Render main Function Continuously
 window.requestAnimationFrame(main);