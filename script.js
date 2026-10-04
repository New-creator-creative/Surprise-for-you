/* =========================================================
   LOVE SURPRISE — SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const intro = document.getElementById("intro");
  const startBtn = document.getElementById("startBtn");
  const experience = document.getElementById("experience");

  const mainPhoto = document.getElementById("mainPhoto");
  const photoNumber = document.getElementById("photoNumber");
  const photoCounter = document.getElementById("photoCounter");

  const currentNumber = document.getElementById("currentNumber");
  const progressFill = document.getElementById("progressFill");

  const memoryLabel = document.getElementById("memoryLabel");
  const memoryTitle = document.getElementById("memoryTitle");
  const memoryDescription = document.getElementById("memoryDescription");

  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const memoryDots = document.getElementById("memoryDots");

  const mapBtn = document.getElementById("mapBtn");
  const closeMapBtn = document.getElementById("closeMapBtn");
  const sectionMenu = document.getElementById("sectionMenu");

  const toGamesBtn = document.getElementById("toGamesBtn");

  const transition = document.getElementById("transition");

  const restartBtn = document.getElementById("restartBtn");

  /* =======================================================
     DATA
     ======================================================= */

  const memories = [

    {
      title: "Bir kichik xotira.",
      description:
        "Ba'zi lahzalar oddiy ko'rinadi, ammo vaqt o'tgach ularning qadri bilinadi."
    },

    {
      title: "Sening tabassuming.",
      description:
        "Ba'zan bitta tabassum butun kunni chiroyli qilishga yetadi."
    },

    {
      title: "Oddiy lahza.",
      description:
        "Eng yaxshi xotiralar har doim katta voqealardan yaratilmaydi."
    },

    {
      title: "Shunchaki sen.",
      description:
        "Seni boshqalardan ajratib turadigan o'ziga xosliging bor."
    },

    {
      title: "Bir lahza.",
      description:
        "Vaqt o'tadi, lekin ayrim lahzalar xotirada qoladi."
    },

    {
      title: "Yaxshi kayfiyat.",
      description:
        "Sening borliging ba'zan oddiy kunni ham boshqacha qiladi."
    },

    {
      title: "Kichik sabab.",
      description:
        "Ba'zi insonlarni qadrlash uchun katta sabab izlash shart emas."
    },

    {
      title: "Yana bir xotira.",
      description:
        "Bu surat ham o'zining kichik hikoyasini saqlaydi."
    },

    {
      title: "Deyarli oxiri.",
      description:
        "Ammo eng qiziq qismi hali oldinda."
    },

    {
      title: "Eng muhim sahifa.",
      description:
        "Endi bu kichik sayohatning oxirgi siriga yetib kelding."
    }

  ];

  const totalPhotos = 10;

  let currentPhoto = 1;

  let unlockedGames = {
    game1: false,
    game2: false,
    game3: false,
    secret: false
  };


  /* =======================================================
     INTRO
     ======================================================= */

  startBtn.addEventListener("click", () => {

    intro.classList.add("hide");

    setTimeout(() => {

      experience.classList.remove("hidden");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }, 700);

  });


  /* =======================================================
     PHOTO DOTS
     ======================================================= */

  function createMemoryDots() {

    memoryDots.innerHTML = "";

    for (let i = 1; i <= totalPhotos; i++) {

      const dot = document.createElement("button");

      dot.className = "memory-dot";

      if (i === currentPhoto) {
        dot.classList.add("active");
      }

      dot.setAttribute("aria-label", `Xotira ${i}`);

      dot.addEventListener("click", () => {
        showPhoto(i);
      });

      memoryDots.appendChild(dot);
    }
  }


  /* =======================================================
     PHOTO DISPLAY
     ======================================================= */

  function showPhoto(number) {

    if (number < 1) {
      number = totalPhotos;
    }

    if (number > totalPhotos) {
      number = 1;
    }

    currentPhoto = number;

    const photoData = memories[number - 1];

    const formattedNumber =
      String(number).padStart(2, "0");

    /*
      Transition
    */

    transition.classList.add("active");

    setTimeout(() => {

      mainPhoto.classList.remove("zoom");

      mainPhoto.src = `images/love${number}.jpg`;

      mainPhoto.alt = `Xotira ${number}`;

      photoNumber.textContent =
        `${formattedNumber} / 10`;

      photoCounter.textContent =
        `${formattedNumber} / 10`;

      if (currentNumber) {
        currentNumber.textContent =
          formattedNumber;
      }

      memoryLabel.textContent =
        `MEMORY ${formattedNumber}`;

      memoryTitle.textContent =
        photoData.title;

      memoryDescription.textContent =
        photoData.description;

      progressFill.style.width =
        `${number * 10}%`;

      createMemoryDots();

      setTimeout(() => {

        transition.classList.remove("active");

        setTimeout(() => {
          mainPhoto.classList.add("zoom");
        }, 100);

      }, 250);

    }, 450);

  }


  /* =======================================================
     NEXT / PREVIOUS
     ======================================================= */

  nextBtn.addEventListener("click", () => {

    if (currentPhoto < totalPhotos) {

      showPhoto(currentPhoto + 1);

    } else {

      unlockGame1();

    }

  });


  prevBtn.addEventListener("click", () => {

    showPhoto(currentPhoto - 1);

  });


  /* =======================================================
     SWIPE SUPPORT
     ======================================================= */

  let touchStartX = 0;

  mainPhoto.addEventListener("touchstart", (event) => {

    touchStartX = event.changedTouches[0].screenX;

  }, { passive: true });


  mainPhoto.addEventListener("touchend", (event) => {

    const touchEndX =
      event.changedTouches[0].screenX;

    const difference =
      touchStartX - touchEndX;

    if (Math.abs(difference) < 50) {
      return;
    }

    if (difference > 0) {
      showPhoto(currentPhoto + 1);
    } else {
      showPhoto(currentPhoto - 1);
    }

  }, { passive: true });


  /* =======================================================
     MAP
     ======================================================= */

  mapBtn.addEventListener("click", () => {

    sectionMenu.classList.add("open");

  });


  closeMapBtn.addEventListener("click", () => {

    sectionMenu.classList.remove("open");

  });


  /* =======================================================
     SECTION NAVIGATION
     ======================================================= */

  const sectionLinks =
    document.querySelectorAll(".section-link");

  sectionLinks.forEach(link => {

    link.addEventListener("click", () => {

      const targetId =
        link.dataset.section;

      const target =
        document.getElementById(targetId);

      if (!target) return;

      /*
        Locked check
      */

      if (
        targetId === "game1Section" &&
        !unlockedGames.game1
      ) {

        showNotification(
          "🔒 Avval xotiralarni ko‘rib chiq."
        );

        return;
      }


      if (
        targetId === "game2Section" &&
        !unlockedGames.game2
      ) {

        showNotification(
          "🔒 Avval birinchi o‘yinni tugat."
        );

        return;
      }


      if (
        targetId === "game3Section" &&
        !unlockedGames.game3
      ) {

        showNotification(
          "🔒 Avval tezkor sinovni bajaring."
        );

        return;
      }


      if (
        targetId === "secretSection" &&
        !unlockedGames.secret
      ) {

        showNotification(
          "🔒 Avval barcha topshiriqlarni bajaring."
        );

        return;
      }

      sectionMenu.classList.remove("open");

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });


  /* =======================================================
     GO TO GAMES
     ======================================================= */

  toGamesBtn.addEventListener("click", () => {

    unlockGame1();

    document
      .getElementById("game1Section")
      .scrollIntoView({
        behavior: "smooth"
      });

  });


  function unlockGame1() {

    unlockedGames.game1 = true;

    updateMenu();

  }


  /* =======================================================
     MENU STATUS
     ======================================================= */

  function updateMenu() {

    const links =
      document.querySelectorAll(".section-link");

    links.forEach(link => {

      const section =
        link.dataset.section;

      const status =
        link.querySelector(".section-status");

      if (section === "game1Section") {

        status.textContent =
          unlockedGames.game1 ? "✓" : "🔒";

      }

      if (section === "game2Section") {

        status.textContent =
          unlockedGames.game2 ? "✓" : "🔒";

      }

      if (section === "game3Section") {

        status.textContent =
          unlockedGames.game3 ? "✓" : "🔒";

      }

      if (section === "secretSection") {

        status.textContent =
          unlockedGames.secret ? "✓" : "🔒";

      }

    });

  }


  /* =======================================================
     NOTIFICATION
     ======================================================= */

  function showNotification(message) {

    const old =
      document.querySelector(".custom-notification");

    if (old) {
      old.remove();
    }

    const notification =
      document.createElement("div");

    notification.className =
      "custom-notification";

    notification.textContent =
      message;

    document.body.appendChild(notification);

    setTimeout(() => {

      notification.classList.add("show");

    }, 20);

    setTimeout(() => {

      notification.classList.remove("show");

      setTimeout(() => {
        notification.remove();
      }, 400);

    }, 2300);

  }


  /* =======================================================
     MEMORY MATCH GAME
     ======================================================= */

  const memoryGame =
    document.getElementById("memoryGame");

  const memoryGameStatus =
    document.getElementById("memoryGameStatus");

  const resetMemoryGame =
    document.getElementById("resetMemoryGame");


  const symbols = [
    "♡",
    "✦",
    "★",
    "∞"
  ];


  let cards = [];
  let firstCard = null;
  let secondCard = null;
  let lockBoard = false;
  let matchedPairs = 0;


  function createMemoryGame() {

    if (!memoryGame) return;

    memoryGame.innerHTML = "";

    cards = [];
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    matchedPairs = 0;

    const deck = [
      ...symbols,
      ...symbols
    ].sort(() => Math.random() - 0.5);


    deck.forEach(symbol => {

      const card =
        document.createElement("button");

      card.className =
        "memory-card";

      card.dataset.symbol =
        symbol;

      card.innerHTML = `
        <span class="card-front">?</span>
        <span class="card-back">${symbol}</span>
      `;

      card.addEventListener(
        "click",
        () => flipCard(card)
      );

      memoryGame.appendChild(card);

    });

  }


  function flipCard(card) {

    if (
      lockBoard ||
      card === firstCard ||
      card.classList.contains("matched")
    ) {
      return;
    }

    card.classList.add("flipped");

    if (!firstCard) {

      firstCard = card;

      return;

    }

    secondCard = card;

    checkMatch();

  }


  function checkMatch() {

    const match =
      firstCard.dataset.symbol ===
      secondCard.dataset.symbol;


    if (match) {

      firstCard.classList.add("matched");
      secondCard.classList.add("matched");

      matchedPairs++;

      resetTurn();

      if (matchedPairs === symbols.length) {

        memoryGameStatus.textContent =
          "✨ Zo‘r! Birinchi sir ochildi.";

        unlockedGames.game2 = true;

        updateMenu();

        setTimeout(() => {

          document
            .getElementById("game2Section")
            .scrollIntoView({
              behavior: "smooth"
            });

        }, 1000);

      }

    } else {

      lockBoard = true;

      setTimeout(() => {

        firstCard.classList.remove("flipped");
        secondCard.classList.remove("flipped");

        resetTurn();

      }, 800);

    }

  }


  function resetTurn() {

    firstCard = null;
    secondCard = null;
    lockBoard = false;

  }


  if (resetMemoryGame) {

    resetMemoryGame.addEventListener(
      "click",
      createMemoryGame
    );

  }


  createMemoryGame();


  /* =======================================================
     REACTION GAME
     ======================================================= */

  const reactionArena =
    document.getElementById("reactionArena");

  const reactionSymbol =
    document.getElementById("reactionSymbol");

  const reactionStatus =
    document.getElementById("reactionStatus");

  const reactionStartBtn =
    document.getElementById("reactionStartBtn");


  let reactionStarted = false;
  let reactionReady = false;
  let reactionStartTime = 0;
  let reactionTimer = null;


  reactionStartBtn.addEventListener(
    "click",
    startReactionGame
  );


  function startReactionGame() {

    reactionStarted = true;
    reactionReady = false;

    reactionStatus.textContent =
      "Kut...";

    reactionSymbol.style.display =
      "none";

    reactionArena.classList.remove(
      "ready"
    );

    const delay =
      1200 + Math.random() * 2500;


    clearTimeout(reactionTimer);


    reactionTimer = setTimeout(() => {

      reactionReady = true;

      reactionStartTime =
        performance.now();

      reactionSymbol.textContent =
        "✦";

      reactionSymbol.style.display =
        "flex";

      reactionArena.classList.add(
        "ready"
      );

      reactionStatus.textContent =
        "HOZIR! BOS!";

    }, delay);

  }


  reactionArena.addEventListener(
    "click",
    handleReactionClick
  );


  function handleReactionClick() {

    if (!reactionStarted) return;


    if (!reactionReady) {

      reactionStatus.textContent =
        "😄 Juda erta! Qaytadan urin.";

      return;

    }


    const reactionTime =
      Math.round(
        performance.now() -
        reactionStartTime
      );


    reactionReady = false;
    reactionStarted = false;

    reactionSymbol.style.display =
      "none";

    reactionArena.classList.remove(
      "ready"
    );


    reactionStatus.textContent =
      `${reactionTime} ms — ajoyib! ✨`;


    unlockedGames.game3 = true;

    updateMenu();


    setTimeout(() => {

      document
        .getElementById("game3Section")
        .scrollIntoView({
          behavior: "smooth"
        });

    }, 1200);

  }


  /* =======================================================
     RIDDLE GAME
     ======================================================= */

  const riddleOptions =
    document.querySelectorAll(
      ".riddle-option"
    );

  const riddleStatus =
    document.getElementById(
      "riddleStatus"
    );


  riddleOptions.forEach(option => {

    option.addEventListener(
      "click",
      () => {

        const answer =
          option.dataset.answer;


        if (answer === "care") {

          option.classList.add("correct");

          riddleStatus.textContent =
            "✨ To‘g‘ri! Sen oxirgi sirga yetding.";

          unlockedGames.secret = true;

          updateMenu();

          setTimeout(() => {

            document
              .getElementById("secretSection")
              .scrollIntoView({
                behavior: "smooth"
              });

          }, 1000);

        } else {

          option.classList.add("wrong");

          riddleStatus.textContent =
            "Hmmm... yana bir bor o‘yla. 🤔";

          setTimeout(() => {

            option.classList.remove(
              "wrong"
            );

          }, 500);

        }

      }
    );

  });


  /* =======================================================
     SECRET CODE
     ======================================================= */

  const secretForm =
    document.getElementById("secretForm");

  const secretCode =
    document.getElementById("secretCode");

  const codeError =
    document.getElementById("codeError");

  const secretMessage =
    document.getElementById(
      "secretMessage"
    );


  secretForm.addEventListener(
    "submit",
    event => {

      event.preventDefault();

      const code =
        secretCode.value.trim();


      if (code === "0716") {

        codeError.textContent = "";

        openSecretMessage();

      } else {

        codeError.textContent =
          "🔒 Kod noto‘g‘ri. Sir hali ochilmadi...";

        secretCode.value = "";

        secretCode.animate(
          [
            { transform: "translateX(-6px)" },
            { transform: "translateX(6px)" },
            { transform: "translateX(-4px)" },
            { transform: "translateX(4px)" },
            { transform: "translateX(0)" }
          ],
          {
            duration: 350
          }
        );

      }

    }
  );


  /* =======================================================
     FINAL SECRET
     ======================================================= */

  function openSecretMessage() {

    secretForm.style.display =
      "none";

    secretMessage.hidden = false;

    secretMessage.classList.add(
      "show"
    );

    unlockedGames.secret = true;

    updateMenu();

    createHeartExplosion();

  }


  /* =======================================================
     HEART / PARTICLE EFFECT
     ======================================================= */

  function createHeartExplosion() {

    const symbols = [
      "♡",
      "♥",
      "✦",
      "✧"
    ];


    for (let i = 0; i < 28; i++) {

      const particle =
        document.createElement("span");

      particle.className =
        "heart-particle";

      particle.textContent =
        symbols[
          Math.floor(
            Math.random() *
            symbols.length
          )
        ];


      particle.style.left =
        `${50 + (Math.random() * 30 - 15)}%`;

      particle.style.top =
        `${50 + (Math.random() * 20 - 10)}%`;


      particle.style.setProperty(
        "--x",
        `${Math.random() * 500 - 250}px`
      );

      particle.style.setProperty(
        "--y",
        `${Math.random() * 600 - 300}px`
      );

      particle.style.animationDelay =
        `${Math.random() * .4}s`;


      document.body.appendChild(
        particle
      );


      setTimeout(() => {
        particle.remove();
      }, 1800);

    }

  }


  /* =======================================================
     RESTART
     ======================================================= */

  restartBtn.addEventListener(
    "click",
    () => {

      location.reload();

    }
  );


  /* =======================================================
     KEYBOARD SHORTCUTS
     ======================================================= */

  document.addEventListener(
    "keydown",
    event => {

      if (
        event.key === "ArrowRight"
      ) {

        showPhoto(
          currentPhoto + 1
        );

      }

      if (
        event.key === "ArrowLeft"
      ) {

        showPhoto(
          currentPhoto - 1
        );

      }

    }
  );


  /* =======================================================
     INITIALIZE
     ======================================================= */

  createMemoryDots();

  showPhoto(1);

  updateMenu();


});