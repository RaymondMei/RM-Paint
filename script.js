
function loadFunc(){
    const canvas = document.querySelector("#drawingCanvas");
    const context = canvas.getContext("2d");

    const canvasContainer = document.querySelector("#canvasContainer");
    canvas.width = canvasContainer.width;
    canvas.height = canvasContainer.height;
}


window.addEventListener("load", loadFunc());