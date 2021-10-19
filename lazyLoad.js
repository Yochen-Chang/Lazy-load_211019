let windowBox = document.querySelector("#window-box");
let elements = document.querySelectorAll(".lazy-load");

// When the gap between window and element is equal to 0.5 times of element's height, the element will be loaded
let gapToLoad = 0.5;

// Initial element checking
setImgData(elements);
elementInWindow(elements, windowBox, gapToLoad);

// Check while scrolling
window.addEventListener("scroll", () => {
  elementInWindow(elements, windowBox, gapToLoad);
});

// Check the element is in window or not
function elementInWindow(elements, myWindow, persentOfBox) {
  let windowBox = myWindow || window; // default: let myWindow is window
  let windowHeight = windowBox.clientHeight || windowBox.innerHeight; // input can be the div or the window
  // TODO: check the persent parameter
  persent = persentOfBox;
  for (let element of elements) {
    if (
      element.getBoundingClientRect().top -
        windowHeight +
        pregapToLoad(element, persent) <
      0
    ) {
      loadImg(element);
    }
  }
}

// The gap between window and box defined to load box ( based on presentage )
function pregapToLoad(element, persent) {
  let boundary = element.getBoundingClientRect();
  let elementheight = boundary.height;
  return persent * elementheight;
}

// Let image not to be loaded
function setImgData(imgs) {
  for (let img of imgs) {
    if (img.src) {
      img.setAttribute("data-src", img.src);
      img.removeAttribute("src");
    }
  }
}

// Load the image ( replace the src from data-src )
function loadImg(img) {
  if (img.dataset.src) {
    img.setAttribute("src", img.dataset.src);
    img.removeAttribute("data-src");
  }
}
