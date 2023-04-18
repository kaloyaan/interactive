const image = document.getElementById("image");
const circle = document.getElementById("circle");

// Define a 2D array of image sources
const images = [
  ["white-1.jpeg", "white-2.jpeg", "white-3.jpeg", "white-4.jpeg", "white-5.jpeg"],
  ["blue-1.jpeg", "blue-2.jpeg", "blue-3.jpeg", "blue-4.jpeg", "blue-5.jpeg"],
];

let isDragging = false;

circle.addEventListener("mousedown", () => {
    isDragging = true;
});

document.addEventListener("mousemove", (event) => {
    if (isDragging) {
        const containerRect = image.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const containerHeight = containerRect.height;

        const circleRect = circle.getBoundingClientRect();
        const circleWidth = circleRect.width;
        const circleHeight = circleRect.height;

        // Calculate the position of the circle within the container
        let x = event.clientX - containerRect.left - (circleWidth / 2);
        let y = event.clientY - containerRect.top - (circleHeight / 2);

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
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
