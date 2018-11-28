/*
 * quiz.js: client-side rendering for simple js quiz
 */
(function(){ // all code inside an iife to not pollute the global namespace at all

	'use strict';

	// Data - can I put this down here last ?
 	const quizQuestions = [
 		{
 			question: 'Who is the strongest?',
 			answers: {
 				a: 'Superman',
 				b: 'The Terminator',
 				c: 'Waluigi, obviously'
 			},
 			correctAnswer: 'c'
 		},
		{
 			question: 'What is the best site ever?',
 			answers: {
 				a: 'Sitepoint',
 				b: 'Simple steps code',
 				c: 'Trick question: all the best'
 			},
 			correctAnswer: 'c'
 		},{
 			question: 'Where is Waldo really',
 			answers: {
 				a: 'Antarctica',
 				b: 'Exploring the Pacific',
 				c: 'Sitting in a tree',
 				d: 'Minding his own business, so stap asking'
 			},
 			correctAnswer: 'd'
 		},{
 			question: 'Whose stage introduction starts with You Wanted the Best',
 				answers: {
 				a: 'Who',
 				b: 'KISS',
 				c: 'Incubus',
 				d: 'Tool'
 				},
 			correctAnswer: 'b'
 		}
 	];

	/*
	 * build the Quiz
	 */
 	function buildQuiz(){

 		const output = [];

 		// loop over your local data
 		quizQuestions.forEach(
 			(currentQuestion, questionNumber) => {
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
 				// add question and answers to the output array
 				output.push(
 					`<section class="slide">
 					   <div class="question">${currentQuestion.question}</div>
 					   <div class="answers">${answers.join('')}</div>
 					 </section>`
 				);
 			}
 		); // end .forEach() on quizQuestions

 		// render the quiz array as a joined string of markup
 		quizRoot.innerHTML = output.join('');
 	};

	/*
	 * show the Results
	 */
 	function showResults(){
 		// 1- dom select all answer nodes from our quiz -- you know have nodelist
 		const answerNodes = quizRoot.querySelectorAll('.answers');

 		// 2- keep track of user correct answers with a simple counter var
 		let numCorrect = 0;

 		// 3- .forEach question, find the selected answer   (uses a selector on the input with :checked)
 		answerNodes.forEach(
 			(currentQuestion, questionNumber) => {
 				const answerNode = answerNodes[questionNumber];
 				const radioSelector = 'input[name=question'+questionNumber+']:checked';
 				const userAnswer = (answerNode.querySelector(radioSelector) || {}).value;

 			 	// 4- for each answer - the elem in the forEach, evaluate if it is correct answer
 			 	// 4a - if correct, ++ the correct answer counter and color the text green;
 			 	if (userAnswer === quizQuestions[questionNumber].correctAnswer){
 			 		numCorrect++;
 			 		answerNodes[questionNumber].classList.add('answer__correct');
				} else {
 			 		answerNodes[questionNumber].classList.add('answer__incorrect');
 			 	};
 			});
 			 	// 5- render the num of correct answers of the total (uses value of counter, questions.length
 			 	resultsContainer.innerHTML = `${numCorrect} out of ${quizQuestions.length} correct!`;
 	}

 	/*
	 * Show Slide Logic
	 */
 	function showSlide(n) {
 		// 1- hide current slide
  		slides[currentSlide].classList.remove('slide__active');
  		// 2- show slide for whatever n got passed in
		slides[n].classList.add('slide__active');
		// now reset current slide
		currentSlide = n;

 		// first slide ui - conditionals for the buttons
  		if (currentSlide === 0) {
    		previousButton.style.display = 'none';
  		} else {
    		previousButton.style.display = 'inline-block';
  		}

  		// last slide ui - conditionals for the buttons
  		if (currentSlide === slides.length - 1) {
    		nextButton.style.display = 'none';
    		submitButton.style.display = 'inline-block';
  		} else {
    		nextButton.style.display = 'inline-block';
    		submitButton.style.display = 'none';
  		}
	}

	function showNextSlide(){
		showSlide(currentSlide + 1);
	}

	function showPrevSlide(){
		showSlide(currentSlide - 1);
	}

		// Set some DOM constants (from server-side rendering)
	const quizRoot = document.querySelector('#quizRoot');
	const resultsContainer = document.querySelector('#results');
	const submitButton = document.querySelector('#submitButton');

	// display quiz right away - moving away from DOMContentLoaded event listeners as WE are building the DOM
  	buildQuiz();

	// pagination vars
	const previousButton = document.querySelector("#previousButton");
	const nextButton = document.querySelector("#nextButton");
	const slides = document.querySelectorAll(".slide");
	let currentSlide = 0;

	// show initial slide
	showSlide(0);

 	// Event Handlers
 	//document.addEventListener('DOMContentLoaded', buildQuiz);
 	submitButton.addEventListener('click', showResults);
 	nextButton.addEventListener('click', showNextSlide);
 	previousButton.addEventListener('click', showPrevSlide);

 })();
