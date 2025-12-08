
const navLinks = document.querySelectorAll(".nav-link");
const sideTabs = document.querySelectorAll(".side-tab");
const views = document.querySelectorAll(".view");

function activateView(viewName) {
  navLinks.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  sideTabs.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.view === viewName);
  });

  views.forEach((v) => {
    if (v.classList.contains(`view-${viewName}`)) {
      v.classList.add("active");
    } else {
      v.classList.remove("active");
    }
  });
}

navLinks.forEach((btn) => {
  btn.addEventListener("click", () => {
    activateView(btn.dataset.view);
  });
});

sideTabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    activateView(btn.dataset.view);
  });
});

// ilk açılış
activateView("music");
