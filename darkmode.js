const toggleBtn = document.querySelector("#toggle-dark");
const toggleMobileBtn = document.querySelector("#mobile-toggle-dark");
const darkIcon = document.querySelector("#dark-icon");
const lightIcon = document.querySelector("#light-icon");

//update and show light or dark icon depending on theme
function updateIcon(isDark) {
    if (isDark) {
        darkIcon.style.display = "none";
        lightIcon.style.display = "inline";
    } else {
        darkIcon.style.display = "inline";
        lightIcon.style.display = "none";
    }
}

//when dark/light mode button is clicked toggle the dark class to change the theme
toggleBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateIcon(isDark);
});

//do this on mobile view button as well
toggleMobileBtn.addEventListener("click", () => {
    const isDark = document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    updateIcon(isDark);
});

//set mode on load
if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.toggle("dark");
}
//set icon on load
updateIcon(document.documentElement.classList.contains("dark"));

/*
a try to do this with jquery that was unsuccessful

$(document).ready(function () {
    const toggleBtn = $("#toggle-dark");
    const toggleMobileBtn = $("#mobile-toggle-dark");
    const darkIcon = $("#dark-icon");
    const lightIcon = $("#light-icon");
    const documentClasses = $(document.documentElement).attr("class");

    $("#toggle-dark").click(function () {
        $(document.documentElement).toggleClass("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");

        if (localStorage.getItem("theme") === "light") {
            $(lightIcon).hide();
        } else {
            $(darkIcon).hide();
        }
    });

    $("#mobile-toggle-dark").click(function () {
        $(document.documentElement).toggleClass("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });

    if (localStorage.getItem("theme") === "dark") {
        $(document.documentElement).toggleClass("dark");
        $(darkIcon).hide();
    } else {
        $(lightIcon).hide();
    }
});
*/
