// Wait until page loads
document.addEventListener("DOMContentLoaded", function () {
    // =========================
    // Smooth Scrolling
    // =========================
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    e.preventDefault();
                    targetSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });

    // =========================
    // Mobile Menu Toggle
    // =========================
    const menuBtn = document.getElementById("menu-btn");
    const navMenu = document.getElementById("nav-menu");

    if (menuBtn && navMenu) {
        menuBtn.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }

    // =========================
    // Active Navbar on Scroll
    // =========================
    const sections = document.querySelectorAll("section");
    const navItems = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", function () {
        let current = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

    // =========================
    // Resume Download Button Action
    // =========================
    const resumeBtn = document.getElementById("resume-btn");

    if (resumeBtn) {
        resumeBtn.addEventListener("click", function () {
            alert("Your resume download will start now.");
        });
    }

    // =========================
    // Contact Form Validation
    // =========================
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name");
            const email = document.getElementById("email");
            const message = document.getElementById("message");

            let isValid = true;

            // Remove old error messages
            document.querySelectorAll(".error").forEach(el => el.remove());

            // Name validation
            if (!name.value.trim()) {
                showError(name, "Name is required");
                isValid = false;
            }

            // Email validation
            if (!email.value.trim()) {
                showError(email, "Email is required");
                isValid = false;
            } else if (!validateEmail(email.value.trim())) {
                showError(email, "Enter a valid email");
                isValid = false;
            }

            // Message validation
            if (!message.value.trim()) {
                showError(message, "Message is required");
                isValid = false;
            }

            if (isValid) {
                alert("Form submitted successfully!");
                contactForm.reset();
            }
        });
    }

    function showError(input, message) {
        const error = document.createElement("small");
        error.className = "error";
        error.style.color = "red";
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // =========================
    // Scroll Reveal Animation
    // =========================
    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - 100) {
                element.classList.add("visible");
            }
        });
    }

    window.addEventListener("scroll", revealOnScroll);
    revealOnScroll();

    // =========================
    // Back to Top Button
    // =========================
    const backToTop = document.getElementById("back-to-top");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 300) {
                backToTop.style.display = "block";
            } else {
                backToTop.style.display = "none";
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // =========================
    // Dark Mode Toggle
    // =========================
    const darkModeBtn = document.getElementById("dark-mode-toggle");

    if (darkModeBtn) {
        // Load saved theme
        if (localStorage.getItem("theme") === "dark") {
            document.body.classList.add("dark-mode");
        }

        darkModeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                localStorage.setItem("theme", "dark");
            } else {
                localStorage.setItem("theme", "light");
            }
        });
    }
});
