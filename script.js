
var canvas = document.querySelector("#drawingCanvas");
var draft = document.querySelector("drawingCanvas_Draft");
var context = canvas.getContext("2d");
var context_Draft = canvas.getContext("2d");
var rect, scaleX, scaleY, startPos, lineSize=8, lineOpacity=1, alpha=0.4;

var drawMode = true;
var brushMode = true;
var rectMode = false;
var circMode = false;

//TOOL MENU
var toolMenuOpenBtn = document.querySelector("#toolMenuOpenBtn");
var toolMenuOpenBtn2 = document.querySelector("#toolMenuOpenBtn2");
var TM_paint = document.querySelector("#paintTool");
var TM_erase = document.querySelector("#eraseTool");
var TM_rect = document.querySelector("#rectTool");
var TM_circ = document.querySelector("#circTool");
var TM_lineSizeRangeText = document.querySelector("#lineSizeRangeText");
var TM_lineSizeRange = document.querySelector("#lineSizeRange");
var TM_lineOpacityRangeText = document.querySelector("#lineOpacityRangeText");
var TM_lineOpacityRange = document.querySelector("#lineOpacityRange");
var TM_shapeFill = document.querySelector("#shapeFill");
var TM_shapePaint = document.querySelector("#shapePaint");
var TM_colorPicker = document.querySelector("#colorPicker");
var TM_clear = document.querySelector("#clearTool");
var TM_download = document.querySelector("#downloadTool");
borderChange(TM_paint, true);
lineSizeFunc(); lineOpacityFunc();

function resizeWindow() {
    canvas.width = window.innerWidth-50;
    canvas.height = window.innerHeight-50;
}


function loadFunc() {

    resizeWindow();
    

    //DRAW STUFF    
    
    var isDrawing = false;

    function startDraw(e){
        if(e.button === 0){
            isDrawing = true;
            startPos = mousePos(e);
            context.beginPath();
            draw(e);
        }
        
    }
    function endDraw(){
        isDrawing = false;        
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
        
        var pos = mousePos(e);
        context.lineWidth = lineSize;
        context.lineCap = "round";
        context.strokeStyle = "black";

        if(drawMode){
            context.globalCompositeOperation = "source-over";
        }else{
            context.globalCompositeOperation = "destination-out";
        }
        
        if(rectMode) {
            // context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillRect(startPos.x, startPos.y, pos.x-startPos.x, pos.y-startPos.y);
            
        }else if(circMode) {
            

        }else if(brushMode) {
            context.lineTo(pos.x, pos.y);
            context.stroke();
            context.beginPath();
            context.moveTo(pos.x, pos.y);
        }
        
    }
    


    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mousemove", draw);


    //TOOL MENU STUFF
    
    toolMenuOpenBtn.addEventListener("click", openToolMenu);
    toolMenuOpenBtn2.addEventListener("click", openToolMenu);

    TM_paint.addEventListener("click", paintFunc);
    TM_erase.addEventListener("click", eraseFunc);
    TM_rect.addEventListener("click", rectFunc);
    TM_circ.addEventListener("click", circFunc);
    TM_lineSizeRange.addEventListener("change", lineSizeFunc);
    TM_lineOpacityRange.addEventListener("change", lineOpacityFunc);
    // TM_shapeFill.addEventListener("change", shapeFillFunc);
    // TM_shapePaint.addEventListener("change", shapePaintFunc);
    // TM_colorPicker.addEventListener("click", colorPickerFunc);
    TM_clear.addEventListener("click", clearFunc);
    TM_download.addEventListener("click", downloadFunc);

}




function openToolMenu() {

    let toolMenuPositioner = document.querySelector("#toolMenuContainer_Positioner");
    let toolMenu = document.querySelector("#toolMenu");
    let closeBtn = document.querySelector("#toolMenuCloseBtn");


    toolMenuPositioner.style.pointerEvents = "auto";    

    toolMenu.style.width = "250px";
    closeBtn.style.left = 250 + "px";
    toolMenu.style.boxShadow = "5px 0 5px 1px rgba(0, 0, 0, 0.8)";
   
}

function closeToolMenu() {

    let toolMenuPositioner = document.querySelector("#toolMenuContainer_Positioner");
    toolMenuPositioner.style.pointerEvents = "none";

    let toolMenu = document.querySelector("#toolMenu");
    toolMenu.style.width = "0";
    toolMenu.style.boxShadow = "none";

    let closeBtn = document.querySelector("#toolMenuCloseBtn");
    closeBtn.style.left = -45 + "px";

}

function borderChange(Element, on) {
    if(on){
        Element.style.border = "4px solid red";
    }else{
        Element.style.border = "4px solid gray";
    }
}
function paintFunc() {
    brushMode = true;
    rectMode = false;
    circMode = false;
    borderChange(TM_paint, brushMode);
    borderChange(TM_rect, rectMode);
    borderChange(TM_circ, circMode);
}
function eraseFunc() {
    drawMode = !drawMode;
    borderChange(TM_erase, !drawMode);
}
function rectFunc() {
    rectMode = true;
    brushMode = false;
    circMode = false;
    borderChange(TM_paint, brushMode);
    borderChange(TM_rect, rectMode);
    borderChange(TM_circ, circMode);
}
function circFunc() {
    cirMode = true;
    rectMode = false;
    brushMode = false;
    borderChange(TM_paint, brushMode);
    borderChange(TM_rect, rectMode);
    borderChange(TM_circ, circMode);
}
function lineSizeFunc() {
    lineSize = TM_lineSizeRange.value;
    TM_lineSizeRangeText.innerHTML = "Line Size: " + lineSize;
}
function lineOpacityFunc() {
    lineOpacity = TM_lineOpacityRange.value;
    TM_lineOpacityRangeText.innerHTML = "Line Opacity: " + lineOpacity;
    context.globalAlpha = lineOpacity/100;
}
function clearFunc() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}
function downloadFunc() {
    TM_download.setAttribute("download", "image.png");
    TM_download.setAttribute("href", canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
}


window.addEventListener("load", loadFunc());
window.addEventListener("resize", resizeWindow());

