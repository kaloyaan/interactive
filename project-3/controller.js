const image = document.getElementById("image");
const circle = document.getElementById("circle");
const container = document.getElementById("container");
const caption = document.getElementById("caption");

// Define a 2D array of image sources
const images = [
[
  "black-1.png",
  "black-2.png",
  "black-3.png",
  "black-4.png",
  "black-5.png"],
["hi-1.png",
  "hi-2.png",
  "hi-3.png",
  "hi-4.png",
  "hi-5.png"],
["hi-black-1.png",
  "hi-black-2.png",
  "hi-black-3.png",
  "hi-black-4.png",
  "hi-black-5.png"],
["kare-1.png",
  "kare-2.png",
  "kare-3.png",
  "kare-4.png",
  "kare-5.png"],
["red-1.png",
  "red-2.png",
  "red-3.png",
  "red-4.png",
  "red-5.png"],
["white-1.png",
  "white-2.png",
  "white-3.png",
  "white-4.png",
  "white-5.png"
]];

const captions = ["Black suede with yellow leather back highlight and yellow shoelace hole. Black laces. Color combination idea came from browsing materials in Katia's studio. Worn 2021-2023.",
                  "High-top. Navy leather with off-white shoelaces (originally brown, replaced in 2022). Direct imitation of Vans Sk8-Hi, designers even copied the stripe. Worn 2021-2022.", "High-top. Dark navy leather with black laces. Present from dad who originally made them for himself. I didn't want to wear initially, didn't like the look. Ended up not taking them off all winter because they were so comfortable. Worn 2023.",
                  "White leather with embroidered piece of cordura fabric. Black cordura collar on back. Icon is Happy Mac face by Susan Kare. Other shoe has Sad Mac. Full family collaboration - I asked mom to do the embroidery, but the fabric was too thick and she wasn't happy with the roughness of the stitches. Dad ended up doing them himself. Worn 2022.",
                  "Red suede with red laces. Laces where originally white, replaced with red after the suede colored them too much. Metal shoelace hole caps. Has lasted through all the high school and college parties. Worn 2019-2022.", "White leather with blue suede collar on back. Suede collar on tongue as well. Other shoe has green collar. I used to pair them with a non-matching green-yellow pair of socks. Worn 2021-2022."];

let isDragging = false;

// Add listeners for mouse and touch events
circle.addEventListener("mousedown", () => {
    isDragging = true;
});

circle.addEventListener("touchstart", (event) => {
    isDragging = true;
    event.preventDefault();
});

document.addEventListener("mousemove", handleMove);
document.addEventListener("touchmove", handleMove);

document.addEventListener("mouseup", () => {
    isDragging = false;
});

document.addEventListener("touchend", () => {
    isDragging = false;
});

// Add listener for gyro controls
//window.addEventListener("deviceorientation", handleOrientation);

function handleMove(event) {
    if (isDragging) {
        const containerRect = container.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const circleRect = circle.getBoundingClientRect();
        const circleWidth = circleRect.width;
        const circleHeight = circleRect.height;

        // Calculate the position of the circle within the container based on the event type
        let x, y;
        if (event.touches) {
            x = event.touches[0].clientX - containerRect.left - (circleWidth / 2);
            y = event.touches[0].clientY - containerRect.top - (circleHeight / 2);
        } else {
            x = event.clientX - containerRect.left - (circleWidth / 2);
            y = event.clientY - containerRect.top - (circleHeight / 2);
        }

        // Constrain the position of the circle within the container
        x = Math.max(0, Math.min(x, containerWidth - circleWidth));
        y = Math.max(0, Math.min(y, containerHeight - circleHeight));

        // Set the position of the circle
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        // Calculate the row and column indexes based on the position of the circle within the container
        const row = Math.floor((y / containerHeight) * images.length);
        const column = Math.floor((x / containerWidth) * images[row].length);

        // Get the image source at the calculated row and column and set it as the src attribute of the img element
        const imageSrc = "img/transparent-bg/" + images[row][column];
        image.setAttribute("src", imageSrc);
        caption.textContent = captions[row];
    }
}
