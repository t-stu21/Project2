document.onReady = function() {
  jQuery(function($) {
    selectActivity = $("#selectActivity");
    var activities = [
      {
        text: "aerobics",
        val: "6"
      },
      {
        text: "backpacking",
        val: "7"
      },
      {
        text: "badminton (singles)",
        val: "4.5"
      },
      {
        text: "baseball",
        val: "5"
      },
      {
        text: "basketball (half-court)",
        val: "6"
      },
      {
        text: "bicycling indoors (stationary bike) ",
        val: "5"
      },
      {
        text: "bicycling stationary 100 w light effort ",
        val: "5.5"
      },
      {
        text: "bicycling stationary 150 w moderate effort ",
        val: "7"
      },
      {
        text: "bicycling outdoors < 10 mph leisure",
        val: "4"
      },
      {
        text: "bicycling outdoors 10 - 11.9 mph leisure light effort",
        val: "6"
      },
      {
        text: "bicycling outdoors 12 - 13.9 mph leisure moderate effort",
        val: "8"
      },
      {
        text: "bicycling outdoors 14 - 15.9 mph fast or visorous effort",
        val: "10"
      },
      {
        text: "calisthenics pushups pullups situps vigorous effort",
        val: "8"
      },
      {
        text: "calisthenics home exercise light or moderate effort",
        val: "4.5"
      },
      {
        text: "conditioning exercise circuit training general",
        val: "8"
      },
      {
        text: "canoeing 2.0 - 3.9 mph light effort",
        val: "3"
      },
      {
        text: "kayaking",
        val: "5"
      },
      {
        text: "dancing ballet",
        val: "6"
      },
      {
        text: "dancing ballroom slow",
        val: "3"
      },
      {
        text: "dancing disco",
        val: "5.5"
      },
      {
        text: "dancing line",
        val: "4.5"
      },
      {
        text: "dancing swing",
        val: "5.5"
      },
      {
        text: "dancing (really kicking up your heels)",
        val: "5.5"
      },
      {
        text: "dusting",
        val: "2.5"
      },
      {
        text: "elliptical machine",
        val: "5.5"
      },
      {
        text: "football",
        val: "8"
      },
      {
        text: "frisbee",
        val: "3"
      },
      {
        text: "gardening",
        val: "5"
      },
      {
        text: "golfing (no carts please) carrying clubs",
        val: "5.5"
      },
      {
        text: "grocery shopping",
        val: "3.5"
      },
      {
        text: "handball",
        val: "12"
      },
      {
        text: "hiking",
        val: "6"
      },
      {
        text: "home repair (building hammering)",
        val: "4.5"
      },
      {
        text: "horseback riding ",
        val: "2.5"
      },
      {
        text: "housecleaning",
        val: "3.5"
      },
      {
        text: "ice hockey",
        val: "8"
      },
      {
        text: "ice skating",
        val: "7"
      },
      {
        text: "ironing",
        val: "2.3"
      },
      {
        text: "jogging",
        val: "7"
      },
      {
        text: "running 5 mph ( 12 min mile)",
        val: "8"
      },
      {
        text: "running 6 mph 10 min mile",
        val: "10"
      },
      {
        text: "running 8 mph 7.5 min mile",
        val: "13.5"
      },
      {
        text: "karate",
        val: "10"
      },
      {
        text: "kickboxing",
        val: "10"
      },
      {
        text: "lacrosse",
        val: "8"
      },
      {
        text: "laundry/folding clothes",
        val: "2"
      },
      {
        text: "making the bed ",
        val: "2"
      },
      {
        text: "mopping/scrubbing floors",
        val: "4.5"
      },
      {
        text: "mowing the lawn (no riding mowers please)",
        val: "4.5"
      },
      {
        text: "painting the house",
        val: "5"
      },
      {
        text: "pilates",
        val: "6"
      },
      {
        text: "ping pong",
        val: "4"
      },
      {
        text: "playing with kids at the playground",
        val: "4"
      },
      {
        text: "playing musical instrument - drums",
        val: "4"
      },
      {
        text: "playing musical instrument - guitar",
        val: "2"
      },
      {
        text: "playing musical instrument - piano",
        val: "2.5"
      },
      {
        text: "cooking",
        val: "2.5"
      },
      {
        text: "racquetball",
        val: "7"
      },
      {
        text: "raking",
        val: "4"
      },
      {
        text: "rearranging furniture",
        val: "6"
      },
      {
        text: "rock climbing (ascending)",
        val: "11"
      },
      {
        text: "rock climbing (repelling)",
        val: "8"
      },
      {
        text: "roller blading/skating",
        val: "7"
      },
      {
        text: "rope jumping",
        val: "8"
      },
      {
        text: "rowing",
        val: "7"
      },
      {
        text: "rugby",
        val: "10"
      },
      {
        text: "shoveling snow",
        val: "6"
      },
      {
        text: "sledding",
        val: "7"
      },
      {
        text: "snow skiing (cross-country)",
        val: "8"
      },
      {
        text: "snow skiing (downhill)",
        val: "6"
      },
      {
        text: "indoor skiing (on a machine)",
        val: "9.5"
      },
      {
        text: "soccer",
        val: "7"
      },
      {
        text: "softball",
        val: "5"
      },
      {
        text: "stacking firewood for winter",
        val: "5"
      },
      {
        text: "stair climbing",
        val: "6"
      },
      {
        text: "surfing",
        val: "3"
      },
      {
        text: "sweeping (inside)",
        val: "2.5"
      },
      {
        text: "swimming",
        val: "6"
      },
      {
        text: "tae kwon do",
        val: "10"
      },
      {
        text: "tai chi",
        val: "4"
      },
      {
        text: "tennis (doubles)",
        val: "6"
      },
      {
        text: "tennis (singles)",
        val: "8"
      },
      {
        text: "vacuuming",
        val: "2.5"
      },
      {
        text: "volleyball (beach)",
        val: "8"
      },
      {
        text: "volleyball (casual game)",
        val: "3"
      },
      {
        text: "walking (briskly)",
        val: "4"
      },
      {
        text: "walking to work or class leisure",
        val: "4"
      },
      {
        text: "walking pushing a stroller",
        val: "2.5"
      },
      {
        text: "walking with the dog",
        val: "3.5"
      },
      {
        text: "washing the car ",
        val: "4.5"
      },
      {
        text: "washing the dishes",
        val: "2.3"
      },
      {
        text: "washing windows",
        val: "4.5"
      },
      {
        text: "water aerobics ",
        val: "4"
      },
      {
        text: "water polo",
        val: "10"
      },
      {
        text: "water skiing",
        val: "6"
      },
      {
        text: "weight lifting",
        val: "3"
      },
      {
        text: "whitewater rafting ",
        val: "5"
      },
      {
        text: "yoga hatha",
        val: "4"
      }
    ];
    for (i = 0; i < activities.length; i++) {
      selectActivity.append(
        $("<option>", {
          value: activities[i].val,
          text: activities[i].text
        })
      );
    }
  });
};

