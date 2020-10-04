/**
 * File: quiz.js:
 * Desc: client-side rendering to a mount-point
 */

// IIFE container for code : avoiding the global namespace

(function () {
  'use strict';

  // 1- Rep the Data - if this were React would be local component state - here: pretty clever json
  // TODO: move this to external mock-data file for easier switchout for quiz #2
  const quizQuestions = [
    {
      question: 'Who is the strongest?',
      answers: {
        a: 'Superman',
        b: 'The Terminator',
        c: 'Waluigi, obviously',
      },
      correctAnswer: 'c',
    },
    {
      question: 'What is the best site ever?',
      answers: {
        a: 'Sitepoint',
        b: 'Simple steps code',
        c: 'Trick question: all the best',
      },
      correctAnswer: 'c',
    },
    {
      question: 'Where is Waldo really',
      answers: {
        a: 'Antarctica',
        b: 'Exploring the Pacific',
        c: 'Sitting in a tree',
        d: 'Minding his own business, so stap asking',
      },
      correctAnswer: 'd',
    },
    {
      question: 'Whose stage introduction starts with You Wanted the Best',
      answers: {
        a: 'Who',
        b: 'KISS',
        c: 'Incubus',
        d: 'Tool',
      },
      correctAnswer: 'b',
    },
  ];

  // 2- build the Quiz
  function buildQuiz() {
    const output = [];

    // loop over your local data
    quizQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];
      // loop over the answers sub-object via for in and output dynamic markup
      for (var letter in currentQuestion.answers) {
        answers.push(
          `<label class="answer">
							<input type="radio" id="question${questionNumber}" name="question${questionNumber}" value="${letter}">
							${letter}:
							${currentQuestion.answers[letter]}
 						</label>`
        );
      }
      // add question and answers to the output array (mutates it though)
      output.push(
        `<section class="slide">
 					   <div class="question">${currentQuestion.question}</div>
 					   <div class="answers">${answers.join('')}</div>
 					 </section>`
      );
    }); // end .forEach() on quizQuestions

    // render the quiz array as a joined string of markup, using DOM innerHTML property
    quizRoot.innerHTML = output.join('');
  }

  // 3- show the Results
  function showResults() {
    // a- get a nodelist of answers
    const answerNodes = quizRoot.querySelectorAll('.answers');
    let numCorrect = 0;

    // b- find selected answer for each question
    // (uses a dom selector on the input with :checked)
    answerNodes.forEach((currentQuestion, questionNumber) => {
      const answerNode = answerNodes[questionNumber];
      const radioSelector =
        'input[name=question' + questionNumber + ']:checked';
      const userAnswer = (answerNode.querySelector(radioSelector) || {}).value;

      // c- evaluate for correct answer and style accordingly
      if (userAnswer === quizQuestions[questionNumber].correctAnswer) {
        numCorrect++;
        answerNodes[questionNumber].classList.add('answer__correct');
      } else {
        answerNodes[questionNumber].classList.add('answer__incorrect');
      }
    });
    // 5- render the num of correct answers of the total
    resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length} correct!`;

    // 6- TODO: show all slides when showing results
  }

  // Show Slide Logic (Pages of the Quiz)
  function showSlide(n) {
    // 1- hide current slide
    slides[currentSlide].classList.remove('slide__active');
    // 2- show slide for whatever n got passed in
    slides[n].classList.add('slide__active');
    // reset current slide
    currentSlide = n;

    // first slide ui - conditionals for the buttons
    currentSlide === 0
      ? (previousButton.style.display = 'none')
      : (previousButton.style.display = 'inline-block');

    // last slide ui - conditionals for the buttons
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    } else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPrevSlide() {
    showSlide(currentSlide - 1);
  }

  // Set some DOM constants (from server-side rendering)
  const quizRoot = document.querySelector('#quizRoot');
  const resultsContainer = document.querySelector('#results');
  const submitButton = document.querySelector('#submitButton');

  // display quiz - moving away from DOMContentLoaded event listener as WE are building the DOM
  buildQuiz();

  // pagination vars
  const previousButton = document.querySelector('#previousButton');
  const nextButton = document.querySelector('#nextButton');
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  // show initial slide
  showSlide(0);

  // Event Handlers
  submitButton.addEventListener('click', showResults);
  nextButton.addEventListener('click', showNextSlide);
  previousButton.addEventListener('click', showPrevSlide);

  // TODO: remove event listeners to avoid JS memory leak
})();
