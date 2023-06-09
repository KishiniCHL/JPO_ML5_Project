console.log('ml5 version:', ml5.version);

let objectDetector;
let status;
let objects = [];
let video;
let canvas, ctx;
const width = 480;
const height = 360;
let randomObject;
let countdown = 0;
let score = 0;

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
  // console.log(objectDetector)
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
    }
    
    detect();
  });
}

let randObjectSpan = document.querySelector('span');
let randObjectContainer = document.querySelector('#objectAleatoire');
// let randObjectMessage = document.getElementById('pointMessage');

function draw() {
  // Clear part of the canvas
  ctx.fillStyle = "#000000"
  ctx.fillRect(0,0, width, height);

  ctx.drawImage(video, 0, 0);

  for (let i = 0; i < objects.length; i += 1) {
      
    if (objects[i].label === randomObject) { // Check if object label matches randomObject
      ctx.fillStyle = "green"; 
      ctx.strokeStyle = "green"; 
      score++;
      // randObjectMessage.innerText = 'Bien joué ! Tu as montré le bon objet !';
      randObjectSpan.innerText = 'Voici le nouvel objet : ';
      // setTimeout(randObject, 3000);
      randObject()
    } else {
      ctx.fillStyle = "white"; 
      ctx.strokeStyle = "white"; 
    }

    ctx.font = "16px Arial";
    ctx.fillText(objects[i].label, objects[i].x + 4, objects[i].y + 16); 

    ctx.beginPath();
    ctx.rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    ctx.stroke();
    ctx.closePath();
  }
  
  let divScore = document.querySelector("#score");
  divScore.innerText = "Nombre de points : " + score;
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
  canvas.classList.add('webcam') ;
  canvas.width  = w;
  canvas.height = h;
  document.body.appendChild(canvas);
  return canvas;
}


// list of objects to choose from randomly
listObjects = ['cell phone', 'cat', 'bottle', 'car', 'airplane', 'dog', 'backpack', 'umbrella', 'handbag', 'skateboard', 'scissors', 'fork', 'knife', 'spoon', 'banana', 'apple', 'chair', 'window', 'door', 'laptop', 'tv', 'remote', 'mouse', 'book', 'keyboard', 'clock', 'toothbrush', 'donut', 'pizza', 'person']


function randObject() {
  let randomListObject = Math.floor(Math.random() * listObjects.length);
  randomObject = listObjects[randomListObject]

  randObjectContainer.innerText = randomObject;
}


// Reset points function
function reset() {
  score = 0
  // randObjectMessage.innerText = ''
  randObjectSpan.innerText = ''
  randObjectContainer.innerText = ''
}