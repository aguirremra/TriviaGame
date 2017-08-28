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
		"question": "Unlike humans who sweat everywhere, dogs sweat through...",
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
		"question": "What breed of dog that can't bark?",
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
var pic = trivia.questions[trivia.currentQuestion].image;
var seconds = 30;
var timer;

reset();
//load the first question to the screen
loadQuestion(trivia.currentQuestion);
//setTimeout(timeUp, 30000);

//reset the game
function reset(){
	$("main").hide();
}
//start the game
function start(){
	$("main").show();
	$("#btn-start").hide();
	//begin timer for the first question
	timer = setTimeout(countDown,1000);
}

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
		trivia.currentQuestion++;
		loadQuestion(trivia.currentQuestion);		
	}else{
		timeUp();
		clearTimeout(timer);
	}	
});

function timeUp(){
	$(".buttons").hide();
	$("#answer-image").attr("src", "assets/images/"+pic);
	$("#answer-text").html("Sorry, the correct answer is.... ");
}

function countDown(){
   seconds--;
   if(seconds > 0){
      setTimeout(countDown,1000);
   }
   $("#time-remaining").html("Time Remaining: " + seconds + " seconds");
   console.log(seconds);
}
