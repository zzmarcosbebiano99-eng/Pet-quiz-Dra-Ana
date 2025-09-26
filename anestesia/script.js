// Perguntas (10 questões, repetindo para exemplo)
const QUESTIONS = [
  {
    question: "What is the most common anesthetic used in cats?",
    choices: ["Isoflurane", "Propofol", "Ketamine", "Sevoflurane"],
    correct: 2,
    explanation: "Ketamine is commonly used in cats for induction of anesthesia."
  },
  {
    question: "Which vital sign must be monitored continuously during anesthesia?",
    choices: ["Heart rate", "Fur color", "Tail movement", "Sleepiness"],
    correct: 0,
    explanation: "Heart rate is a critical vital sign to monitor during anesthesia."
  },
  {
    question: "Which drug is commonly used for analgesia in dogs post-surgery?",
    choices: ["Aspirin", "Morphine", "Ibuprofen", "Paracetamol"],
    correct: 1,
    explanation: "Morphine is widely used for post-operative pain relief in dogs."
  },
  {
    question: "What is the most common anesthetic used in cats?",
    choices: ["Isoflurane", "Propofol", "Ketamine", "Sevoflurane"],
    correct: 2,
    explanation: "Ketamine is commonly used in cats for induction of anesthesia."
  },
  {
    question: "Which vital sign must be monitored continuously during anesthesia?",
    choices: ["Heart rate", "Fur color", "Tail movement", "Sleepiness"],
    correct: 0,
    explanation: "Heart rate is a critical vital sign to monitor during anesthesia."
  },
  {
    question: "Which drug is commonly used for analgesia in dogs post-surgery?",
    choices: ["Aspirin", "Morphine", "Ibuprofen", "Paracetamol"],
    correct: 1,
    explanation: "Morphine is widely used for post-operative pain relief in dogs."
  },
  {
    question: "What is the most common anesthetic used in cats?",
    choices: ["Isoflurane", "Propofol", "Ketamine", "Sevoflurane"],
    correct: 2,
    explanation: "Ketamine is commonly used in cats for induction of anesthesia."
  },
  {
    question: "Which vital sign must be monitored continuously during anesthesia?",
    choices: ["Heart rate", "Fur color", "Tail movement", "Sleepiness"],
    correct: 0,
    explanation: "Heart rate is a critical vital sign to monitor during anesthesia."
  },
  {
    question: "Which drug is commonly used for analgesia in dogs post-surgery?",
    choices: ["Aspirin", "Morphine", "Ibuprofen", "Paracetamol"],
    correct: 1,
    explanation: "Morphine is widely used for post-operative pain relief in dogs."
  },
  {
    question: "What is the most common anesthetic used in cats?",
    choices: ["Isoflurane", "Propofol", "Ketamine", "Sevoflurane"],
    correct: 2,
    explanation: "Ketamine is commonly used in cats for induction of anesthesia."
  }
];

const quizContainer = document.getElementById("quiz-container");
const reviewBtn = document.getElementById("review-btn");

// Criar quiz
function loadQuiz() {
  QUESTIONS.forEach((q,index)=>{
    const card = document.createElement("div");
    card.classList.add("question-card");

    const questionText = document.createElement("p");
    questionText.textContent = `${index+1}. ${q.question}`;
    card.appendChild(questionText);

    const optionsDiv = document.createElement("div");
    optionsDiv.classList.add("options");

    q.choices.forEach((choice,i)=>{
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
    explanation.textContent = q.explanation;
    card.appendChild(explanation);

    quizContainer.appendChild(card);
  });

  // Habilitar Review quando todas respondidas
  quizContainer.addEventListener("change", ()=>{
    const allAnswered = QUESTIONS.every((q,index)=>document.querySelector(`input[name="q${index}"]:checked`));
    reviewBtn.disabled = !allAnswered;
  });
}

// Review respostas
function reviewQuiz() {
  const unanswered = [];

  QUESTIONS.forEach((q,index)=>{
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const card = document.querySelectorAll(".question-card")[index];

    // Limpa destaque anterior
    card.classList.remove("unanswered");

    if(!selected){
      unanswered.push(index + 1);
      card.classList.add("unanswered"); // adiciona borda vermelha
      card.scrollIntoView({behavior:"smooth", block:"center"});
    }
  });

  if(unanswered.length > 0){
    alert(`As seguintes questões não foram respondidas: ${unanswered.join(", ")}`);
    return; // interrompe revisão
  }

  // Revisão normal
  let correctCount = 0;
  QUESTIONS.forEach((q,index)=>{
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const options = document.querySelectorAll(`input[name="q${index}"]`);

    const explanationDiv = selected.closest(".question-card").querySelector(".explanation");
    explanationDiv.style.display = "block";

    options.forEach(opt=>{
      opt.disabled = true;
      const label = opt.parentElement;
      label.classList.remove("correct","incorrect");

      if(parseInt(opt.value)===q.correct) label.classList.add("correct");
      else if(opt.checked) label.classList.add("incorrect");
    });

    if(selected && parseInt(selected.value)===q.correct) correctCount++;
  });

  const percent = Math.round((correctCount/QUESTIONS.length)*100);
  showProgressBar(percent);
}

// Barra de progresso
function showProgressBar(percent){
  const existing = document.getElementById("progress-bar");
  if(existing) existing.remove();

  const container = document.createElement("div");
  container.id="progress-bar";

  const fill = document.createElement("div");
  fill.style.width="0";
  fill.textContent = percent+"%";
  container.appendChild(fill);
  document.body.appendChild(container);

  setTimeout(()=>{ fill.style.transition="width 1s ease-in-out"; fill.style.width=percent+"%"; },50);
}

// Voltar
function goBack(){ window.history.back(); }

// Eventos
reviewBtn.addEventListener("click",reviewQuiz);

// Inicializa
loadQuiz();
