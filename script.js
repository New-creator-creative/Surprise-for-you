/* ===================================
   ONLY FOR YOU
   SCRIPT
=================================== */


/* YULDUZLAR */

const stars = document.getElementById("stars");

for (let i = 0; i < 100; i++) {

  const star = document.createElement("div");

  star.className = "star";

  star.style.left =
    Math.random() * 100 + "%";

  star.style.top =
    Math.random() * 100 + "%";

  const size =
    Math.random() * 3 + 1;

  star.style.width =
    size + "px";

  star.style.height =
    size + "px";

  star.style.animationDelay =
    Math.random() * 3 + "s";

  stars.appendChild(star);
}


/* SCROLL */

function scrollToSection(id) {

  const element =
    document.getElementById(id);

  if (element) {

    element.scrollIntoView({
      behavior: "smooth"
    });

  }
}


/* XATNI OCHISH */

function openLetter() {

  scrollToSection("letter");

  setTimeout(() => {
    openEnvelope();
  }, 700);

}


/* KONVERT */

function openEnvelope() {

  const envelope =
    document.getElementById("envelope");

  const text =
    document.getElementById("letterText");

  envelope.classList.toggle("open");

  if (
    envelope.classList.contains("open")
  ) {

    text.innerHTML =
      "Ba'zi insonlar hayotimizga kirib keladi va oddiy kunlarni ham chiroyli xotiraga aylantiradi. ✨<br><br>" +
      "Bu sahifa esa maxsus inson uchun yaratilgan. 💖";

  } else {

    text.innerHTML =
      "Bu xatni ochish uchun ustiga bosing...";

  }

}


/* RASMLAR */

function showPhoto(number) {

  const modal =
    document.getElementById("photoModal");

  const image =
    document.getElementById("modalImage");

  const numberText =
    document.getElementById("photoNumber");

  image.src =
    "images/love" +
    number +
    ".jpg";

  numberText.textContent =
    "Xotira " +
    number +
    " / 10";

  modal.classList.add("show");

  document.body.style.overflow =
    "hidden";

}


/* RASMNI YOPISH */

function closePhoto(event) {

  const modal =
    document.getElementById("photoModal");

  if (
    !event ||
    event.target === modal
  ) {

    modal.classList.remove("show");

    document.body.style.overflow =
      "";

  }

}


/* ESC */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {

      const modal =
        document.getElementById("photoModal");

      modal.classList.remove("show");

      document.body.style.overflow =
        "";

    }

  }
);


/* SOVG'A */

function openGift() {

  const gift =
    document.getElementById("gift");

  const text =
    document.getElementById("giftText");

  gift.style.animation =
    "none";

  gift.style.transform =
    "scale(1.1) rotate(3deg)";

  setTimeout(() => {

    gift.style.transform =
      "scale(1)";

  }, 250);

  text.classList.add("show");

  createHearts();

}


/* YURAKCHALAR */

function createHearts() {

  for (let i = 0; i < 15; i++) {

    const heart =
      document.createElement("div");

    heart.innerHTML =
      ["♡", "♥", "💖", "✨"][
        Math.floor(
          Math.random() * 4
        )
      ];

    heart.style.position =
      "fixed";

    heart.style.left =
      Math.random() * 100 + "%";

    heart.style.bottom =
      "20px";

    heart.style.fontSize =
      Math.random() * 20 +
      15 +
      "px";

    heart.style.zIndex =
      "200";

    heart.style.pointerEvents =
      "none";

    document.body.appendChild(
      heart
    );

    const animation =
      heart.animate(
        [
          {
            transform:
              "translateY(0) scale(1)",
            opacity: 1
          },

          {
            transform:
              `translateY(-${
                Math.random() * 70 + 40
              }vh)
              translateX(${
                Math.random() * 150 - 75
              }px)
              scale(.5)`,

            opacity: 0
          }
        ],

        {
          duration:
            Math.random() * 2000 +
            2000,

          easing:
            "ease-out"
        }
      );

    animation.onfinish = () => {
      heart.remove();
    };

  }

}


/* MINI O'YIN */

const heartPosition =
  Math.floor(
    Math.random() * 6
  );

let gameFinished = false;


function checkHeart(button) {

  if (gameFinished) {
    return;
  }

  const buttons =
    Array.from(
      document.querySelectorAll(
        ".game-board button"
      )
    );

  const clicked =
    buttons.indexOf(button);

  const message =
    document.getElementById(
      "gameMessage"
    );

  if (
    clicked === heartPosition
  ) {

    button.textContent =
      "💖";

    message.textContent =
      "Topding! ✨ Sir ochildi!";

    gameFinished = true;

    createHearts();

  } else {

    button.textContent =
      "✦";

    message.textContent =
      "Bu yerda emas... yana urinib ko'r 💫";

    setTimeout(() => {

      if (!gameFinished) {
        button.textContent = "?";
      }

    }, 700);

  }

}


/* COUNTDOWN */

const targetDate =
  new Date();

targetDate.setDate(
  targetDate.getDate() + 30
);


function updateCountdown() {

  const now =
    new Date().getTime();

  const distance =
    targetDate.getTime() - now;

  if (distance <= 0) {

    document.getElementById(
      "days"
    ).textContent = "00";

    document.getElementById(
      "hours"
    ).textContent = "00";

    document.getElementById(
      "minutes"
    ).textContent = "00";

    document.getElementById(
      "seconds"
    ).textContent = "00";

    return;
  }


  const days =
    Math.floor(
      distance /
      (1000 * 60 * 60 * 24)
    );

  const hours =
    Math.floor(
      (distance /
      (1000 * 60 * 60)) % 24
    );

  const minutes =
    Math.floor(
      (distance /
      (1000 * 60)) % 60
    );

  const seconds =
    Math.floor(
      (distance / 1000) % 60
    );


  document.getElementById(
    "days"
  ).textContent =
    String(days).padStart(2, "0");

  document.getElementById(
    "hours"
  ).textContent =
    String(hours).padStart(2, "0");

  document.getElementById(
    "minutes"
  ).textContent =
    String(minutes).padStart(2, "0");

  document.getElementById(
    "seconds"
  ).textContent =
    String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


/* FINAL SURPRISE */

function finalSurprise() {

  const message =
    document.getElementById(
      "finalMessage"
    );

  message.innerHTML = `

    <div style="
      margin-top:30px;
      font-size:30px;
      color:#ff9dcc;
      animation:heartPulse 1s infinite;
    ">
      ♡ ✨ 💖 ✨ ♡
    </div>

    <p style="
      margin-top:20px;
      color:#ddd;
      line-height:1.8;
    ">
      Ba'zan juda ko'p so'z kerak emas...
      <br>
      Muhimi — bu sahifa maxsus inson uchun yaratilgan. 🌙
    </p>

  `;

  createHearts();

}