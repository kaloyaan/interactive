const image = document.getElementById("image");

// Define a 2D array of image sources
const images = [
  ["white-1.jpeg", "white-2.jpeg", "white-3.jpeg", "white-4.jpeg", "white-5.jpeg"],
  ["blue-1.jpeg", "blue-2.jpeg", "blue-3.jpeg", "blue-4.jpeg", "blue-5.jpeg"],
];

document.addEventListener("mousemove", (event) => {
    const x = event.clientX;
    const y = event.clientY;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Calculate the indexes of the row and column based on the X and Y positions of the mouse cursor
    const row = Math.floor((y / height) * images.length);
    const column = Math.floor((x / width) * images[row].length);

    // Get the image source at the calculated row and column and set it as the src attribute of the img element
    const imageSrc = "img/" + images[row][column];
    image.setAttribute("src", imageSrc);
});
