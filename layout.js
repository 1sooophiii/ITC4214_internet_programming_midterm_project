const menuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

const toggleBurger = () => {
    const windowWidth = window.innerWidth;
    const triggerCondition = windowWidth < 768;

    if (triggerCondition) {
        menuBtn.classList.remove("hidden");
    } else {
        menuBtn.classList.add("hidden");
    }
};

window.addEventListener("resize", () => {
    toggleBurger();
});

document.addEventListener("DOMContentLoaded", () => {
    toggleBurger();
});

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
});
