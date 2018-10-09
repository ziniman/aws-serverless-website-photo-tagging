AWS.config.region = 'eu-west-1';
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:284ef18e-d632-4163-8b87-0f7ceeb8f99d'
});
AWS.config.credentials.get(function(err) {
    if (err) alert(err);
    console.log(AWS.config.credentials);
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
var fileName = 'IMG_' + d.getTime();

button.addEventListener('click', function() {
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
            Body: file,
            ACL: 'public-read'
        };
        bucket.putObject(params, function(err, data) {
            if (err) {
                results.innerHTML = 'ERROR: ' + err;
            } else {
                results.innerHTML = "Uploaded <a href='image.html?id=" + objKey + "'>" + objKey + "</a>"
            }
        });
    } else {
        results.innerHTML = 'Nothing to upload.';
    }
}, false);
