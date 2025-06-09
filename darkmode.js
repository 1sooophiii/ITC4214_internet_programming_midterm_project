const toggleBtn = document.getElementById("toggle-dark");
const toggleMobileBtn = document.getElementById("mobile-toggle-dark");
const darkIcon = document.getElementById("dark-icon");
const lightIcon = document.getElementById("light-icon");

function updateIcon(isDark) {
    if (isDark) {
        darkIcon.style.display = "none";
        lightIcon.style.display = "inline";
    } else {
        darkIcon.style.display = "inline";
        lightIcon.style.display = "none";
    }
}

toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateIcon(isDark);
});

toggleMobileBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Set icon on load
updateIcon(document.documentElement.classList.contains("dark"));
