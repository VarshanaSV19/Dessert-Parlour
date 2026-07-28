document.addEventListener("DOMContentLoaded", () => {
    const html = document.documentElement;

    const pageLoader = document.getElementById("pageLoader");
    const loaderProgress = document.getElementById("loaderProgress");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const directionToggle = document.getElementById("directionToggle");
    const directionText = document.getElementById("directionText");

    const desktopHomeButton =
        document.getElementById("desktopHomeButton");

    const desktopHomeMenu =
        document.getElementById("desktopHomeMenu");

    const desktopHomeArrow =
        document.getElementById("desktopHomeArrow");

    const mobileMenuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const mobileMenuIcon =
        document.getElementById("mobileMenuIcon");

    const mobileHomeButton =
        document.getElementById("mobileHomeButton");

    const mobileHomeMenu =
        document.getElementById("mobileHomeMenu");

    const mobileHomeArrow =
        document.getElementById("mobileHomeArrow");


    /* =========================================
                  WORKING PAGE LINKS
    ========================================= */

    const pageRoutes = {
        home1: "/index.html",
        home2: "/pages/home.html",
        about: "/pages/about.html",
        menu: "/pages/menu.html",
        specials: "/pages/specials.html",
        gallery: "/pages/gallery.html",
        team: "/pages/team.html",
        contact: "/pages/contact.html"
    };

    const routeLinks =
        document.querySelectorAll("[data-page]");

    routeLinks.forEach((link) => {
        const pageName = link.dataset.page;

        if (pageRoutes[pageName]) {
            link.href = pageRoutes[pageName];
        }
    });


    /* =========================================
                       LOADER
    ========================================= */

    let progress = 0;

    const progressTimer = setInterval(() => {
        progress += 10;

        if (loaderProgress) {
            loaderProgress.style.width = `${progress}%`;
        }

        if (progress >= 100) {
            clearInterval(progressTimer);
        }
    }, 60);

    window.addEventListener("load", () => {
        window.setTimeout(() => {
            if (pageLoader) {
                pageLoader.classList.add("loader-hidden");
            }
        }, 700);
    });

    window.setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add("loader-hidden");
        }
    }, 1800);


    /* =========================================
                  DARK AND LIGHT MODE
    ========================================= */

    const savedTheme =
        localStorage.getItem("meltSwirlTheme");

    if (savedTheme === "dark") {
        html.classList.add("dark");
        updateThemeIcon(true);
    } else {
        html.classList.remove("dark");
        updateThemeIcon(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            html.classList.toggle("dark");

            const darkModeEnabled =
                html.classList.contains("dark");

            localStorage.setItem(
                "meltSwirlTheme",
                darkModeEnabled ? "dark" : "light"
            );

            updateThemeIcon(darkModeEnabled);
        });
    }

    function updateThemeIcon(darkModeEnabled) {
        if (!themeIcon) {
            return;
        }

        themeIcon.className = darkModeEnabled
            ? "fa-solid fa-sun"
            : "fa-solid fa-moon";
    }


    /* =========================================
                       RTL / LTR
    ========================================= */

    const savedDirection =
        localStorage.getItem("meltSwirlDirection") || "ltr";

    html.setAttribute("dir", savedDirection);
    updateDirectionText(savedDirection);

    if (directionToggle) {
        directionToggle.addEventListener("click", () => {
            const currentDirection =
                html.getAttribute("dir");

            const newDirection =
                currentDirection === "rtl"
                    ? "ltr"
                    : "rtl";

            html.setAttribute("dir", newDirection);

            localStorage.setItem(
                "meltSwirlDirection",
                newDirection
            );

            updateDirectionText(newDirection);
            closeDesktopHome();
            closeMobileMenu();
        });
    }

    function updateDirectionText(direction) {
        if (!directionText) {
            return;
        }

        directionText.textContent =
            direction === "rtl" ? "LTR" : "RTL";
    }


    /* =========================================
                  DESKTOP HOME DROPDOWN
    ========================================= */

    if (desktopHomeButton && desktopHomeMenu) {
        desktopHomeButton.addEventListener("click", (event) => {
            event.stopPropagation();

            const isOpen =
                desktopHomeMenu.classList.contains(
                    "dropdown-open"
                );

            if (isOpen) {
                closeDesktopHome();
            } else {
                openDesktopHome();
            }
        });
    }

    function openDesktopHome() {
        if (!desktopHomeMenu) {
            return;
        }

        desktopHomeMenu.classList.add("dropdown-open");

        desktopHomeButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        desktopHomeArrow?.classList.add("rotate-180");
    }

    function closeDesktopHome() {
        if (!desktopHomeMenu) {
            return;
        }

        desktopHomeMenu.classList.remove("dropdown-open");

        desktopHomeButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        desktopHomeArrow?.classList.remove("rotate-180");
    }


    /* =========================================
                     MOBILE MENU
    ========================================= */

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", () => {
            const isOpen =
                mobileMenu.classList.contains(
                    "mobile-menu-open"
                );

            if (isOpen) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }

    function openMobileMenu() {
        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.add("mobile-menu-open");

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        if (mobileMenuIcon) {
            mobileMenuIcon.className =
                "fa-solid fa-xmark";
        }
    }

    function closeMobileMenu() {
        if (!mobileMenu) {
            return;
        }

        mobileMenu.classList.remove("mobile-menu-open");

        mobileMenuButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        if (mobileMenuIcon) {
            mobileMenuIcon.className =
                "fa-solid fa-bars";
        }

        closeMobileHome();
    }


    /* =========================================
                 MOBILE HOME DROPDOWN
    ========================================= */

    if (mobileHomeButton && mobileHomeMenu) {
        mobileHomeButton.addEventListener("click", () => {
            const isOpen =
                mobileHomeMenu.classList.contains(
                    "mobile-dropdown-open"
                );

            if (isOpen) {
                closeMobileHome();
            } else {
                openMobileHome();
            }
        });
    }

    function openMobileHome() {
        if (!mobileHomeMenu) {
            return;
        }

        mobileHomeMenu.classList.add(
            "mobile-dropdown-open"
        );

        mobileHomeButton?.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileHomeArrow?.classList.add("rotate-180");
    }

    function closeMobileHome() {
        if (!mobileHomeMenu) {
            return;
        }

        mobileHomeMenu.classList.remove(
            "mobile-dropdown-open"
        );

        mobileHomeButton?.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileHomeArrow?.classList.remove("rotate-180");
    }


    /* =========================================
                  CLOSE MENUS ON CLICK
    ========================================= */

    document.addEventListener("click", (event) => {
        const clickedInsideDesktopHome =
            desktopHomeButton?.contains(event.target) ||
            desktopHomeMenu?.contains(event.target);

        if (!clickedInsideDesktopHome) {
            closeDesktopHome();
        }
    });

    document
        .querySelectorAll(".mobile-nav-link")
        .forEach((link) => {
            link.addEventListener("click", closeMobileMenu);
        });


    /* =========================================
                  CLOSE WITH ESCAPE KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDesktopHome();
            closeMobileMenu();
        }
    });


    /* =========================================
                     RESPONSIVE FIX
    ========================================= */

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1280) {
            closeMobileMenu();
        }
    });


    /* =========================================
                    ACTIVE NAVIGATION
    ========================================= */

    const currentPath =
        window.location.pathname.toLowerCase();

    const activePageMap = {
        "/index.html": "home1",
        "/": "home1",
        "/pages/home.html": "home2",
        "/pages/about.html": "about",
        "/pages/menu.html": "menu",
        "/pages/specials.html": "specials",
        "/pages/gallery.html": "gallery",
        "/pages/team.html": "team",
        "/pages/contact.html": "contact"
    };

    const activePage =
        activePageMap[currentPath];

    if (activePage) {
        document
            .querySelectorAll(`[data-page="${activePage}"]`)
            .forEach((link) => {
                link.classList.add("active");
            });
    }
});





