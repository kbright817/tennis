function play_match(prob) {
  // assume ad scoring just one set
  var score = {
    games_won : 0,
    games_lost : 0,
    points_won : 0,
    points_lost : 0,
  }
  while(1) {
    if (Math.random() < prob) {
      score.points_won++;
      if (6 === score.games_won && 6 === score.games_lost) {
        if (score.points_won >= 7 && score.points_won >= score.points_lost + 2) {
          score.games_won++;
          break;
        }
      } else if (score.points_won >= 4 && score.points_won >= score.points_lost + 2) {
        score.games_won++;
        score.points_won = 0;
        score.points_lost = 0;
        if (score.games_won >= 6 && score.games_won >= score.games_lost + 2) {
          break;
        }
      }
    } else {
      score.points_lost++;
      if (6 === score.games_lost && 6 === score.games_won) {
        if (score.points_lost >= 7 && score.points_lost >= score.points_won + 2) {
          score.games_lost++;
          break;
        }
      } else if (score.points_lost >= 4 && score.points_lost >= score.points_won + 2) {
        score.games_lost++;
        score.points_lost = 0;
        score.points_won = 0;
        if (score.games_lost >= 6 && score.games_lost >= score.games_won + 2) {
          break;
        }
      }
    }
  }
  return score.games_won + '-' + score.games_lost;
}
//console.log(process.argv);
var prob_win_point = 0.7;
if (process.argv[2] && process.argv[2] <= 1.0) prob_win_point = process.argv[2];
var scores = {};
var score = '';
for (i=0;i<100000;i++) {
  score = play_match(prob_win_point);
  if (scores[score]) {
    scores[score]++
  } else {
    scores[score] = 1;
  }
}
console.log(prob_win_point);
var keysSorted = Object.keys(scores).sort(function(a,b){return scores[a]-scores[b]})
for (i=0;i<keysSorted.length;i++) {
  console.log(keysSorted[i],scores[keysSorted[i]])
}
