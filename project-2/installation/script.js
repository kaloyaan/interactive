document.addEventListener("DOMContentLoaded", function () {

    var section = {
        start: 0,
        end: 2,
    };

    let randomNumber = 10;
    let videoDuration = 100; //updated after video load
    let numRepetitions = 2;
    let loopLength = 2; //in seconds
    let modeCounter = 10; //4 short, 1 long, 4 super short, 1 long
    let maxRepetitions = 4;
    let minRepetitions = 1;
    let lengthTime = 1;
    let minLengthTime = 0;

    // Get the video element
    var player = document.getElementById("player");

    function generateRandomNumber() {
        randomNumber = Math.floor(Math.random() * (videoDuration - 1));
        loopLength = Math.random() * lengthTime + minLengthTime; //update loop length
        numRepetitions = Math.floor(Math.random() * maxRepetitions) + minRepetitions;
        console.log("LoopLength: ", loopLength, "NumRepetitions: ", numRepetitions);
        section.start = randomNumber;
        section.end = randomNumber + loopLength;
    }

    function onPlayerReady() {
        player.currentTime = section.start;
        player.play();
        videoDuration = player.duration;
        console.log(videoDuration);
    }

    function onPlayerStateChange() {
        if (player.currentTime >= section.end) {
            if (numRepetitions > 0) {
                numRepetitions = numRepetitions - 1;
                console.log("NumRepetitions: ", numRepetitions);
                player.currentTime = section.start;
            } else {
                if (modeCounter <= 0) {
                    modeCounter = 10;
                } else {
                    modeCounter = modeCounter - 1;
                    switch (modeCounter) {
                        case 6:
                            console.log("LONG SCENE");
                            maxRepetitions = 0;
                            minRepetitions = 0;
                            lengthTime = 20;
                            minLengthTime = 10;
                            break;
                        case 5:
                        case 4:
                        case 3:
                        case 2:
                            console.log("SHORT SCENE");
                            maxRepetitions = 6;
                            minRepetitions = 3;
                            lengthTime = 0.2;
                            minLengthTime = 0;
                            break;
                        default:
                            console.log("MID SCENE");
                            maxRepetitions = 4;
                            minRepetitions = 1;
                            lengthTime = 2;
                            minLengthTime = 1;
                    }
                }
                console.log("RESTART");
                generateRandomNumber();
                player.currentTime = section.start;
            }
        }
    }

    function restartVideoSection() {
        var duration = section.end - section.start;
        setTimeout(onPlayerStateChange, duration * 1000);
    }

    // Wait for the video to load
    player.addEventListener("loadedmetadata", function () {
        onPlayerReady();
    });

    // Listen for the video's timeupdate event
    player.addEventListener("timeupdate", function () {
        onPlayerStateChange();
    });

    // Start the first section of the video
    //    player.addEventListener("canplay", function () {
    //        generateRandomNumber();
    //        player.currentTime = section.start;
    //    });
    // Handle the end of each loop
    player.addEventListener("ended", function () {
        restartVideoSection();
    });

});
