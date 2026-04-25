let lastScroll = 0;
const navbar = document.getElementById("navbar");
const heroBg = document.querySelector(".hero-bg");

// ===== SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  // navbar background
  if (currentScroll > window.innerHeight * 0.8) {
    navbar.classList.add("nav-scrolled");
  } else {
    navbar.classList.remove("nav-scrolled");
  }

  // hide/show navbar
  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)";
  } else {
    navbar.style.transform = "translateY(0)";
  }

  // parallax hero (SAFE CHECK)
  if (heroBg) {
    heroBg.style.transform = `scale(1.1) translateY(${currentScroll * 0.2}px)`;
  }

  lastScroll = currentScroll;
});

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const mobilePanel = document.getElementById("mobile-panel");
const closeMenu = document.getElementById("close-menu");

// OPEN MENU
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden");

  setTimeout(() => {
    mobilePanel.classList.remove("translate-x-full");
  }, 10);
});

// CLOSE MENU
const closeMobileMenu = () => {
  mobilePanel.classList.add("translate-x-full");

  setTimeout(() => {
    mobileMenu.classList.add("hidden");
  }, 250);
};

closeMenu.addEventListener("click", closeMobileMenu);

// CLICK OUTSIDE TO CLOSE
mobileMenu.addEventListener("click", (e) => {
  if (e.target === mobileMenu) closeMobileMenu();
});


// ===== MODAL SYSTEM =====
const modal = document.getElementById("booking-modal");
const modalBox = document.getElementById("modal-box");
const closeBtn = document.getElementById("close-modal");
const propertyInput = document.getElementById("property-name");

const steps = document.querySelectorAll(".step");
const nextBtns = document.querySelectorAll(".next-step");

let currentStep = 0;

// RESET STEPS
const resetSteps = () => {
  steps.forEach((step, i) => {
    step.classList.toggle("hidden", i !== 0);
  });
  currentStep = 0;
};

// OPEN MODAL (AUTO-FILL)
document.querySelectorAll(".open-booking").forEach(btn => {
  btn.addEventListener("click", () => {
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    resetSteps(); // IMPORTANT

    setTimeout(() => {
      modalBox.classList.remove("scale-95", "opacity-0");
      modalBox.classList.add("scale-100", "opacity-100");
    }, 50);

    if (propertyInput) {
      propertyInput.value = btn.dataset.property || "";
    }
  });
});

// CLOSE MODAL
const closeModal = () => {
  modalBox.classList.add("scale-95", "opacity-0");

  setTimeout(() => {
    modal.classList.add("hidden");
  }, 200);
};

if (closeBtn) closeBtn.addEventListener("click", closeModal);

// CLICK OUTSIDE
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});


// ===== STEP FLOW =====
nextBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    if (currentStep < steps.length - 1) {
      steps[currentStep].classList.add("hidden");
      currentStep++;
      steps[currentStep].classList.remove("hidden");
    }
  });
});


// ===== CUSTOM DATE PICKER =====
const dateGrid = document.getElementById("date-grid");

if (dateGrid) {
  for (let i = 1; i <= 9; i++) {
    const day = document.createElement("button");
    day.textContent = `Apr ${i + 10}`;
    day.className =
      "p-3 rounded-xl bg-white/5 text-white hover:bg-[#CEA461] hover:text-black transition";

    day.addEventListener("click", () => {
      document
        .querySelectorAll("#date-grid button")
        .forEach(b => b.classList.remove("bg-[#CEA461]", "text-black"));

      day.classList.add("bg-[#CEA461]", "text-black");
    });

    dateGrid.appendChild(day);
  }
}


// ===== SUCCESS STATE =====
const form = document.getElementById("booking-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    document.getElementById("step-3").classList.add("hidden");
    document.getElementById("success-step").classList.remove("hidden");
  });
}
