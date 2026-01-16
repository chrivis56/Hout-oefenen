let woodDeck = [
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

let streak = 0;
let highscore = 0;

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}
function getNextWood() {
  // als deck leeg is → nieuwe cyclus
  if (woodDeck.length === 0) {
    woodDeck = [...woods];   // kopie
    shuffle(woodDeck);       // random volgorde
  }

  return woodDeck.pop();     // pak er 1
}
function nextQuestion() {
  document.getElementById("feedback").textContent = "";

  const wood = getNextWood();
  document.getElementById("wood-name").textContent = wood.name;

  // 1 juiste afbeelding + 11 fout
  let images = [wood.image];

  const otherWoods = woods.filter(w => w !== wood);
  shuffle(otherWoods);

  for (let i = 0; i < 11 && i < otherWoods.length; i++) {
    images.push(otherWoods[i].image);
  }

  images = shuffle(images);

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  images.forEach(src => {
    const img = document.createElement("img");
    img.src = src;

    img.onclick = () => {
      if (src === wood.image) {
        // juiste keuze
        img.classList.add("correct");
        document.getElementById("feedback").textContent = "✔️ Goed!";
        streak++;
        if (streak > highscore) {
          highscore = streak;
        }
      } else {
        // foute keuze
        img.classList.add("wrong");
        document.getElementById("feedback").textContent = "❌ Fout";
        streak = 0; // reset streak
      }

      // update display
      document.getElementById("streak").textContent = `Streak: ${streak}`;
      document.getElementById("highscore").textContent = `Highscore: ${highscore}`;
    };

    grid.appendChild(img);
  });
}

// start eerste vraag
nextQuestion();
