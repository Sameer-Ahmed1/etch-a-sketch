function createGrid(rowSize, colSize) {
  let grid = [];
  for (let i = 0; i < rowSize; i++) {
    grid[i] = document.createElement("div");
    grid[i].setAttribute("id", "container");
    let pixels = [];
    for (let j = 0; j < colSize; j++) {
      pixels[j] = document.createElement("div");
      pixels[j].setAttribute("class", "pixel");
      grid[i].appendChild(pixels[j]);
    }
  }
  return grid;
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

(() => {
  const GRID_WIDTH = 16;
  const GRID_HEIGHT = 16;
  const sketchEl = document.querySelector("#sketch");
  const eraseEl = document.querySelector("#erase");
  const buttonsEl = document.querySelector(".buttons");
  let gridCont = document.querySelector("#grid-container");
  let state;

  gridCont.append(...createGrid(GRID_WIDTH, GRID_HEIGHT));
  buttonsEl.addEventListener("click", changeState);

  gridCont.addEventListener("mouseover", gridMouseover, false);

  function changeState(event) {
    state = event.target.id;
    switch (state) {
      case "reset":
        sketchReset();
        break;
      case "gridSize":
        sizeReset();
        break;
    }
  }
  function sketchReset() {
    const pixels = Array.from(document.getElementsByClassName("pixel"));
    pixels.forEach((pxl) =>
      pxl.setAttribute("style", "background-color:'transparent';")
    );
  }
  function sizeReset() {
    let size = parseInt(prompt("Enter grid size (MAX=100) : "));
    if (size <= 100) {
      gridCont.innerHTML = "";
      gridCont.append(...createGrid(size, size));
    } else {
      alert("Please enter size less than or equal to 100!");
    }
  }
  function gridMouseover(event) {
    if (event.target.classList.value !== "pixel") {
      return;
    }
    changeColor(event.target);
  }
  function changeColor(pixel) {
    switch (state) {
      case "eraser":
        pixel.setAttribute("style", "background-color:'transparent';");
        break;
      case "randColor":
        pixel.setAttribute("style", `background-color:${getRandomColor()};`);
        break;
      case "incBlack":
        changeOpacity(pixel);
        break;
      default:
        pixel.style.backgroundColor = "RGBA(0, 0, 0,1)";
    }
  }
  function changeOpacity(pixel) {
    if (!pixel.style.backgroundColor) {
      pixel.style.backgroundColor = "RGBA(0, 0, 0, 0.0)";
    } else {
      const opacity = parseFloat(pixel.style.backgroundColor.slice(14));
      console.log(`RGBA(0, 0, 0, ${opacity + 0.1})`);
      pixel.style.backgroundColor = `RGBA(0, 0, 0, ${opacity + 0.1})`;
    }
  }
})();
