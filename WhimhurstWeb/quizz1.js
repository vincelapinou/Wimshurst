const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const nextButton = document.getElementById('next');
const page6 = document.getElementById('page6');
const fleche6 = document.getElementById('fleche6');
const body = document.getElementsByTagName('body');


const myQuestions = [
  {
    question: "Quel type de phénomène la machine de Wimshurst illustre-t-elle ?",
    answers: {
            
      a: "Un phénomène mécanique (mouvement)",
      b: "Un phénomène thermique (chaleur) ",
      c: "Un phénomène électrostatique (accumulation de charges électriques)",
    },
    correctAnswer: "c"
  }
  ]


function buildQuiz(){
  // we'll need a place to store the HTML output
  const output = [];

  // for each question...
  myQuestions.forEach(
    (currentQuestion, questionNumber) => {

      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for(letter in currentQuestion.answers){

        // ...add an HTML radio button
        answers.push(
          `<label>
		   </br>
            <input type="radio" name="question${questionNumber}" value="${letter}">
            ${letter} :
            ${currentQuestion.answers[letter]}
          </label>`
        );
      }

      // add this question and its answers to the output
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
        <div class="answers"> ${answers.join('')} </div>`
      );
    }
  );

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join('');
}

function showResults(){

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll('.answers');

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...
  myQuestions.forEach( (currentQuestion, questionNumber) => {

    // find selected answer
    const answerContainer = answerContainers[questionNumber];
    const selector = 'input[name=question'+questionNumber+']:checked';
    const userAnswer = (answerContainer.querySelector(selector) || {}).value;

    // if answer is correct
    if(userAnswer===currentQuestion.correctAnswer){
      // add to the number of correct answers
      numCorrect++;

      // color the answers green
      answerContainers[questionNumber].style.color = '#009100';
	  
    }
    // if answer is wrong or blank
    else{
      // color the answers red
      answerContainers[questionNumber].style.color = '#D40000';
    }
  });

  // show number of correct answers out of total
  
  submitButton.style.visibility='hidden';
  nextButton.style.visibility='visible';
  page6.style.visibility='visible';
  fleche6.style.visibility='visible';

}


buildQuiz();
submitButton.addEventListener('click', showResults);