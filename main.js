objects= [];
imagen= "";
status= "";

function preload(){
    imagen= loadImage("dog_cat.jpg");
}
function setup(){
    canvas= createCanvas(640, 420);
    canvas.center();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML='status detectando objetos';
}
function draw(){
    image(imagen, 0, 0, 640, 420);
    if(status!=""){
        for(i=0;i=objectDetector.length;i++){
            stroke(21, 77, 189);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            porcentaje=floor(objects[i].confidence *100);
            text(objects[i].label+porcentaje+"%"+objects[i].x,objects[i].y);  
            document.getElementById("status").innerHTML='Detectando objetos';    
        }
    }
}
function modelLoaded(){
    console.log("modelo cargado");
    status=true;
    objectDetector.detect(imagen, gotResults);
}
function gotResults(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects= results;
    }
}