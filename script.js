console.log("HOUT QUIZ – VOLLEDIGE STABIELE VERSIE");

// ================= DATA =================
const woods = [
  { name: "Beuken", image: "images/beuken/1.jpg", properties: ["Fijnporig", "Hard loofhout", "Licht roze/crème"], uses: ["Meubels", "Stoelen", "Interieurbouw"], price: 2 },
  { name: "Esdoorn", image: "images/esdoorn/1.jpg", properties: ["Zeer hard", "Fijne nerf", "Zeer licht van kleur"], uses: ["Keukens", "Trappen", "Instrumenten"], price: 3 },
  { name: "Essen", image: "images/essen/1.jpg", properties: ["Taai", "Elastisch", "Rechte draad"], uses: ["Sportartikelen", "Meubels", "Trappen"], price: 2 },
  { name: "Europees eiken", image: "images/europees-eiken/1.jpg", properties: ["Zeer sterk", "Grove poriën", "Veel looizuur"], uses: ["Vloeren", "Meubels", "Constructie"], price: 3 },
  { name: "Grenen", image: "images/grenen/1.jpg", properties: ["Zacht", "Veel noesten", "Lichtgewicht"], uses: ["Bouw", "Meubels", "Aftimmering"], price: 1 },
  { name: "Iepen", image: "images/iepen/1.jpg", properties: ["Taai", "Kruisdraad", "Bestand tegen vocht"], uses: ["Meubels", "Scheepsbouw", "Constructie"], price: 3 },
  { name: "Iroko", image: "images/iroko/1.jpg", properties: ["Duurzaam", "Olieachtig", "Goudbruin"], uses: ["Buitenwerk", "Kozijnen", "Terrassen"], price: 3 },
  { name: "Kersen", image: "images/kersen/1.jpg", properties: ["Fijn", "Warm roodbruin", "Verkleurt sterk"], uses: ["Luxe meubels", "Interieur"], price: 3 },
  { name: "Mahonie", image: "images/mahonie/1.jpg", properties: ["Stabiel", "Roodbruin", "Fijne nerf"], uses: ["Meubels", "Scheepsinterieur"], price: 4 },
  { name: "Noten", image: "images/noten/1.jpg", properties: ["Donker", "Decoratief", "Hard"], uses: ["Design meubels", "Fineer"], price: 4 },
  { name: "Pokhout", image: "images/pokhout/1.jpg", properties: ["Zeer hard", "Zelfsmerend", "Zwaar"], uses: ["Lagers", "Technische onderdelen"], price: 4 },
  { name: "Purperhart", image: "images/purperhart/1.jpg", properties: ["Paars", "Hard", "Verkleurt"], uses: ["Accenten", "Design"], price: 4 },
  { name: "Rood eiken", image: "images/rood-eiken/1.jpg", properties: ["Open poriën", "Sterk", "Lichtbruin"], uses: ["Meubels", "Interieur"], price: 2 },
  { name: "Teak", image: "images/teak/1.jpg", properties: ["Zeer duurzaam", "Olieachtig", "Stabiel"], uses: ["Buitenmeubels", "Scheepsbouw"], price: 4 },
  { name: "Vuren", image: "images/vuren/1.jpg", properties: ["Zacht", "Licht", "Rechte draad"], uses: ["Bouw", "Constructie"], price: 1 },
  { name: "Wengé", image: "images/wenge/1.jpg", properties: ["Zeer donker", "Hard", "Grove nerf"], uses: ["Design meubels", "Accenten"], price: 4 },
  { name: "Zebrano", image: "images/zebrano/1.jpg", properties: ["Gestreept", "Hard", "Decoratief"], uses: ["Fineer", "Design"], price: 4 }
];

// ================= STATE =================
let streak = 0;
let highscore = 0;
let woodDeck = [];
let currentWood = null;
let wrongAttempts = 0;
let gameMode = "name"; // "name" of "uses"

// ================= HELPERS =================
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getNextWood() {
  if (woodDeck.length === 0) {
    woodDeck = shuffle(woods);
  }
  return woodDeck.pop();
}

function priceLabel(level) {
  return "€".repeat(level) + "–".repeat(4 - level);
}

// ================= STREAK-BALK =================
function updateStreakBar() {
  const bar = document.getElementById("streak-bar");
  const text = document.getElementById("streak-text");
  const maxStreak = 10; // volle balk bij 10
  let percent = Math.min((streak / maxStreak) * 100, 100);
  bar.style.width = percent + "%";

  if (percent === 100) {
    bar.style.backgroundColor = "#FFD700"; // goud
    text.textContent = "🎉 Gefeliciteerd! Max streak!";
  } else {
    bar.style.backgroundColor = "#4caf50";
    text.textContent = `Streak: ${streak}`;
  }

  // animatie bij fout
  if (streak === 0) {
    bar.style.backgroundColor = "#f44336";
    setTimeout(() => {
      bar.style.backgroundColor = "#4caf50";
    }, 200);
  }
}

// ================= GAMEMODE SWITCH =================
function setMode(mode) {
  gameMode = mode;
  woodDeck = [];
  streak = 0;
  updateStreakBar();
  nextQuestion();
}

// ================= QUIZ =================
function nextQuestion() {
  wrongAttempts = 0;
  document.getElementById("feedback").textContent = "";

  currentWood = getNextWood();

  // Vraagtekst
  if (gameMode === "name") {
    document.getElementById("wood-name").textContent = currentWood.name;
    document.getElementById("wood-info").innerHTML = "";
  } else if (gameMode === "uses") {
    document.getElementById("wood-name").textContent =
      "Toepassingen: " + currentWood.uses.join(", ");
    document.getElementById("wood-info").innerHTML =
      `<strong>Eigenschappen:</strong> ${currentWood.properties.join(" • ")}`;
  }

  // opties
  const options = shuffle([
    currentWood,
    ...shuffle(woods.filter(w => w !== currentWood)).slice(0, 11)
  ]);

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  options.forEach(wood => {
    const img = document.createElement("img");
    img.src = wood.image;

    img.onclick = () => {
      if (img.classList.contains("correct") || img.classList.contains("wrong")) return;

      if (wood === currentWood) {
        img.classList.add("correct");
        document.getElementById("feedback").textContent = "✔️ Goed!";
        streak++;
        if (streak > highscore) highscore = streak;
        updateStreakBar();

        if (gameMode === "uses") {
          document.getElementById("wood-info").innerHTML =
            `<strong>Naam:</strong> ${currentWood.name}<br>
             <strong>Eigenschappen:</strong> ${currentWood.properties.join(" • ")}<br>
             <strong>Toepassingen:</strong> ${currentWood.uses.join(", ")}<br>
             <strong>Prijsklasse:</strong> ${priceLabel(currentWood.price)}`;
        } else {
          document.getElementById("wood-info").innerHTML =
            `<strong>Eigenschappen:</strong> ${currentWood.properties.join(" • ")}<br>
             <strong>Toepassingen:</strong> ${currentWood.uses.join(", ")}<br>
             <strong>Prijsklasse:</strong> ${priceLabel(currentWood.price)}`;
        }

      } else {
        img.classList.add("wrong");
        wrongAttempts++;
        streak = 0;
        updateStreakBar();
        document.getElementById("feedback").textContent = "❌ Fout";

        if (gameMode === "uses" && wrongAttempts === 1) {
          document.getElementById("wood-info").innerHTML +=
            `<br><strong>Hint – Naam:</strong> ${currentWood.name}`;
        }
      }
    };

    grid.appendChild(img);
  });
}

// ================= START =================
nextQuestion();
