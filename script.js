console.log('ml5 version:', ml5.version, 'slay');


let objectDetector;
let status;
let objects = [];
let video;
let canvas, ctx;
const width = 480;
const height = 360;

async function make() {
  // get the video
  video = await getVideo();

  objectDetector = await ml5.objectDetector('cocossd', startDetecting)
  
  canvas = createCanvas(width, height);
  ctx = canvas.getContext('2d');
}


// when the dom is loaded, call make();
window.addEventListener('DOMContentLoaded', function() {
  make();
});

function startDetecting(){
  console.log('model ready')
  console.log(objectDetector)
  detect();
}

function detect() {
  objectDetector.detect(video, function(err, results) {
    if(err){
      console.log(err);
      return
    }
    objects = results;


    if(objects){
      draw();
      randObject();
      console.log(objects)
    }
    
    detect();
  });
}

function draw(){
  // Clear part of the canvas
  ctx.fillStyle = "#000000"
  ctx.fillRect(0,0, width, height);

  ctx.drawImage(video, 0, 0);
  for (let i = 0; i < objects.length; i += 1) {
      
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16); 

    ctx.beginPath();
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();
  }
}

// Helper Functions
async function getVideo(){
  // Grab elements, create settings, etc.
  const videoElement = document.createElement('video');
  videoElement.setAttribute("style", "display: none;"); 
  videoElement.width = width;
  videoElement.height = height;
  document.body.appendChild(videoElement);

  // Create a webcam capture
  const capture = await navigator.mediaDevices.getUserMedia({ video: true })
  videoElement.srcObject = capture;
  videoElement.play();

  return videoElement
}

function createCanvas(w, h){
  const canvas = document.createElement("canvas"); 
  canvas.width  = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas;
}

// // list of objects to choose from randomly
// listObjects = ['', '', '']
// let randomObject

// objects[i].label
// // if randomObject == objects[i].label {}

const listObjects = [
  "person",
  "bicycle",
  "car",
  "motorcycle",
  "airplane",
  "bus",
  "train",
  "truck",
  "boat",
  "traffic light",
  "fire hydrant",
  "stop sign",
  "parking meter",
  "bench",
  "bird",
  "cat",
  "dog",
  "horse",
  "sheep",
  "cow",
  "elephant",
  "bear",
  "zebra",
  "giraffe",
  "backpack",
  "umbrella",
  "handbag",
  "tie",
  "suitcase",
  "frisbee",
  "skis",
  "snowboard",
  "sports ball",
  "kite",
  "baseball bat",
  "baseball glove",
  "skateboard",
  "surfboard",
  "tennis racket",
  "bottle",
  "wine glass",
  "cup",
  "fork",
  "knife",
  "spoon",
  "bowl",
  "banana",
  "apple",
  "sandwich",
  "orange",
  "broccoli",
  "carrot",
  "hot dog",
  "pizza",
  "donut",
  "cake",
  "chair",
  "couch",
  "potted plant",
  "bed",
  "mirror",
  "dining table",
  "window",
  "desk",
  "toilet",
  "door",
  "TV",
  "laptop",
  "mouse",
  "remote",
  "keyboard",
  "cell phone",
  "microwave",
  "oven",
  "toaster",
  "sink",
  "refrigerator",
  "book",
  "clock",
  "vase"
];

function randObject(){
  console.log("list", objectDetector)
  console.log("SALUT", objects)
  
  const randomIndex = Math.floor(Math.random() * listObjects.length);
  const randomObject = listObjects[randomIndex];
  const randomObjectDiv = document.getElementById("random-object");
  randomObjectDiv.innerHTML = randomObject;
}