const menuBtn = document.querySelector("#mobileMenuBtn");
const mobileMenu = document.querySelector("#mobileMenu");

//show or hide hamburger icon depending on window width
const toggleBurger = () => {
    const windowWidth = window.innerWidth;
    const triggerCondition = windowWidth < 768;

    if (triggerCondition) {
        menuBtn.classList.remove("hidden");
    } else {
        menuBtn.classList.add("hidden");
    }
};

//when window is resized call toggleBurger
window.addEventListener("resize", () => {
    toggleBurger();
});

//when content is loaded also call it
document.addEventListener("DOMContentLoaded", () => {
    toggleBurger();
});

//when hamburger menu button is clicked show or hide the mobile menu
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});
