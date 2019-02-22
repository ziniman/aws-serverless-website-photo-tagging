AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: AWSPoolID
});
AWS.config.credentials.get(function(err) {
    if (err) alert(err);
    //console.log(AWS.config.credentials);
});

var bucketName = 'reko-photo-tagging-demo';
var bucket = new AWS.S3({
    params: {
        Bucket: bucketName
    }
});

var fileChooser = canvas;
var button = document.getElementById('upload-button');
var results = document.getElementById('results');
var d = new Date();
var fileName = 'IMG_' + d.getFullYear() + d.getMonth() + d.getDate() + '-' + d.getHours() + d.getMinutes() + d.getSeconds() + d.getMilliseconds();

button.addEventListener('click', function() {
    if (!approval.checked) {
      err = "File can't be uploaded without public usage consent";
      results.innerHTML = '<h4><span class="badge badge-danger">ERROR: ' + err + '</span></h4>';
    }
    else {
      button.style.display = 'none';
      var dataBase64 = fileChooser.toDataURL("image/jpeg");
      dataBlob = dataURLtoBlob(dataBase64);
      var file = dataBlob;
      var fileType = 'image/jpeg';
      if (file) {
          results.innerHTML = '';
          var objKey = fileName + '.jpg';
          var params = {
              Key: objKey,
              ContentType: fileType,
              CacheControl: 'max-age=3600',
              Body: file,
              ACL: 'public-read'
          };
          bucket.putObject(params, function(err, data) {
              if (err) {
                  results.innerHTML = 'ERROR: ' + err;
              } else {
                  results.innerHTML = '<h4><span class="badge badge-success">Uploaded <a style="color:white" href="image.html?id=' + objKey + '">' + objKey + '</a></span></h4>'
              }
          });
      } else {
          results.innerHTML = '<h4><span class="badge badge-warning">Nothing to upload.</span></h4>';
      }
    }
}, false);
