const navBtn = document.querySelector(".header__nav-btn");
const menu = document.querySelector(".header__nav-list");
const header = document.querySelector("header");

function handleButtonClick(navBtn) {
  if (navBtn.textContent === "Menu") {
    navBtn.textContent = "Closed";
    menu.style.display = "flex";
    header.style.minHeight = "100px";
  } else if (navBtn.textContent === "Closed") {
    navBtn.textContent = "Menu";
    menu.style.display = "none";
    header.style.minHeight = "40px";
  }
}

navBtn.addEventListener("click", () => {
  handleButtonClick(navBtn);
});

const currentPath = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll(".header__nav-link");

navLinks.forEach((link) => {
  const linkHref = link.getAttribute("href");
  const img = link.querySelector("img");

  if (currentPath === linkHref) {
    link.classList.add("header__nav-link--active");
    if (img) {
      img.src = "./images/icons/link_on.png";
    }
  } else {
    link.classList.remove("header__nav-link--active");
    if (img) {
      img.src = "./images/icons/link.png";
    }
  }
});
