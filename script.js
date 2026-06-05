// Banco de perguntas do Quiz
const quizData = [
    {
        question: "Qual das seguintes atitudes ajuda diretamente a economizar água em casa?",
        options: [
            "Deixar a torneira aberta enquanto escova os dentes.",
            "Utilizar a água da máquina de lavar para limpar o quintal.",
            "Lavar a calçada com a mangueira todos os dias.",
            "Demorar mais de 20 minutos no banho."
        ],
        correct: 1
    },
    {
        question: "No campo, qual prática ajuda a evitar o desgaste e a erosão do solo?",
        options: [
            "Queimar a vegetação nativa antes de plantar.",
            "Deixar o solo totalmente descoberto na época de chuvas.",
            "A rotação de culturas e o plantio direto na palha.",
            "Usar tratores pesados de forma descontrolada."
        ],
        correct: 2
    },
    {
        question: "O que significa o conceito dos '3 Rs' da sustentabilidade?",
        options: [
            "Recolher, Repensar e Revezar.",
            "Reduzir, Reutilizar e Reciclar.",
            "Reparar, Repopular e Reter.",
            "Raciocinar, Reagir e Recuar."
        ],
        correct: 1
    }
];

// Variáveis de controle de estado
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionIndex = null;

// Elementos mapeados do HTML
const quizBox = document.getElementById('quiz-box');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressText = document.getElementById('progress-text');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const scoreText = document.getElementById('score-text');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');

// Inicializa o Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add('hide');
    quizBox.classList.remove('hide');
    showQuestion();
}

// Mostra a pergunta atual na tela
function showQuestion() {
    resetState();
    const currentQuestion = quizData[currentQuestionIndex];
    
    // Atualiza o texto da pergunta e o progresso
    questionText.innerText = currentQuestion.question;
    progressText.innerText = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;

    // Cria visualmente as opções da pergunta
    currentQuestion.options.forEach((option, index) => {
        const li = document.createElement('li');
        li.innerText = option;
        li.classList.add('option-item');
        li.addEventListener('click', () => selectOption(li, index));
        optionsContainer.appendChild(li);
    });
}

// Reseta o estado do botão e limpa as alternativas da tela anterior
function resetState() {
    selectedOptionIndex = null;
    nextBtn.disabled = true;
    optionsContainer.innerHTML = '';
    if(currentQuestionIndex === quizData.length - 1) {
        nextBtn.innerText = "Finalizar";
    } else {
        nextBtn.innerText = "Avançar";
    }
}

// Gerencia a seleção da alternativa feita pelo usuário
function selectOption(element, index) {
    // Remove a marcação de todas as outras alternativas
    const items = optionsContainer.querySelectorAll('.option-item');
    items.forEach(item => item.classList.remove('selected'));

    // Adiciona o destaque na opção clicada
    element.classList.add('selected');
    selectedOptionIndex = index;
    nextBtn.disabled = false; // Ativa o botão de avançar/finalizar
}

// Passa para a próxima pergunta ou calcula o resultado final
function handleNextButton() {
    // Valida se acertou
    if (selectedOptionIndex === quizData[currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

// Exibe a tela final com a pontuação e mensagem personalizada
function showResult() {
    quizBox.classList.add('hide');
    resultBox.classList.remove('hide');
    
    scoreText.innerText = `Você acertou ${score} de ${quizData.length} perguntas.`;
    
    // Feedback baseado nos acertos
    if (score === quizData.length) {
        feedbackText.innerText = "Parabéns! Você é um verdadeiro guardião da natureza! 🌟🌱";
        feedbackText.style.color = "#2e7d32";
    } else if (score >= 1) {
        feedbackText.innerText = "Bom trabalho! Continue estudando e praticando atitudes verdes no seu dia a dia! 🌾";
        feedbackText.style.color = "#f57c00";
    } else {
        feedbackText.innerText = "Não desanime! Revise as informações acima e tente novamente para melhorar sua pontuação! 🌍";
        feedbackText.style.color = "#d32f2f";
    }
}

// Registra os eventos de clique nos botões principais
nextBtn.addEventListener('click', handleNextButton);
restartBtn.addEventListener('click', startQuiz);

// Executa o quiz assim que o script terminar de carregar
startQuiz();
