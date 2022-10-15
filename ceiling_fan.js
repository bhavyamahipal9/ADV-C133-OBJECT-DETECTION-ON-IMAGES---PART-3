status = "";
img = "";
objects = [];

function preload(){
    img = loadImage('ceiling_fan.jpg');
}

function setup(){
    canvas = createCanvas(640, 420);
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd', modelLoaded);

    document.getElementById("status").innerHTML = "Detecting Objects";
}

function modelLoaded(){
    console.log("Model is loaded!");
    status = true;
}

function draw(){
    image(img, 0, 0, 640, 420);

    if(status != ""){
        objectDetector.detect(img, gotResult);

        for(i = 0; i < objects.length; i++){
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
        console.log(results);
        objects = results;
}
