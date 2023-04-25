const image = document.getElementById("image");
const circle = document.getElementById("circle");

// Define a 2D array of image sources
const images = [
  ["white-1.jpeg", "white-2.jpeg", "white-3.jpeg", "white-4.jpeg", "white-5.jpeg"],
  ["blue-1.jpeg", "blue-2.jpeg", "blue-3.jpeg", "blue-4.jpeg", "blue-5.jpeg"],
];

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
window.addEventListener("deviceorientation", handleOrientation);

function handleMove(event) {
    if (isDragging || event.type === 'deviceorientation') {
        const containerRect = image.getBoundingClientRect();
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
        } else if (event.type === 'deviceorientation') {
            x = containerWidth * ((event.gamma + 90) / 180);
            y = containerHeight * ((event.beta + 90) / 180);
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
        const imageSrc = "img/" + images[row][column];
        image.setAttribute("src", imageSrc);
    }
}

function handleOrientation(event) {
    const containerRect = image.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const containerHeight = containerRect.height;

    const circleRect = circle.getBoundingClientRect();
    const circleWidth = circleRect.width;
    const circleHeight = circleRect.height;

    const maxRotation = 20;
    const x = containerWidth * (Math.max(-maxRotation, Math.min(maxRotation, event.gamma)) / (2 * maxRotation) + 0.5);
    const y = containerHeight * (Math.max(-maxRotation, Math.min(maxRotation, event.beta)) / (2 * maxRotation) + 0.5);

    // Constrain the position of the circle within the container
    const clampedX = Math.max(0, Math.min(x, containerWidth - circleWidth));
    const clampedY = Math.max(0, Math.min(y, containerHeight - circleHeight));

    // Set the position of the circle
    circle.style.left = `${clampedX}px`;
    circle.style.top = `${clampedY}px`;

    // Calculate the row and column indexes based on the position of the circle within the container
    const row = Math.floor((clampedY / containerHeight) * images.length);
    const column = Math.floor((clampedX / containerWidth) * images[row].length);

    // Get the image source at the calculated row and column and set it as the src attribute of the img element
    const imageSrc = "img/" + images[row][column];
    image.src = imageSrc;
}
