const progrevisos = document.querySelectorAll(".progresivo");

observer = new IntersectionObserver(
  (marcos) => {
    marcos.forEach((marco) => {
      if (marco.intersectionRatio > 0) {
        cargarImagenGrande(marco.target);
      }
    });
  },
  {
    rootMargin: "0px 0px 50% 0px",
    threshold: 0,
  }
);

progrevisos.forEach((contImg) => {
  observer.observe(contImg);
});

function cargarImagenGrande(marcoImagen) {
  let imgSmall = marcoImagen.querySelector(".img-small");
  let imgLarge = new Image();
  let x = Math.min(3000, marcoImagen.offsetWidth);
  let y = Math.min(3000, marcoImagen.offsetHeight);
  imgLarge.src =
    "https://ucarecdn.com/" +
    marcoImagen.dataset.uuid +
    "/-/scale_crop/" +
    x +
    "x" +
    y +
    "/smart_faces/-/format/auto/";
  imgLarge.onload = function () {
    imgLarge.classList.add("loaded");
    marcoImagen.removeChild(imgSmall);
  };
  marcoImagen.appendChild(imgLarge);
  observer.unobserve(marcoImagen);
}
