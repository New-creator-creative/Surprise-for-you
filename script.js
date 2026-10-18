/* Matnlarni shu yerda oʻzingizga moslab tahrir qiling */
const CONFIG = {
  name: "Marjona",
  reasons: [
    "Sen kulganingda butun kun yorishib ketadi.",
    "Sen bilan oddiy daqiqalar ham xotiraga aylanadi.",
    "Sen yoningda boʻlsang, ichim tinch.",
    "Sening oldingda oʻzim boʻlib qola olaman.",
    "Ismingdek qadrlisan: dengiz tubidagi eng noyob marvarid."
  ],
  compliments: [
    "Sen dunyodagi eng chiroyli tabassumga egasan 😊",
    "Sen kirib kelsang, xona yorishib ketadi ✨",
    "Sening ovozingni eshitish kunimning eng yaxshi qismi 🎧",
    "Sen kofedan ham, shokoladdan ham shirinroqsan 🍫",
    "Sen — mening eng sevimli odamim 💖",
    "Yulduzlar ham sendan hasad qiladi 🌟",
    "Sen bilan vaqt qanday oʻtganini bilmay qolaman ⏳",
    "Sen — meni har kuni kulgan qiladigan sababsan 😄"
  ],
  letter: "Azizim Marjona,\n\nBu sahifani faqat sen uchun yasadim. Sen bilan oʻtgan har kun menga shuni oʻrgatdi: baxt katta narsalarda emas, yoningda sen borligingda ekan.\n\nMarvarid dengiz tubida, sabr bilan paydo boʻladi va uni topgan odamni baxtiyor qiladi. Men seni topganim uchun baxtiyorman.\n\nSeni sevaman. Bugun ham, ertaga ham.\n\nSeni sevuvchi",
  question: "Marjona, sen ham meni sevasanmi?",
  goal: 10
};

const $ = id => document.getElementById(id);
const stages = ["intro", "reasons", "game", "comp", "letterStage", "ask", "thanks"];
const calm = matchMedia("(prefers-reduced-motion: reduce)").matches;
let i = 0, scale = 1, score = 0, timer = null, lastComp = -1;

function show(id) {
  stages.forEach(s => $(s).hidden = s !== id);
  window.scrollTo(0, 0);
}

/* Uchib chiqadigan yuraklar */
function hearts(n) {
  if (calm) return;
  for (let k = 0; k < n; k++) {
    const h = document.createElement("span");
    h.className = "heart";
    h.textContent = "♥";
    h.style.left = Math.random() * 100 + "vw";
    h.style.fontSize = (16 + Math.random() * 28) + "px";
    h.style.animationDuration = (3 + Math.random() * 3) + "s";
    h.style.animationDelay = (Math.random() * 1.2) + "s";
    h.addEventListener("animationend", () => h.remove());
    document.body.appendChild(h);
  }
}

/* Sabablar */
function showReason() {
  $("count").textContent = (i + 1) + " / " + CONFIG.reasons.length;
  $("reason").textContent = CONFIG.reasons[i];
  $("next").textContent = i === CONFIG.reasons.length - 1 ? "Oʻyinga oʻtish" : "Keyingisi";
}

/* Yurak tutish oʻyini */
function spawn() {
  const b = document.createElement("button");
  b.className = "drop";
  b.textContent = Math.random() < .5 ? "♥" : "💖";
  b.setAttribute("aria-label", "Yurakni tut");
  b.style.left = Math.random() * 82 + "%";
  b.style.fontSize = (28 + Math.random() * 20) + "px";
  b.style.animationDuration = (3.2 + Math.random() * 2) + "s";
  b.addEventListener("animationend", e => {
    if (e.animationName === "fall") b.remove();
  });
  b.addEventListener("pointerdown", () => {
    if (b.classList.contains("caught")) return;
    b.classList.add("caught");
    setTimeout(() => b.remove(), 250);
    score++;
    $("score").textContent = Math.min(score, CONFIG.goal) + " / " + CONFIG.goal;
    if (score >= CONFIG.goal) finishGame();
  });
  $("field").appendChild(b);
}
function startGame() {
  score = 0;
  $("score").textContent = "0 / " + CONFIG.goal;
  $("field").innerHTML = "";
  $("afterGame").hidden = true;
  clearInterval(timer);
  spawn();
  timer = setInterval(spawn, 650);
}
function finishGame() {
  clearInterval(timer);
  $("field").innerHTML = "";
  $("score").textContent = "Barakalla, Marjona! 🎉";
  $("afterGame").hidden = false;
  hearts(25);
}

/* Iltifot mashinasi */
function nextCompliment() {
  let k;
  do { k = Math.floor(Math.random() * CONFIG.compliments.length); }
  while (k === lastComp && CONFIG.compliments.length > 1);
  lastComp = k;
  $("compText").textContent = CONFIG.compliments[k];
  $("compBtn").textContent = "Yana bitta";
  hearts(5);
}

/* "Yoʻq" tugmasi qochadi */
function dodge() {
  const x = (Math.random() - .5) * Math.min(260, innerWidth - 140);
  const y = (Math.random() - .5) * 160;
  $("no").style.transform = "translate(" + x + "px," + y + "px)";
  scale = Math.min(scale + .12, 1.8);
  $("yes").style.transform = "scale(" + scale + ")";
}

/* Ishga tushirish */
$("name").textContent = CONFIG.name;
$("letter").textContent = CONFIG.letter;
$("q").textContent = CONFIG.question;

$("pearl").addEventListener("click", () => { i = 0; showReason(); show("reasons"); hearts(8); });
$("next").addEventListener("click", () => {
  if (i < CONFIG.reasons.length - 1) { i++; showReason(); }
  else { show("game"); startGame(); }
});
$("afterGame").addEventListener("click", () => show("comp"));
$("compBtn").addEventListener("click", nextCompliment);
$("afterComp").addEventListener("click", () => show("letterStage"));
$("toAsk").addEventListener("click", () => show("ask"));
$("no").addEventListener("pointerenter", dodge);
$("no").addEventListener("click", dodge);
$("yes").addEventListener("click", () => { show("thanks"); hearts(40); });
$("again").addEventListener("click", () => {
  scale = 1;
  $("yes").style.transform = "";
  $("no").style.transform = "";
  $("compText").textContent = "Tugmani bos";
  $("compBtn").textContent = "Iltifot ol";
  show("intro");
});
