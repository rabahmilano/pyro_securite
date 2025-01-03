// Fixer la barre de navigation

window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar");
  header.classList.toggle("sticky", window.scrollY > 0);
});

// Activation dynamique des boutons de la barre de navigation
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const navItems = document.querySelectorAll("header nav ul li");

  // Fonction pour définir la classe active
  function setActiveSection() {
    let maxVisibleSection = null;
    let maxVisibility = 0;

    // Parcourir les sections pour trouver celle la plus visible
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const visibleHeight = Math.max(
        0,
        Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
      );
      if (visibleHeight > maxVisibility) {
        maxVisibility = visibleHeight;
        maxVisibleSection = section;
      }
    });

    // Mettre à jour les classes des boutons de navigation
    navItems.forEach((item) => {
      item.classList.remove("active");
      const link = item.querySelector("a");
      if (
        link &&
        maxVisibleSection &&
        link.getAttribute("href") === `#${maxVisibleSection.id}`
      ) {
        item.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveSection);

  setActiveSection();
});

/**
 * Effet parallex pour les images du section hero
 */

document
  .getElementById("parallax-wrap")
  .addEventListener("mousemove", parallax);

/**
function parallax(e) {
  document.querySelectorAll(".hero-image-wrap").forEach((move) => {
    let moving_value = move.getAttribute("data-value");
    let x = (e.clientX * moving_value) / 250;
    let y = (e.clientY * moving_value) / 250;
    
    move.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });
}
*/

/**

function parallax(e) {
  document.querySelectorAll(".hero-image-wrap").forEach((move) => {
    let moving_value = move.getAttribute("data-value");
    let x = (e.clientX * moving_value) / 200;
    let y = (e.clientY * moving_value) / 200;
    
    // Récupérer la valeur de rotate depuis l'attribut personnalisé
    let rotateValue = move.getAttribute("data-rotate");
    
    // Appliquer la nouvelle transformation en conservant rotate
    move.style.transform = `rotate(${rotateValue}) translateX(${x}px) translateY(${y}px)`;
  });
}
*/

function parallax(e) {
  let move = document.getElementById("parallax-hero-image");

  let moving_value = move.getAttribute("data-value");
  let x = (e.clientX * moving_value) / 200;
  let y = (e.clientY * moving_value) / 200;

  let rotateValue = move.getAttribute("data-rotate");

  move.style.transform = `rotate(${rotateValue}) translateX(${x}px) translateY(${y}px)`;
}

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

typeEffect();

// Fonction pour animer un chiffre

const counters = document.querySelectorAll(".text");

// Options pour l'Intersection Observer
const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.5,
};

/** animer la flamme **/

document.addEventListener("scroll", () => {
  const logo = document.querySelector(".about-logo");

  // Récupérez la hauteur totale de la page et la position actuelle de défilement
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const windowHeight = window.innerHeight;
  const totalHeight = document.body.scrollHeight - windowHeight;

  // Calculez la position du logo en pourcentage du défilement
  const scrollProgress = scrollTop / totalHeight;

  // Déplacez le logo verticalement en fonction du pourcentage de défilement
  const translateY = scrollProgress * 300; // Ajustez 200 pour définir la distance totale

  logo.style.transform = `translate(0px, ${translateY}px)`;
});

/**  Image slider **/

const list = document.querySelector("#about .slider .list");
const items = document.querySelectorAll("#about .slider .list .item");
const dots = document.querySelectorAll("#about .slider .dots li");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let active = 0;
const lengthItems = items.length - 1;

next.onclick = () => {
  active = active + 1 > lengthItems ? 0 : active + 1;
  reloadSlider();
};

prev.onclick = () => {
  active = active - 1 < 0 ? lengthItems : active - 1;
  reloadSlider();
};

let refreshSlider = setInterval(() => {
  next.click();
}, 3000);

const reloadSlider = () => {
  const checkLeft = items[active].offsetLeft;
  list.style.left = -checkLeft + "px";
  // list.style.transform = `translateX(-${checkLeft}px)`;

  const lastActiveDot = document.querySelector(
    "#about .slider .dots li.active"
  );
  lastActiveDot.classList.remove("active");
  dots[active].classList.add("active");
  clearInterval(refreshSlider);
  refreshSlider = setInterval(() => {
    next.click();
  }, 3000);
};

dots.forEach((li, index) => {
  li.addEventListener("click", () => {
    active = index;
    reloadSlider();
  });
});

// Fonction d'animation des compteurs
function animateCounter(target, endValue) {
  const duration = 2500;
  const startTime = performance.now();
  const startValue = 0;

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Easing function pour une animation plus naturelle
    const easing = (t) =>
      t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

    const currentValue = Math.floor(
      startValue + (endValue - startValue) * easing(progress)
    );
    target.textContent = `+ ${currentValue}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

// Callback pour l'Intersection Observer
const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const endValue = parseInt(target.textContent.replace(/[^0-9]/g, ""));
      animateCounter(target, endValue);
      observer.unobserve(target); // Arrêter d'observer après l'animation
    }
  });
};

// Créer et démarrer l'Intersection Observer
const observer = new IntersectionObserver(callback, options);
counters.forEach((counter) => observer.observe(counter));

/** Temoignage **/
$(document).ready(function () {
  $(".carousel").carousel({
    padding: 200,
  });
  autoplay();
  function autoplay() {
    $(".carousel").carousel("next");
    setTimeout(autoplay, 7500);
  }
});

/* Footer */
// Insère l'année courante dans l'élément avec l'ID "year"
document.getElementById("year").textContent = new Date().getFullYear();
