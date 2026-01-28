var dropdowns = document.querySelectorAll(".dropdown");

function handleDropdown(dropdown) {
    let menu = dropdown.querySelector(".dropdown-menu");
    let link = dropdown.querySelector(".dropdown-toggle");

    function showDropdown() {
        menu.classList.add("show");
        link.setAttribute("aria-expanded", "true");
    }

    function hideDropdown() {
        menu.classList.remove("show");
        link.setAttribute("aria-expanded", "false");
    }

    function disableClick(event) {
        event.preventDefault(); // Prevents dropdown from opening on click
    }

    function handleHover() {
        if (window.innerWidth >= 992) {
            // Enable hover functionality
            dropdown.addEventListener("mouseenter", showDropdown);
            dropdown.addEventListener("mouseleave", hideDropdown);
            link.addEventListener("click", disableClick); // Prevent click from opening
        } else {
            // Remove hover functionality
            dropdown.removeEventListener("mouseenter", showDropdown);
            dropdown.removeEventListener("mouseleave", hideDropdown);
            link.removeEventListener("click", disableClick); // Ensure click does nothing
        }
    }

    handleHover();
    window.addEventListener("resize", handleHover);
}

dropdowns.forEach(handleDropdown);

// search filter js
function closeAllDropdowns() {
    document.querySelectorAll(".dropdown-options").forEach(menu => {
        menu.style.display = "none";
    });
}

document.querySelectorAll(".dropdown-wrapper").forEach(wrapper => {
    let button = wrapper.querySelector(".filter-dropdown");
    let menu = wrapper.querySelector(".dropdown-options");
    let textSpan = button.querySelector(".filter-text"); // Get the text span

    button.addEventListener("click", function (event) {
        event.stopPropagation();
        closeAllDropdowns();
        menu.style.display = menu.style.display === "block" ? "none" : "block";
    });

    menu.querySelectorAll("li").forEach(item => {
        item.addEventListener("click", function () {
            textSpan.innerText = this.innerText; // Update only the text span
            menu.style.display = "none";
        });
    });
});

document.addEventListener("click", function (event) {
    closeAllDropdowns();
});
// scroll top
const backToTopBtn = document.querySelector(".backToTopBtn");

// Show the button when scrolling down
window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// Scroll to top smoothly when clicked
backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
// JavaScript to toggle password visibility
const togglePassword = document.querySelectorAll('.toggle-password');
togglePassword.forEach(icon => {
    icon.addEventListener('click', function () {
        const passwordField = this.previousElementSibling;

        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            this.classList.remove('bi-eye-slash');
            this.classList.add('bi-eye');
        } else {
            passwordField.type = 'password';
            this.classList.remove('bi-eye');
            this.classList.add('bi-eye-slash');
        }
    });
});
// recaptcha js
document.getElementById('recaptcha').addEventListener('click', function () {
    let checkbox = this;
    let loader = document.getElementById('loader');
    let label = document.getElementById('recaptchaLabel');

    // Hide checkbox, show loader
    checkbox.style.display = 'none';
    loader.style.display = 'inline-block';
    checkbox.disabled = true;

    setTimeout(() => {
        loader.style.display = 'none'; // Hide loader
        checkbox.style.display = 'inline-block'; // Show checkbox again
        checkbox.checked = true; // Check the checkbox
        label.textContent = 'Success!'; // Change label text
    }, 2000); // Adjust time as needed
});

// div expand
function toggleDetails() {
    var detailCard = document.querySelector('.detailCardExpaned');
    var button = document.querySelector('.showMoreBtn');
    var icon = button.querySelector('i');
    var text = button.querySelector('span');

    detailCard.classList.toggle('expanded');

    if (detailCard.classList.contains('expanded')) {
        icon.classList.replace('bi-plus-lg', 'bi-dash-lg');
        text.textContent = " Click to show less";
    } else {
        icon.classList.replace('bi-dash-lg', 'bi-plus-lg');
        text.textContent = "Click to show more";
    }
}

function copyText(button) {
    const linkElement = button.previousElementSibling;
    const textToCopy = linkElement.getAttribute("data-copy");
    navigator.clipboard.writeText(textToCopy)
        .then(() => {
            alert("Copied: " + textToCopy);
        })
        .catch(err => {
            alert("Failed to copy: " + err);
        });
}
