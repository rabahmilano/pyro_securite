window.addEventListener("scroll", () => {
  const header = document.getElementById("navbar");  
  header.classList.toggle("sticky", window.scrollY > 0)
})