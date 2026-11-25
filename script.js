const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-link");
const portrait = document.querySelector(".portrait-image");
const revealItems = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("main section[id]");

if (portrait && portrait.getAttribute("src")) {
  const showPortrait = () => {
    portrait.hidden = false;
  };
  if (portrait.complete && portrait.naturalWidth > 0) {
    showPortrait();
  } else {
    portrait.addEventListener("load", showPortrait, { once: true });
  }
}

if (menuToggle && navLinks) {
  const closeMenu = () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    navLinks.classList.remove("is-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navLinks.classList.toggle("is-open", !isOpen);
  });

  navItems.forEach((item) => item.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });
}

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));

  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navItems.forEach((item) => {
          item.classList.toggle("is-active", item.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-25% 0px -65% 0px" });
  sections.forEach((section) => activeSectionObserver.observe(section));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
