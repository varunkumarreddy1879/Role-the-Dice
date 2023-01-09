let scores, roundScore, activePlayer, gamePlaying;

init();

// ROLL button
document.querySelector(".btn-roll").addEventListener("click", function() {
  if (gamePlaying) {
    // 1. Random number
    let dice = Math.floor(Math.random() * 6) + 1;

    // 2. Display the result
    let diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "images/dice-" + dice + ".png";

    // 3. Update the round score 
    if (dice == 1 || dice==6) {
      // Add score
      roundScore += dice;
      document.getElementById("current-" + activePlayer).textContent = roundScore;
      if(scores[activePlayer]+roundScore>=100){
        updateScore();
      }
    } else {
      roundScore += dice;
      // Next player
      updateScore();
    }
  }
});

function updateScore(){
  if(scores[activePlayer]+roundScore<100){
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent =scores[activePlayer];
    nextPlayer();
  }
  else if(scores[activePlayer]+roundScore==100){
    scores[activePlayer] += roundScore;
    document.getElementById("name-" + activePlayer).textContent = "Winner!";
    document.querySelector("#score-" + activePlayer).textContent =scores[activePlayer];
    document.querySelector(".dice").style.dispaly = "none";
    document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
    document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
    gamePlaying = false;
  }
  else{
    nextPlayer();
  }
}

function nextPlayer() {
  roundScore = 0;
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);

  document.getElementById("current-0").textContent = 0;
  document.getElementById("current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  // document.querySelector(".dice").style.display = "none";
}

// NEW-GAME button
document.querySelector(".btn-new").addEventListener("click", init);

function init() {
  // Reseting score vars
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector(".dice").style.display = "none";
  // Reseting allscores
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  // Reseting Player Names
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  // Removing classes from panels
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}