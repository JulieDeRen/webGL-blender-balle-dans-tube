// sélectionner le canvas et lui donner des dimensions comme propriétés
const canvas = document.querySelector(".canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// créer un contexte de dessin dans l'élément canvas
// 2d parce que c'est une série d'images
const context = canvas.getContext("2d");
// nombre d'images correspond au frameCount
const frameCount = 179;

// fonction pour aller chercher chaque image dans le dossier image une par une
// index + 1 car i débute à 0
const currentFrame = (index) => `./best-ball/${(index + 1).toString()}.jpg`;

const images = [];

// on va accéder à images à la position ball.frame dans la fonction render
let ball = { frame: 0 };

for (let i = 0; i < frameCount; i++) {
  // créer un nouvel objet image à chaque tour de loop
  const img = new Image();
  // la direction est attribuée en propriété de l'objet
  img.src = currentFrame(i);
  console.log(currentFrame(i));
  // peupler le tableau avec l'ensemble des images avec leur propriété
  images.push(img);
}

// augmenter le frame de la ball en scrollant
gsap.to(ball, {
  // de 0 à 178
  frame: frameCount - 1,
  // snap pour chaque nombre de 0 à 178
  snap: "frame",
  ease: "none",

  // animer on scroll
  scrollTrigger: {
    scrub: 0.5, // scrub: true
    // pin fixe le canvas jusqu'à la fin de l'animation on scroll
    pin: "canvas",
    // 5x la hauteur de l'écran pour activer l'animation
    end: "500%",
    // marker: true, pour visualiser oû est rendu l'animation
  },
  // pour l'update, passer la fonction render
  onUpdate: render,
});

// animer le texte
gsap.fromTo(
  ".ball-text",
  {
    opacity: 0,
  },
  {
    opacity: 1,
    scrollTrigger: {
      // scrub est vrai (1 = true)
      scrub: 1,

      start: "50%",
      end: "60%",
    },
    // faire disparaître le texte à nouveau
    onComplete: () => {
      gsap.to(".ball-text", { opacity: 0 });
    },
  }
);

// appel de la fonction
images[0].onload = render;

function render() {
  // canvas est toujours la même dimension que l'image
  context.canvas.width = images[0].width;
  context.canvas.height = images[0].height;

  // supprime ce qui est sur le canvas pour réafficher chaque image
  // position 0, 0 (top, left)
  context.clearRect(0, 0, canvas.width, canvas.height);
  // dessiner sur le canvas (image, position top, position left);
  context.drawImage(images[ball.frame], 0, 0);
}