$(document).ready(function() {
  $("#btnCompute").on("click", computeCal);
});

function checkNumber(input, min, max, msg) {
  msg = msg + " Field has invalid data: " + input;
  var str = input;
  for (var i = 0; i < str.length; i++) {
    var ch = str.substring(i, i + 1);
    if ((ch < "0" || ch > "9") && ch != ".") {
      return false;
    }
  }
  var num = 0 + str;
  if (num < min || max < num) {
    return false;
  }
  input = str;
  return true;
}

function computeCal() {
  var minutes = $("#minutes").val();
  var weight = $("#pounds").val();
  if (weight !== 0 && minutes !== 0) {
    if (!checkNumber(minutes, 1, 999, "Minutes")) {
      return;
    }
    if (!checkNumber(weight, 1, 999, "Weight")) {
      return;
    }

    var exercise = $("#selectActivity").val();
    exercise = Math.floor(exercise);
    var Time = Math.floor(minutes);
    var Weight = Math.floor(weight);
    var tmpcalories = exercise.toFixed(2);
    var tmpTotal = Math.abs(tmpcalories * (Weight / 2.2) * (Time / 60));
    var displayTotal = "Calories: " + tmpTotal.toFixed(0);
  } else {
    displayTotal = "weight or minutes need to be set";
  }
  $("#caloriesburned").text(displayTotal);
}
