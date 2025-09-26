const quizContainer = document.getElementById("quiz-container");
const reviewBtn = document.getElementById("review-btn");

// Cria o quiz dinamicamente
function loadQuiz() {
  QUESTIONS.forEach((q, index) => {
    const card = document.createElement("div");
    card.classList.add("question-card");

    const questionText = document.createElement("p");
    questionText.textContent = `${index + 1}. ${q.question}`;
    card.appendChild(questionText);

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.choices.forEach((choice, i) => {
      const label = document.createElement("label");
      const input = document.createElement("input");
      input.type = "radio";
      input.name = `q${index}`;
      input.value = i;
      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      optionsDiv.appendChild(label);
    });

    card.appendChild(optionsDiv);

    const explanation = document.createElement("div");
    explanation.classList.add("explanation");
    explanation.style.display = "none"; // Inicialmente escondido
    explanation.textContent = q.explanation;
    card.appendChild(explanation);

    quizContainer.appendChild(card);
  });

  // Ativa botão Review quando todas as perguntas tiverem resposta
  quizContainer.addEventListener("change", () => {
    const allAnswered = QUESTIONS.every((q, index) =>
      document.querySelector(`input[name="q${index}"]:checked`)
    );
    reviewBtn.disabled = !allAnswered;
  });
}

// Função para revisar respostas
function reviewQuiz() {
  let correctCount = 0;

  QUESTIONS.forEach((q, index) => {
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const options = document.querySelectorAll(`input[name="q${index}"]`);
    const explanationDiv = selected.closest(".question-card").querySelector(".explanation");

    // Mostrar explicação
    explanationDiv.style.display = "block";

    options.forEach((opt) => {
      // desabilita para não alterar
      opt.disabled = true;

      opt.parentElement.style.backgroundColor = ""; // reset
      if (parseInt(opt.value) === q.correct) {
        opt.parentElement.style.backgroundColor = "#d4edda"; // verde suave
      }
    });

    if (selected && parseInt(selected.value) === q.correct) {
      correctCount++;
    } else if (selected) {
      selected.parentElement.style.backgroundColor = "#f8d7da"; // vermelho suave
    }
  });

  const percent = Math.round((correctCount / QUESTIONS.length) * 100);
  showProgressBar(percent);
}

// Função para criar a barra de progresso de acertos
function showProgressBar(percent) {
  // Remove barra antiga se existir
  const existingBar = document.getElementById("progress-bar");
  if (existingBar) existingBar.remove();

  const container = document.createElement("div");
  container.id = "progress-bar";
  container.style.width = "80%";
  container.style.height = "30px";
  container.style.background = "#e0e0e0";
  container.style.borderRadius = "15px";
  container.style.margin = "20px auto";

  const fill = document.createElement("div");
  fill.style.height = "100%";
  fill.style.width = "0";
  fill.style.background = "#4CAF50";
  fill.style.borderRadius = "15px";
  fill.style.textAlign = "center";
  fill.style.color = "#fff";
  fill.style.fontWeight = "bold";
  fill.textContent = percent + "%";

  container.appendChild(fill);
  document.body.appendChild(container);

  // Animação de preenchimento
  setTimeout(() => {
    fill.style.transition = "width 1s ease-in-out";
    fill.style.width = percent + "%";
  }, 50);
}

// Função de voltar
function goBack() {
  window.history.back();
}

// Eventos
reviewBtn.addEventListener("click", reviewQuiz);

// Inicializa quiz
loadQuiz();
function launchConfetti() {
  const colors = ["#ff0a54","#ff477e","#ff7096","#ff85a1","#fbb1b1","#f9bec7"];
  const numConfetti = 150;

  for (let i = 0; i < numConfetti; i++) {
    const confetto = document.createElement("div");
    confetto.classList.add("confetti");
    confetto.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetto.style.left = Math.random() * 100 + "%";
    confetto.style.animationDuration = (2 + Math.random() * 3) + "s";
    confetto.style.width = confetto.style.height = 8 + Math.random() * 5 + "px";
    document.body.appendChild(confetto);

    // Remove após animação
    confetto.addEventListener("animationend", () => confetto.remove());
  }
}
