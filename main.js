prediction = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});
camera = document.getElementById("camera");
Webcam.attach('#camera');


function take_snapshot() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="' + data_uri + '"/>';
    });
}

console.log('ml5 version:', ml5.version);

//create your model and store it in var classifier
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/OUGBxvyiC/model.json", modelLoaded);

function modelLoaded(){
    console.log("Model is loaded.");
}

function check(){
    pic = document.getElementById("captured_image");
    classifier.classify(pic, got_results);
}

function got_results(error, results){
    if (error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("status").innerHTML = results[0].label;
        final = results[0].label;

        if(final == "No mask"){
            document.getElementById("update_emoji").innerHTML = "&#x26d4";
            document.getElementById("entry_allowed").innerHTML = "Entry into office denied."
        }
        else{
            document.getElementById("update_emoji").innerHTML = "&#x1F637;";
            document.getElementById("entry_allowed").innerHTML = "Entry into office allowed."
        }
    }
}
