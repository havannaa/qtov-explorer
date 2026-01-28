document.addEventListener("DOMContentLoaded", () => {
    const lightToggle = document.getElementById("light-toggle");
    const darkToggle = document.getElementById("dark-toggle");
    const body = document.body;

    // Function to update the active state of buttons
    const updateActiveButton = (isDarkMode) => {
        if (isDarkMode) {
            darkToggle.classList.add("active");
            lightToggle.classList.remove("active");
        } else {
            lightToggle.classList.add("active");
            darkToggle.classList.remove("active");
        }
    };

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        body.classList.remove("dark-mode"); // Light mode
        updateActiveButton(false);
    } else {
        body.classList.add("dark-mode"); // Default to dark mode
        updateActiveButton(true);
    }

    // Light Mode Toggle
    lightToggle.addEventListener("click", () => {
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
        updateActiveButton(false);
    });

    // Dark Mode Toggle
    darkToggle.addEventListener("click", () => {
        body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
        updateActiveButton(true);
    });
});
