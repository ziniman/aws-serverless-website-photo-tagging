AWS.config.region = 'eu-west-1'; // 1. Enter your region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: 'eu-west-1:3718ad59-2aba-4be2-9611-169ebfbb2707' // 2. Enter your identity pool
});
AWS.config.credentials.get(function(err) {
    if (err) alert(err);
    console.log(AWS.config.credentials);
});
var bucketName = 'reko-photo-tagging-demo'; // Enter your bucket name
var bucket = new AWS.S3({
    params: {
        Bucket: bucketName
    }
});
var fileChooser = canvas;
var button = document.getElementById('upload-button');
var results = document.getElementById('results');
var d = new Date();
var fileName = d.getTime();

button.addEventListener('click', function() {
    var dataBase64 = fileChooser.toDataURL("image/jpeg");
    dataBlob = dataURLtoBlob(dataBase64);
    var file = dataBlob;
    var fileType = 'image/jpeg';
    console.log(file);
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
                listObjs(); // this function will list all the files which has been uploaded
                //here you can also add your code to update your database(MySQL, firebase whatever you are using)
            }
        });
    } else {
        results.innerHTML = 'Nothing to upload.';
    }
}, false);

function listObjs() {
    var prefix = 'temp';
    bucket.listObjects({
        //Prefix: prefix
    }, function(err, data) {
        if (err) {
            results.innerHTML = 'ERROR: ' + err;
        } else {
            var objKeys = "";
            data.Contents.forEach(function(obj) {
                objKeys += obj.Key + "<br>";
            });
            results.innerHTML = objKeys;
        }
    });
}
