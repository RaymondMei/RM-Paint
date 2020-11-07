var canvas = document.querySelector("#drawingCanvas");
var rect, scaleX, scaleY;

function loadFunc() {

    var context = canvas.getContext("2d");

    resizeWindow();
    
    var isDrawing = false;

    function startPos(e){
        if(e.button === 0){
            isDrawing = true;
            context.beginPath();
            draw(e);
        }
        
    }
    function endPos(){
        isDrawing = false;
        context.endPath();
    }

    function mousePos(e){
        rect = canvas.getBoundingClientRect();
        scaleX = canvas.width / rect.width;
        scaleY = canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        }
    }

    function draw(e){
        if(!isDrawing) return;
        
        context.lineWidth = 8;
        context.lineCap = "round";

        var pos = mousePos(e);

        context.lineTo(pos.x, pos.y);
        context.stroke();
        context.beginPath();
        context.moveTo(pos.x, pos.y);
    }
    
    canvas.addEventListener("mousedown", startPos);
    canvas.addEventListener("mouseup", endPos);
    canvas.addEventListener("mousemove", draw);

}

function resizeWindow() {
    canvas.width = window.innerWidth-50;
    canvas.height = window.innerHeight-50;
}

// eslint-disable-next-line no-unused-vars
function openToolMenu() {

    let toolMenuPositioner = document.querySelector("#toolMenuContainer_Positioner");
    let toolMenu = document.querySelector("#toolMenu");
    let closeBtn = document.querySelector("#toolMenuCloseBtn");


    toolMenuPositioner.style.pointerEvents = "auto";    

    // if(window.innerWidth >= 550){
    //     toolMenu.style.width = "250px";
    //     closeBtn.style.left = 250 + "px";
    // }else{
    //     toolMenu.style.width = "175px";
    //     closeBtn.style.left = 175 + "px";
    // }

    toolMenu.style.width = "250px";
    closeBtn.style.left = 250 + "px";
    toolMenu.style.boxShadow = "5px 0 5px 1px rgba(0, 0, 0, 0.8)";


    
    
}
// eslint-disable-next-line no-unused-vars
function closeToolMenu() {

    let toolMenuPositioner = document.querySelector("#toolMenuContainer_Positioner");
    toolMenuPositioner.style.pointerEvents = "none";

    let toolMenu = document.querySelector("#toolMenu");
    toolMenu.style.width = "0";
    toolMenu.style.boxShadow = "none";

    let closeBtn = document.querySelector("#toolMenuCloseBtn");
    closeBtn.style.left = -45 + "px";
}



window.addEventListener("load", loadFunc());
window.addEventListener("resize", resizeWindow());