// Perguntas (10 questões, repetindo algumas)
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
    question: "teste",
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

  quizContainer.addEventListener("change", ()=>{
    const allAnswered = QUESTIONS.every((q,index)=>document.querySelector(`input[name="q${index}"]:checked`));
    reviewBtn.disabled = !allAnswered;
  });
}

// Review respostas
function reviewQuiz() {
  let correctCount = 0;
  QUESTIONS.forEach((q,index)=>{
    const selected = document.querySelector(`input[name="q${index}"]:checked`);
    const options = document.querySelectorAll(`input[name="q${index}"]`);
    const explanationDiv = selected.closest(".question-card").querySelector(".explanation");

    explanationDiv.style.display = "block";

    options.forEach(opt=>{
      opt.disabled = true;
      opt.parentElement.style.backgroundColor = "";
      if(parseInt(opt.value)===q.correct) opt.parentElement.style.backgroundColor="#d4edda";
    });

    if(selected && parseInt(selected.value)===q.correct) correctCount++;
    else if(selected) selected.parentElement.style.backgroundColor="#f8d7da";
  });

  const percent = Math.round((correctCount/QUESTIONS.length)*100);
  showProgressBar(percent);
}

// Barra de progresso e confete
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

  if(percent===100) launchConfetti();
}

// Confete
function launchConfetti(){
  const colors=["#ff0a54","#ff477e","#ff7096","#ff85a1","#fbb1b1","#f9bec7"];
  const num=150;
  for(let i=0;i<num;i++){
    const c=document.createElement("div");
    c.classList.add("confetti");
    c.style.backgroundColor=colors[Math.floor(Math.random()*colors.length)];
    c.style.left=Math.random()*100+"%";
    c.style.animationDuration=(2+Math.random()*3)+"s";
    c.style.width=c.style.height=8+Math.random()*5+"px";
    document.body.appendChild(c);
    c.addEventListener("animationend",()=>c.remove());
  }
}

// Voltar
function goBack(){ window.history.back(); }

// Eventos
reviewBtn.addEventListener("click",reviewQuiz);

// Inicializa
loadQuiz();
