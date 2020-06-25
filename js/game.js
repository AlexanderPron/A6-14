const numDivs = 36;
const maxHits = 10;
const missRate = 2;
const successRate = 1;
let hits = 0;
let wrongHits = 0;
let firstHitTime = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый  DONE
  $("#button-start").attr("style", "display: none");
  $(".target").removeClass("target");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  // TODO: помечать target текущим номером  DONE
  $(".target").removeClass("miss");
  $(divSelector).text(hits+1);
  // FIXME: тут надо определять при первом клике firstHitTime DONE in $("#button-start").click(function(){})
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала  DONE
  $(".game-field").attr("style", "display: none");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-miss").text(wrongHits);
  $("#total-score").text(successRate*hits - missRate*wrongHits);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text? DONE
  if (($(".game-field").hasClass("target")) || ($(".game-field").hasClass("miss") )){ //Если нет красного или зелёного поля, то игра ещё не началась
    if ($(event.target).hasClass("target")) {
      $(".target").text("");
      hits = hits + 1;
      $(".game-field").removeClass("miss");
      round();
    }
    // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss  DONE
    else {
      $(event.target).addClass("miss");
      wrongHits++;
    }
  }
  else{
    $("#wrong-message").removeClass("wrong-none");
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке DONE
  $("#button-start").click(function() {
      firstHitTime = getTimestamp();
      $("#wrong-message").addClass("wrong-none");
      round();
    });
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
     location.reload();
  });
}

$(document).ready(init);