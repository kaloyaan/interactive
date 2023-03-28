document.body.onkeydown = function (keypress_event) {
    var key = keypress_event.key;
    document.getElementById("key_display").innerHTML = key;

    var new_element = document.createElement("h1");
    new_element.innerHTML = key;
    new_element.classList.add("xl-type");
    //    document.body.appendChild(new_element);

    if (key == "r") {
        document.body.style.backgroundColor = "pink";
    } else {
        document.body.style.backgroundColor = "white";
    }
};
