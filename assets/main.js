(function () {
  var root = document.documentElement;
  var body = document.body;

  // Mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-navigation");
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]'));

  toggle.addEventListener("click", function () {
    var isOpen = body.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // Highlight the section currently in view
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      var visible = entries
        .filter(function (e) { return e.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!visible) return;
      navLinks.forEach(function (link) {
        var active = link.getAttribute("href") === "#" + visible.target.id;
        link.classList.toggle("active", active);
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }, { rootMargin: "-18% 0px -68% 0px", threshold: [0, 0.1, 0.35] });
    sections.forEach(function (s) { observer.observe(s); });
  }

  // Light / dark theme toggle (falls back to the system preference)
  var themeButton = document.querySelector(".theme-toggle");
  themeButton.addEventListener("click", function () {
    var current = root.getAttribute("data-theme");
    if (!current) {
      current = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    var next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Figure lightbox
  var dialog = document.querySelector(".lightbox");
  if (dialog && typeof dialog.showModal === "function") {
    var dialogImg = dialog.querySelector("img");
    document.querySelectorAll("[data-lightbox]").forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        var img = link.querySelector("img");
        dialogImg.src = link.getAttribute("href");
        dialogImg.alt = img ? img.alt : "";
        dialog.showModal();
      });
    });
    dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) dialog.close();
    });
  }

  document.getElementById("copyright-year").textContent = new Date().getFullYear();
})();
