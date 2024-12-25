// Fixer la barre de navigation

window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// hero effect
const words = ["Prévenir", "Protéger", "Maîtriser"];
const dynamicText = document.getElementById("dynamic-text");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  // Récupère le mot actuel
  const currentWord = words[wordIndex];
  const displayedText = currentWord.substring(0, charIndex);

  dynamicText.textContent = displayedText;

  if (!isDeleting && charIndex < currentWord.length) {
    // Ajouter une lettre
    charIndex++;
    setTimeout(typeEffect, 100);
  } else if (isDeleting && charIndex > 0) {
    // Effacer une lettre
    charIndex--;
    setTimeout(typeEffect, 50);
  } else if (!isDeleting && charIndex === currentWord.length) {
    // Pause avant d'effacer
    isDeleting = true;
    setTimeout(typeEffect, 1000);
  } else if (isDeleting && charIndex === 0) {
    // Passe au mot suivant
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    setTimeout(typeEffect, 300);
  }
}

// Démarre l'animation
typeEffect();
