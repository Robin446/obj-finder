status = "";
video = "";
objects = [];

function preload(){
}
function setup(){
    canvas = createCanvas(480,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(480,380);
}

function start(){
    object_detector = ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML = "Status: detecting objects";
    inp = document.getElementById("inp").value ;
}

function modelloaded(){
    console.log("model is loaded");
    status = "true";
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
        object_detector.detect(video, gotresult)
        for(i=0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "status : objects detected";
            fill("tomato");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" "+percent+"%",objects[i].x +15,objects[i].y +15);
            noFill();
            stroke("lime");
            rect(objects[i].x,objects[i].y, objects[i].width,objects[i].height);
            if(objects[i].label == inp){
                video.stop();
                document.getElementById("object_found").innerHTML = inp +" found."
                synth = window.speechSynthesis();
                utterthis = new SpeechSynthesisUtterance(inp+" found");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("object_found").innerHTML = "object is not found"
            }
        }
    }
}


function gotresult(result,error){
    if(error){
        console.error(error);
    }
    console.log(result);
    objects = result;
}