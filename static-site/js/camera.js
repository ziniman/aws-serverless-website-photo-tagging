const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const uploadButton = document.getElementById('upload');
const uploadFile = document.getElementById('inp');
const dataInput = document.getElementById('dataInput');
const imageInput = document.getElementById('imageInput');
const approval = document.getElementById('approval');

const constraints = {
  video: {width: 640, height: 480},
};

var vid_height = constraints['video']['height'];
var vid_width = constraints['video']['width'];

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
  });

captureButton.addEventListener('click', () => {
  // Draw the video frame to the canvas.
  imageInput.setAttribute('style', 'display:inline-block !important');
  console.log(vid_width);
  context.drawImage(player, 0, 0, vid_width, vid_height);
  player.srcObject.getVideoTracks().forEach(track => track.stop());
  dataInput.style.display = 'none';
});

function dataURLtoBlob(dataURL) {
  var img = atob(dataURL.split(',')[1]);
  var img_buffer = [];
  var i = 0;
  for(var i = 0; i < img.length; i++) {
    img_buffer.push(img.charCodeAt(i));
  }
  return new Blob([new Uint8Array(img_buffer)], {type: 'image/jpeg'});
}

uploadButton.addEventListener('change', () => {
   imageInput.setAttribute('style', 'display:inline-block !important');
   var file = uploadFile.files[0];
   console.log(file);
   var FR = new FileReader();
   FR.readAsDataURL(file);
   FR.addEventListener("load", function(e) {
     var img = new Image();
     img.src = e.target.result;

     img.onload = function() {
        drawImage(img, canvas);
     }
   });
   dataInput.style.display = 'none';
});


function drawImage(img, canvas) {
  image_height = img.height;
  image_width = img.width;
  new_height = image_height;
  new_width = image_width;
  console.log(image_width + "X" + image_height);
  if (image_width > image_height) {
    if (image_width>640) {
      new_height = image_height * (640/image_width);
      new_width = 640;
    }
  }
  else {
    if (image_height>480) {
      new_width = image_width * (480/image_height);
      new_height = 480;
    }
  }
  canvas.height = new_height;
  canvas.width = new_width;
  console.log(canvas.width + "X" + canvas.height);
  context.setTransform()
  context.drawImage(img, 0, 0, new_width, new_height);
}
