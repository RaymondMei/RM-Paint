var canvas = document.querySelector("#drawingCanvas");

function loadFunc() {

    var context = canvas.getContext("2d");

    resizeWindow();
    
    var isDrawing = false;

    function startPos(e){
        isDrawing = true;
        context.beginPath();
        draw(e);
    }
    function endPos(){
        isDrawing = false;
        context.endPath();
    }

    function mousePos(e){
        var rect = canvas.getBoundingClientRect();
        var scaleX = canvas.width / rect.width;
        var scaleY = canvas.height / rect.height;
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




window.addEventListener("load", loadFunc());
window.addEventListener("resize", resizeWindow());