
alert("Two players can play this dice game. If one player rolls a 1, he loses his points for the round and it is the other player's turn to roll. You can keep your points after each roll, but then the other player gets to roll. The first player with 60 points or more wins!");

var score, roundScore, activePlayer, currentGame;

function init() {
  score = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  currentGame = true;

  document.querySelector(".dice").style.display = "none";
  document.getElementById("score-0").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

init();

// ROLL BUTTON

document.querySelector(".btn-roll").addEventListener("click", function(){
  if(currentGame) {
    // random number
    var dice = Math.floor(Math.random() * 6) + 1;

    // result
    var diceDOM = document.querySelector(".dice");
    diceDOM.style.display = "block";
    diceDOM.src = "img/dice-" + dice + ".png";

    // update result
    if (dice !== 1) {
      roundScore += dice;
      document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});


// HOLD BUTTON
document.querySelector(".btn-hold").addEventListener("click", function(){
  if (currentGame) {
    score[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent = score[activePlayer];
    if(score[activePlayer] >= 60) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      currentGame = false;
    } else {
      nextPlayer();
    }
  }
});


// New Player
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

// NEW GAME BUTTON
document.querySelector(".btn-new").addEventListener("click", init);