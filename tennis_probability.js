function play_match(prob) {
  // assume ad scoring and 10 pt tie breaker
  var pretty_score = '';
  var score = {
    sets_won : 0,
    sets_lost : 0,
    games_won : [0,0],
    games_lost : [0,0],
    points_won : 0,
    points_lost : 0,
  }
  var set = 0;
  while(score.sets_won < 2 && score.sets_lost < 2) {
    if (Math.random() < prob) {
      score.points_won++;
      if (2 === set) { 
        if (score.points_won >= 10 && score.points_won >= score.points_lost + 2) {
          score.sets_won++;
          //pretty_score = pretty_score + '1-0(' + score.points_lost + ')'
          pretty_score = pretty_score + '1-0'
        }
      } else if (6 === score.games_won[set] && 6 === score.games_lost[set]) {
        if (score.points_won >= 7 && score.points_won >= score.points_lost + 2) {
          //pretty_score = pretty_score + '7-6(' + score.points_lost + '); '
          pretty_score = pretty_score + '7-6; '
          score.sets_won++;
          score.games_won[set++]++;
          score.points_won = 0;
          score.points_lost = 0;
        }
      } else if (score.points_won >= 4 && score.points_won >= score.points_lost + 2) {
        score.games_won[set]++;
        score.points_won = 0;
        score.points_lost = 0;
        if (score.games_won[set] >= 6 && score.games_won[set] >= score.games_lost[set] + 2) {
          pretty_score = pretty_score + score.games_won[set] + '-' + score.games_lost[set] + '; '
          score.sets_won++;
          set++;
        }
      }
    } else {
      score.points_lost++;
      if (2 === set) { 
        if (score.points_lost >= 10 && score.points_lost >= score.points_won + 2) {
          score.sets_lost++;
          //pretty_score = pretty_score + '0-1(' + score.points_won + ')'
          pretty_score = pretty_score + '0-1'
        }
      } else if (6 === score.games_lost[set] && 6 === score.games_won[set]) {
        if (score.points_lost >= 7 && score.points_lost >= score.points_won + 2) {
          //pretty_score = pretty_score + '6-7(' + score.points_won + '); '
          pretty_score = pretty_score + '6-7; '
          score.sets_lost++;
          score.games_lost[set++]++;
          score.points_lost = 0;
          score.points_won = 0;
        }
      } else if (score.points_lost >= 4 && score.points_lost >= score.points_won + 2) {
        score.games_lost[set]++;
        score.points_lost = 0;
        score.points_won = 0;
        if (score.games_lost[set] >= 6 && score.games_lost[set] >= score.games_won[set] + 2) {
          pretty_score = pretty_score + score.games_won[set] + '-' + score.games_lost[set] + '; '
          score.sets_lost++;
          set++;
        }
      }
    }
  }
  return pretty_score;
}
//console.log(process.argv);
var prob_win_point = 0.7;
if (process.argv[2] && process.argv[2] <= 1.0) prob_win_point = process.argv[2];
var scores = {};
var score = '';
for (i=0;i<10000;i++) {
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
