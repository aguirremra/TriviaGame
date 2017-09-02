var trivia = {
	currentQuestion: 0,
	score: 0,
	correctAnswers: 0,
	incorrectAnswers: 0,
	unanswered: 0,
	questions: [ {
		"question": "Which breed of dog has a water-resistant coat and webbed feet?",
		"choices": ["Newfoundland","German Shepherd","Rhodesian Ridgeback","Standard Poodle"],
		"answer": 0,
		"image": "newfoundland.jpeg"
	}, {
		"question": "What is the first sense a dog develops?",
		"choices": ["Smell","Sight","Touch","Hearing"],
		"answer": 2,
		"image": "touch.jpeg"
	},{
		"question": "Unlike humans who sweat everywhere, dogs only sweat through...",
		"choices": ["Their tear ducts","Their floppy ears","The tummies","The pads of their feet and their noses"],
		"answer": 3,
		"image": "paw-nose.jpeg"
	},{
		"question": "What is the most popular breed of dog in the United States?",
		"choices": ["American Pit Bull","Labrador Retriever","Bulldog","Beagle"],
		"answer": 1,
		"image": "labs.jpeg"
	},{
		"question": "A dog's sense of smell is how many times stronger than humans?",
		"choices": ["500-1000","1000-5000","5000-1000","Over 10000"],
		"answer": 3,
		"image": "10000.jpeg"
	},{
		"question": "What is the only breed of dog that can't bark?",
		"choices": ["Rough Collie","Basenji","Dalmatian","Maltipoo"],
		"answer": 1,
		"image": "basenji.jpeg"
	}]
};

var totalQuestions = trivia.questions.length;
var questionEl = $("#question");
var btn1 = $("#btn1");
var btn2 = $("#btn2");
var btn3 = $("#btn3");
var btn4 = $("#btn4");
var seconds = 30;
var countdown;
var timer;
var answerText = "";

reset();

//reset the game
function reset(){
	$("main").hide();
	$("#btn-start").show();
}

function resetTrivia(){
	trivia.currentQuestion = 0;
	trivia.incorrectAnswers = 0;
	trivia.unanswered = 0;
	trivia.score = 0;
	trivia.correctAnswers = 0;
	seconds = 30;
	answerText = "";
}

//timer delay for displaying next question automatically
function startTimer(){
	timer = setTimeout(nextQuestion, 5000);
}
//starts the 30 second timer
function startCountdown(){
	countdown = setInterval(countDown,1000);
}
function countDown(){
   seconds--;
   if(seconds >= 0){
      $("#time-remaining").html("Time Remaining: " + seconds + " seconds");
   }else{
   		var answ = parseInt(trivia.questions[trivia.currentQuestion].answer);
   		trivia.unanswered++;
   		clear();   		
		answerText = "timeout";
		showAnswer(answerText, answ);
		startTimer(); 		
   }   
}
//clears the countdown timer
function clear() {
    clearTimeout(countdown);
}

function nextQuestion(){
	trivia.currentQuestion++;
	if(trivia.currentQuestion < 6){
		$(".buttons").show();
		$("#answer").hide();	
		loadQuestion(trivia.currentQuestion);
		seconds = 30;
		startCountdown();
	}else{
		$(".buttons").hide();
		$("#question").hide();
		$("#answer").hide();
		$("#gameover").show();
		$("#timer").hide();
		$("#correct-answers").html("Correct Answers: " + trivia.correctAnswers);
		$("#incorrect-answers").html("Incorrect Answers: " + trivia.incorrectAnswers);
		$("#unanswered").html("Unanswered: " + trivia.unanswered);			
	}
}

function getStats(){
	console.log("correct answers: " + trivia.correctAnswers)
}

//start the game, displays the buttons, hides start button
function start(){
	//load the first question to the screen
	loadQuestion(trivia.currentQuestion);
	$("main").show();
	$("#question").show();
	$(".buttons").show();
	$("#timer").show();
	$("#btn-start").hide();
	$("#gameover").hide();
	//begin countdown for the first question
	startCountdown();
	
}
//load the questions into the html
function loadQuestion(questionIndex){
	var q = trivia.questions[questionIndex];	
	questionEl.text((questionIndex + 1) + ". " + q.question);
	btn1.text(q.choices[0]);
	btn2.text(q.choices[1]);
	btn3.text(q.choices[2]);
	btn4.text(q.choices[3]);
}

$("#btn-start").on("click", function(){
	start();
});

$("#btn-restart").on("click", function(){
	resetTrivia();
	start();
});

$(".buttons .button button").on("click", function(){	
	var answer = parseInt(this.value);
	var answerCorrect = trivia.questions[trivia.currentQuestion].answer;
	if(answerCorrect === answer){
		trivia.correctAnswers++;
		answerText = "correct";
	}else{
		answerText = "wrong";
		trivia.incorrectAnswers++;
	}
	clear();
	showAnswer(answerText, answerCorrect);
	startTimer();	
});

function showAnswer(answer, answerCorrect){
	var pic = trivia.questions[trivia.currentQuestion].image;
	var answerCorrectText = trivia.questions[trivia.currentQuestion].choices[answerCorrect];
	$(".buttons").hide();
	$("#answer").show();
	$("#answer-image").attr("src", "assets/images/"+pic);
	if(answerText === "correct"){
		$("#answer-text").html("Correct!");
		$("#answer-desc").html("");
	}else if(answerText === "wrong"){
		$("#answer-text").html("Wrong!");
		$("#answer-desc").html("The correct answer is " + answerCorrectText);
	}else{
		$("#answer-text").html("Time is up");
		$("#answer-desc").html("The correct answer is " + answerCorrectText);
	}
}

