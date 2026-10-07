/* ==========================================
   MARJONA — PREMIUM SURPRISE WEBSITE
   SECRET PIN: 0716
========================================== */

document.addEventListener("DOMContentLoaded", () => {

  const SECRET_CODE = "0716";


  /* ==========================================
     LOADER
  ========================================== */

  const loader = document.getElementById("loader");
  const progress = document.getElementById("progress");

  let percent = 0;

  const loaderTimer = setInterval(() => {

    percent += Math.floor(Math.random() * 8) + 4;

    if (percent >= 100) {
      percent = 100;
      clearInterval(loaderTimer);

      setTimeout(() => {
        loader.classList.add("hide");
      }, 600);
    }

    progress.style.width = percent + "%";

  }, 100);


  /* ==========================================
     DISCOVER
  ========================================== */

  document.getElementById("discover").addEventListener("click", () => {

    document.querySelector(".intro").scrollIntoView({
      behavior: "smooth"
    });

  });


  /* ==========================================
     SCROLL REVEAL
  ========================================== */

  const revealElements =
    document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add("visible");

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(element => {
    observer.observe(element);
  });


  /* ==========================================
     MUSIC
  ========================================== */

  const soundButton =
    document.getElementById("soundButton");

  let audio = null;
  let playing = false;

  soundButton.addEventListener("click", () => {

    if (!audio) {

      audio = new Audio("music.mp3");
      audio.loop = true;
      audio.volume = 0.45;

    }

    if (!playing) {

      audio.play()
        .then(() => {

          playing = true;
          soundButton.classList.remove("off");

        })
        .catch(() => {

          alert(
            "Musiqa ishlashi uchun root papkaga music.mp3 qo'ying."
          );

        });

    } else {

      audio.pause();

      playing = false;

      soundButton.classList.add("off");

    }

  });


  /* ==========================================
     PIN SYSTEM
  ========================================== */

  const unlockButton =
    document.getElementById("unlockButton");

  const pinModal =
    document.getElementById("pinModal");

  const pinClose =
    document.getElementById("pinClose");

  const pinDots =
    document.querySelectorAll("#pinDots i");

  const wrongCode =
    document.getElementById("wrongCode");

  const keypadButtons =
    document.querySelectorAll("[data-number]");

  const deletePin =
    document.getElementById("deletePin");

  let enteredCode = "";


  /* OPEN PIN */

  unlockButton.addEventListener("click", () => {

    enteredCode = "";

    updateDots();

    wrongCode.classList.remove("show");

    pinModal.classList.add("show");

    document.body.classList.add("lock");

  });


  /* CLOSE PIN */

  pinClose.addEventListener("click", closePin);

  function closePin() {

    pinModal.classList.remove("show");

    document.body.classList.remove("lock");

    enteredCode = "";

    updateDots();

  }


  /* NUMBER BUTTONS */

  keypadButtons.forEach(button => {

    button.addEventListener("click", () => {

      if (enteredCode.length >= 4) return;

      enteredCode += button.dataset.number;

      updateDots();

      if (enteredCode.length === 4) {

        setTimeout(checkCode, 200);

      }

    });

  });


  /* DELETE */

  deletePin.addEventListener("click", () => {

    enteredCode =
      enteredCode.slice(0, -1);

    wrongCode.classList.remove("show");

    updateDots();

  });


  /* UPDATE DOTS */

  function updateDots() {

    pinDots.forEach((dot, index) => {

      if (index < enteredCode.length) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }

    });

  }


  /* CHECK 0716 */

  function checkCode() {

    if (enteredCode === SECRET_CODE) {

      wrongCode.classList.remove("show");

      setTimeout(() => {

        pinModal.classList.remove("show");

        document
          .getElementById("messageModal")
          .classList.add("show");

      }, 300);

    } else {

      wrongCode.textContent =
        "Wrong code. Try again.";

      wrongCode.classList.add("show");

      pinDots.forEach(dot => {
        dot.classList.remove("active");
      });

      setTimeout(() => {

        enteredCode = "";

        updateDots();

      }, 650);

    }

  }


  /* ==========================================
     MESSAGE MODAL
  ========================================== */

  const messageModal =
    document.getElementById("messageModal");

  const messageClose =
    document.getElementById("messageClose");

  messageClose.addEventListener("click", () => {

    messageModal.classList.remove("show");

    document.body.classList.remove("lock");

  });


  messageModal.addEventListener("click", event => {

    if (event.target === messageModal) {

      messageModal.classList.remove("show");

      document.body.classList.remove("lock");

    }

  });


  /* ==========================================
     ESC KEY
  ========================================== */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      pinModal.classList.remove("show");

      messageModal.classList.remove("show");

      document.body.classList.remove("lock");

    }

  });


  /* ==========================================
     IMAGE FULLSCREEN VIEWER
  ========================================== */

  const viewer =
    document.getElementById("imageViewer");

  const viewerImage =
    document.getElementById("viewerImage");

  const viewerClose =
    document.getElementById("viewerClose");

  const allImages =
    document.querySelectorAll(
      ".story-image img, .small-photo img, .wide-photo img, .final-gallery img"
    );


  allImages.forEach(image => {

    image.addEventListener("click", () => {

      viewerImage.src = image.src;

      viewer.classList.add("show");

      document.body.classList.add("lock");

    });

  });


  viewerClose.addEventListener("click", closeViewer);


  viewer.addEventListener("click", event => {

    if (event.target === viewer) {
      closeViewer();
    }

  });


  function closeViewer() {

    viewer.classList.remove("show");

    document.body.classList.remove("lock");

  }


  /* ==========================================
     IMAGE ERROR
  ========================================== */

  document
    .querySelectorAll("img")
    .forEach(image => {

      image.addEventListener("error", () => {

        image.style.opacity = "0";

        image.parentElement.style.background =
          "linear-gradient(135deg,#292929,#111)";

      });

    });


  /* ==========================================
     HERO PARALLAX
  ========================================== */

  const heroImage =
    document.querySelector(".hero-image");

  window.addEventListener("scroll", () => {

    const y = window.scrollY;

    if (y < window.innerHeight) {

      heroImage.style.transform =
        `scale(1.08) translateY(${y * 0.08}px)`;

    }

  });


  /* ==========================================
     PIN KEYBOARD SUPPORT
  ========================================== */

  document.addEventListener("keydown", event => {

    if (!pinModal.classList.contains("show")) {
      return;
    }

    if (/^[0-9]$/.test(event.key)) {

      if (enteredCode.length < 4) {

        enteredCode += event.key;

        updateDots();

        if (enteredCode.length === 4) {
          setTimeout(checkCode, 200);
        }

      }

    }

    if (event.key === "Backspace") {

      enteredCode =
        enteredCode.slice(0, -1);

      updateDots();

    }

  });

});