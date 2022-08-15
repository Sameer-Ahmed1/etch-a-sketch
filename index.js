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
  let gridCont = document.querySelector("#grid-container");
  let grid = [];
  grid = createGrid(grid, GRID_WIDTH, GRID_HEIGHT);
  gridCont = appendArray(gridCont, grid);

  gridCont.addEventListener("mouseover", changeColor, false);
  gridCont.addEventListener("click", changeColorClick);
  function changeColor(event) {
    if (event.target.id !== "sqrDiv") {
      return;
    }
    if (event.buttons == 1) {
      event.target.setAttribute("style", "background:black;");
    }
  }
  function changeColorClick(event) {
    if (event.target.id !== "sqrDiv") {
      return;
    }
    event.target.setAttribute("style", "background:black;");
  }
})();
