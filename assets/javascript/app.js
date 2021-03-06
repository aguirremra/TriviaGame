var trivia = {
	currentQuestion: 0,
	score: 0,
	correctAnswers: 0,

	questions: [ {
		"question": "Which breed of dog has a water-resistant coat and webbed feet?",
		"choice1": "Newfoundland",
		"choice2": "German Shepherd",
		"choice3": "Rhodesian Ridgeback",
		"choice4": "Standard Poodle",
		"answer": "1",
		"image": "newfoundland.jpeg"
	}, {
		"question": "What is the first sense a dog develops?",
		"choice1": "Smell",
		"choice2": "Sight",
		"choice3": "Touch",
		"choice4": "Hearing",
		"answer": "3",
		"image": "touch.jpeg"
	},{
		"question": "Unlike humans who sweat everywhere, dogs only sweat through...",
		"choice1": "Their tear ducts",
		"choice2": "Their floppy ears",
		"choice3": "The tummies",
		"choice4": "The pads of their feet and their noses",
		"answer": "4",
		"image": "paw-nose.jpeg"
	},{
		"question": "What is the most popular breed of dog in the United States?",
		"choice1": "American Pit Bull",
		"choice2": "Labrador Retriever",
		"choice3": "Bulldog",
		"choice4": "Beagle",
		"answer": "2",
		"image": "labs.jpeg"
	},{
		"question": "A dog's sense of smell is how many times stronger than humans?",
		"choice1": "500-1000",
		"choice2": "1000-5000",
		"choice3": "5000-1000",
		"choice4": "Over 10000",
		"answer": "4",
		"image": "10000.jpeg"
	},{
		"question": "What is the only breed of dog that can't bark?",
		"choice1": "Rough Collie",
		"choice2": "Basenji",
		"choice3": "Dalmatian",
		"choice4": "Maltipoo",
		"answer": "2",
		"image": "basenji.jpeg"
	}]
};

var totalQuestions = trivia.questions.length;
var questionEl = $("#question");
var btn1 = $("#btn1");
var btn2 = $("#btn2");
var btn3 = $("#btn3");
var btn4 = $("#btn4");
var seconds = 10;
var countdown;
var timer;
var answerText = "";

reset();
//load the first question to the screen
loadQuestion(trivia.currentQuestion);

//reset the game
function reset(){
	$("main").hide();
	$("#btn-start").show();
}
//timer delay for displaying next question automatically
function startTimer(){
	timer = setTimeout(nextQuestion, 3000);
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
   		clear();   		
		answerText = "timeout";
		showAnswer(answerText);   		
   }   
   console.log(seconds);
}
//clears the countdown timer
function clear() {
    console.log("stopped")
    clearTimeout(countdown);
}

function nextQuestion(){
	$(".buttons").show();
	$("#answer-text").hide();
	$("#answer-desc").hide();
	$("#answer-image").hide();	
	trivia.currentQuestion++;
	loadQuestion(trivia.currentQuestion);
	seconds = 10;
	startCountdown();
}

//start the game, displays the buttons, hides start button
function start(){
	$("main").show();
	$("#btn-start").hide();
	//begin countdown for the first question
	startCountdown();
	
}
//load the questions into the html
function loadQuestion(questionIndex){
	var q = trivia.questions[questionIndex];	
	questionEl.text((questionIndex + 1) + ". " + q.question);
	btn1.text(q.choice1);
	btn2.text(q.choice2);
	btn3.text(q.choice3);
	btn4.text(q.choice4);
}

$("#btn-start").on("click", function(){
	start();
});

$(".buttons .button button").on("click", function(){	
	var answer = this.value;
	if(trivia.questions[trivia.currentQuestion].answer == answer){
		trivia.correctAnswers++;
		answerText = "correct";
		console.log("Questions right " + trivia.correctAnswers);
		clear();
	}else{
		answerText = "wrong"
	}
	clear();
	showAnswer(answerText);
	startTimer();	
});

function showAnswer(answer){
	var pic = trivia.questions[trivia.currentQuestion].image;
	$(".buttons").hide();
	$("#answer-text").show();
	$("#answer-desc").show();
	$("#answer-image").show();
	$("#answer-image").attr("src", "assets/images/"+pic);
	if(answerText === "correct"){
		$("#answer-text").html("Correct!");
		$("#answer-desc").html("");
	}else if(answerText === "wrong"){
		$("#answer-text").html("Wrong!");
		$("#answer-desc").html("The correct answer is...");
	}else{
		$("#answer-text").html("Time is up");
		$("#answer-desc").html("The correct answer is...");
	}
}
