window.onload = () => {
  let timerValue = document.getElementById("timerInput").value;
  let countdown = timerValue;
  let intervalId;

  // Referencias a elementos del DOM

  const generateButton = document.getElementById("generateCard");
  const card = document.getElementById("card");
  const timerDisplay = document.getElementById("timer");
  const widthInput = document.getElementById("widthInput");
  const heightInput = document.getElementById("heightInput");

  // Valores posibles para la carta

  const suits = ["spade", "club", "heart", "diamond"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K"
  ];
  const symbols = { spade: "♠", club: "♣", heart: "♥", diamond: "♦" };

  // Genera una carta aleatoria al iniciar la página y al hacer click en el botón de generar carta

  function generateRandomCard() {
    const randomSuit = suits[Math.floor(Math.random() * suits.length)];
    const randomValue = values[Math.floor(Math.random() * values.length)];
    displayCard(randomSuit, randomValue);
  }

  // Muestra la carta generada

  function displayCard(suit, value) {
    card.innerHTML = `
          <div class="corner top-left">${value}${symbols[suit]}</div>
          <div class="value">${value}</div>
          <div class="corner bottom-right">${value}${symbols[suit]}</div>`;
    card.className = `card ${suit}`; // Cambia la clase según el palo
  }

  // Maneja el cambio de dimensiones de la carta

  function updateCardDimensions() {
    card.style.width = widthInput.value + "px";
    card.style.height = heightInput.value + "px";
  }

  // Temporizador para cambiar automáticamente la carta. La llamo al iniciar la carga de la pagina y al hacer click en el boton de generar carta

  function startTimer() {
    clearInterval(intervalId);
    countdown = timerValue;
    timerDisplay.textContent = `Próxima carta aleatoria en: ${countdown} segundos`;
    intervalId = setInterval(() => {
      countdown--;
      timerDisplay.textContent = `Próxima carta aleatoria en: ${countdown} segundos`;
      if (countdown === 0) {
        generateRandomCard();
        startTimer(); // Reinicia el temporizador
      }
    }, 1000);
  }

  //Eventos click (cambio de carta) y change (cambio de temporizador)

  generateButton.addEventListener("click", () => {
    generateRandomCard();
    startTimer();
  });

  document.getElementById("timerInput").addEventListener("change", event => {
    timerValue = event.target.value;
    startTimer();
  });

  widthInput.addEventListener("input", updateCardDimensions);
  heightInput.addEventListener("input", updateCardDimensions);

  // Generar la primera carta al cargar la página

  generateRandomCard();
  startTimer();
};