// ==================================================
// SCROLL REVEAL ANIMATION
// ==================================================

const revealItems = document.querySelectorAll("[data-reveal]");

revealItems.forEach((item) => {
    const direction = item.dataset.reveal;

    item.style.opacity = "0";
    item.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

    if (direction === "left") {
        item.style.transform = "translateX(-45px)";
    } else if (direction === "right") {
        item.style.transform = "translateX(45px)";
    } else {
        item.style.transform = "translateY(35px)";
    }
});

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translate(0, 0)";
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.15
    }
);

revealItems.forEach((item) => {
    revealObserver.observe(item);
});




// ==================================================
// CORE VALUES ACCORDION
// ==================================================

const valueButtons = document.querySelectorAll(".value-button");

valueButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const currentPanel = button.nextElementSibling;
        const currentIcon = button.querySelector(".value-icon");
        const isOpen = button.getAttribute("aria-expanded") === "true";

        valueButtons.forEach((otherButton) => {
            const otherPanel = otherButton.nextElementSibling;
            const otherIcon = otherButton.querySelector(".value-icon");

            otherButton.setAttribute("aria-expanded", "false");
            otherPanel.style.maxHeight = "0px";

            otherIcon.classList.remove("fa-minus");
            otherIcon.classList.add("fa-plus");
        });

        if (!isOpen) {
            button.setAttribute("aria-expanded", "true");
            currentPanel.style.maxHeight =
                currentPanel.scrollHeight + "px";

            currentIcon.classList.remove("fa-plus");
            currentIcon.classList.add("fa-minus");
        }
    });
});

const firstValuePanel = document.querySelector(
    "#valuesAccordion .value-panel"
);

if (firstValuePanel) {
    firstValuePanel.style.maxHeight =
        firstValuePanel.scrollHeight + "px";
}