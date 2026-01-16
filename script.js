const woods = [
  { name: "Beuken", image: "images/beuken/1.jpg" },
  { name: "Esdoorn", image: "images/esdoorn/1.jpg" },
  { name: "Essen", image: "images/essen/1.jpg" },
  { name: "Europees eiken", image: "images/europees-eiken/1.jpg" },
  { name: "Grenen", image: "images/grenen/1.jpg" },
  { name: "Iepen", image: "images/iepen/1.jpg" },
  { name: "Iroko", image: "images/iroko/1.jpg" },
  { name: "Kersen", image: "images/kersen/1.jpg" },
  { name: "Mahonie", image: "images/mahonie/1.jpg" },
  { name: "Noten", image: "images/noten/1.jpg" },
  { name: "Pokhout", image: "images/pokhout/1.jpg" },
  { name: "Purperhart", image: "images/purperhart/1.jpg" },
  { name: "Rood eiken", image: "images/rood-eiken/1.jpg" },
  { name: "Teak", image: "images/teak/1.jpg" },
  { name: "Vuren", image: "images/vuren/1.jpg" },
  { name: "Wengé", image: "images/wenge/1.jpg" },
  { name: "Zebrano", image: "images/zebrano/1.jpg" }
];

// 🔹 quiz state
let streak = 0;
let highscore = 0;
let woodDeck = [];
let currentWood = null;
let answeredCorrectly = false;

// 🔹 shuffle ZONDER originele array te slopen
function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// 🔹 volgende houtsoort (1x per cyclus)
function getNextWood() {
  if (woodDeck.length === 0) {
    woodDeck = shuffle(woods);
  }
  return woodDeck.pop();
}

function nextQuestion() {
  answeredCorrectly = false;
  document.getElementById("feedback").textContent = "";

  currentWood = getNextWood();
  document.getElementById("wood-name").textContent = currentWood.name;

  // juiste + 11 foute
  let options = [currentWood];

  const others = woods.filter(w => w !== currentWood);
  const shuffledOthers = shuffle(others).slice(0, 11);
  options = shuffle([...options, ...shuffledOthers]);

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
        answeredCorrectly = true;

        streak++;
        if (streak > highscore) highscore = streak;
      } else {
        img.classList.add("wrong");
        document.getElementById("feedback").textContent = "❌ Fout";
        streak = 0;
      }

      document.getElementById("streak").textContent = `Streak: ${streak}`;
      document.getElementById("highscore").textContent = `Highscore: ${highscore}`;
    };

    grid.appendChild(img);
  });
}

// 🔹 start quiz
nextQuestion();
