function createGrid(grid, rowSize, colSize) {
  for (let i = 0; i < rowSize; i++) {
    grid[i] = document.createElement("div");
    grid[i].setAttribute("id", "container");
    let sqrDivs = [];
    for (let j = 0; j < colSize; j++) {
      sqrDivs[j] = document.createElement("div");
      sqrDivs[j].setAttribute("id", "sqrDiv");
      grid[i].appendChild(sqrDivs[j]);
    }
  }
  return grid;
}

function appendArray(pDiv, cDiv) {
  cDiv.forEach((div) => pDiv.appendChild(div));
  return pDiv;
}

(() => {
  const GRID_WIDTH = 16;
  const GRID_HEIGHT = 16;
  const sketchEl = document.querySelector("#sketch");
  const eraseEl = document.querySelector("#erase");
  const buttonsEl = document.querySelector(".buttons");
  let gridCont = document.querySelector("#grid-container");
  let grid = [];
  let state;
  grid = createGrid(grid, GRID_WIDTH, GRID_HEIGHT);
  gridCont = appendArray(gridCont, grid);

  buttonsEl.addEventListener("click", (e) => (state = e.target.id));

  ["mouseover", "click"].forEach((type) =>
    gridCont.addEventListener(type, eventHandler, false)
  );

  function eventHandler(event) {
    if (event.target.id !== "sqrDiv") {
      return;
    }
    if (event.type === "click") {
      changeColor(event);
      return;
    }
    if (event.buttons == 1) {
      changeColor(event);
    }
  }
  function changeColor(event) {
    if (state === "eraser") {
      event.target.setAttribute("style", "background-color:'transparent';");
      return;
    }
    event.target.setAttribute("style", "background-color:black;");
  }
})();
