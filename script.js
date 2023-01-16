const images = document.getElementsByClassName("image");
let globalIndex = 0;
let last = { x: 0, y: 0 };

const activate = (image, x, y) => {
  image.style.left = `${x}px`;
  image.style.top = `${y}px`;
  image.style.zIndex = globalIndex;
  image.dataset.status = "active";
  last = { x, y };
}

const handleOnMove = e => {
  const x = e.clientX, y = e.clientY;
  const distance = Math.hypot(x - last.x, y - last.y);
  if(distance > (window.innerWidth / 20)) {
    const lead = images[globalIndex % images.length],
          tail = images[(globalIndex - 5) % images.length];
    activate(lead, x, y);
    if(tail) tail.dataset.status = "inactive";
    globalIndex++;
    last = {x, y}
    requestAnimationFrame(handleOnMove);
  }
}

window.onmousemove = e => handleOnMove(e);
window.ontouchmove = e => handleOnMove(e.touches[0]);