const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [{
        question: 'Какъв цвят боя се произвежда от дървото pau-brasil? ',
        choice1: 'Червена',
        choice2: 'Жълта',
        choice3: 'Розова',
        choice4: 'Кафява',
        answer: 1,
    },
    {
        question: "На кое място се нарежда Бразилия по площ и население в света? ",
        choice1: "4",
        choice2: "7",
        choice3: "6",
        choice4: "5",
        answer: 4,
    },
    {
        question: "Колко тона тежи статуята на Христос Спасител? ",
        choice1: "600",
        choice2: "630",
        choice3: "635г",
        choice4: "700",
        answer: 3,
    },
    {
        question: "Кой е краля на футбола? ",
        choice1: "Роналдо",
        choice2: "Пеле",
        choice3: "Ривалдо",
        choice4: "Гаринча",
        answer: 2,
    },
    {
        question: "Кое е най-шумното животно в тропическите гори? ",
        choice1: "Папагал",
        choice2: "Алиготора",
        choice3: "Мамймуната",
        choice4: "Птицата туткан",
        answer: 4,
    },
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
        if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
            localStorage.setItem('mostRecentScore', score)

            return window.location.assign(url: https: //ninjooo.github.io/end.html )
            }

            questionCounter++
            progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
            progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

            const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
            currentQuestion = availableQuestions[questionsIndex]
            question.innerText = currentQuestion.question

            choices.forEach(choice => {
                const number = choice.dataset['number']
                choice.innerText = currentQuestion['choice' + number]
            })

            availableQuestions.splice(questionsIndex, 1)

            acceptingAnswers = true
        }

        choices.forEach(choice => {
            choice.addEventListener('click', e => {
                if (!acceptingAnswers) return

                acceptingAnswers = false
                const selectedChoice = e.target
                const selectedAnswer = selectedChoice.dataset['number']

                let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

                if (classToApply === 'correct') {
                    incrementScore(SCORE_POINTS)
                }

                selectedChoice.parentElement.classList.add(classToApply)

                setTimeout(() => {
                    selectedChoice.parentElement.classList.remove(classToApply)
                    getNewQuestion()

                }, 1000)
            })
        })

        incrementScore = num => {
            score += num
            scoreText.innerText = score
        }

        startGame()