const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');
const dataInput = document.getElementById('dataInput');
const imageInput = document.getElementById('imageInput');

const constraints = {
  video: true,
};

captureButton.addEventListener('click', () => {
  // Draw the video frame to the canvas.
  imageInput.style.display = 'inline-block';
  context.drawImage(player, 0, 0, canvas.width, canvas.height);
  player.srcObject.getVideoTracks().forEach(track => track.stop());
  dataInput.style.display = 'none';
});

// Attach the video stream to the video element and autoplay.
navigator.mediaDevices.getUserMedia(constraints)
  .then((stream) => {
    player.srcObject = stream;
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
