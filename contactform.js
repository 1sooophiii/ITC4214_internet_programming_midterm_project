//when content is loaded get the form
//when form is submited show pop up alert to inform user
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#contactForm");

    form.addEventListener("submit", function (e) {
        // prevents the default form submission functionality
        // its not inserting the form values as params in the URL
        e.preventDefault();

        alert("Thank you! Your message has been sent.");
        form.reset();
    });
});
