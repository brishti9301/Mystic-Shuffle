const questionInput = document.getElementById("questionInput");
const categoryInput = document.getElementById("categoryInput");

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");

const deck = document.getElementById("deck");
const cardArea = document.getElementById("cardArea");

const result = document.getElementById("result");
const resultCardName = document.getElementById("resultCardName");
const resultMeaning = document.getElementById("resultMeaning");

let shuffleInterval;
let finalCard = null;
let isShuffling = false;

result.style.display = "none";

function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * tarotDeck.length);
  return tarotDeck[randomIndex];
}

function startShuffling() {
  const question = questionInput.value.trim();

  if (question === "") {
    alert("Please enter your question first.");
    return;
  }

  isShuffling = true;
  finalCard = null;

  result.style.display = "none";
  cardArea.innerHTML = "";

  startButton.disabled = true;
  stopButton.disabled = false;

  deck.textContent = "Shuffling...";

  shuffleInterval = setInterval(function () {
    const temporaryCard = getRandomCard();
    deck.textContent = temporaryCard.name;
  }, 100);
}

function stopShuffling() {
  if (!isShuffling) return;

  clearInterval(shuffleInterval);

  isShuffling = false;
  finalCard = getRandomCard();

  deck.textContent = "Choose the card that calls to you.";

  startButton.disabled = false;
  stopButton.disabled = true;

  showTwelveFaceDownCards();
}

function showTwelveFaceDownCards() {
  cardArea.innerHTML = "";

  for (let i = 0; i < 12; i++) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("tarot-card");

    cardElement.textContent = "🂠";

    cardElement.addEventListener("click", function () {
      revealCard(cardElement);
    });

    cardArea.appendChild(cardElement);
  }
}

function revealCard(cardElement) {
  const selectedCategory = categoryInput.value;
  const question = questionInput.value.trim();

  cardElement.textContent = finalCard.name;
  cardElement.classList.add("revealed");

  result.style.display = "block";

  resultCardName.textContent = finalCard.name;

  resultMeaning.textContent = `For your question, "${question}", ${finalCard.name} suggests: ${finalCard.meanings[selectedCategory]}`;

  const allCards = document.querySelectorAll(".tarot-card");

  allCards.forEach(function (card) {
    card.style.pointerEvents = "none";

    if (card !== cardElement) {
      card.style.opacity = "0.4";
    }
  });
}

startButton.addEventListener("click", startShuffling);
stopButton.addEventListener("click", stopShuffling);