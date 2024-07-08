objects= [];
imagen= "";
status= "";

function preload(){
    imagen= loadImage("dog_cat.jpg");
}
function setup(){
    canvas= createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector=ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML='status detectando objetos';
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status!=""){
        r = random(255)
        g = random(255)
        b = random(255)
        objectDetector.detect(video, gotResults);
        for(i=0;i<objects.length;i++){
            stroke(r,g,b);
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            porcentaje=floor(objects[i].confidence *100);
            text(objects[i].label+porcentaje+"%",objects[i].x,objects[i].y);  
            document.getElementById("status").innerHTML='Detectando objetos';    
            document.getElementById("number_of_objects").innerHTML = "Número de objetos detectados: "+ objects.length;
        }
    }
}
function modelLoaded(){
    console.log("modelo cargado");
    status=true;
    objectDetector.detect(video, gotResults);
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
