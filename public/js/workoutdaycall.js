$(document).ready(function() {
  // var scheduleTemplate = $("#schedule-template").html();

  // var compileScheduleTemplate = Handlebars.compile(scheduleTemplate);

  // $(".sch").html(compileScheduleTemplate(schedule));

  // console.log(scheduleTemplate);

  function arg_calCalc(calcGender, calcWeight, calcHeight, calcAge) {
    if (calcGender === 'Male') {
      return (66 + (6.2 * calcWeight + 12.7 * calcHeight - 6.76 * calcAge) * 1.55 - 700).toFixed(0);
    } else if (calcGender === 'Female') {
      return (655 + (4.35 * calcWeight + 4.7 * calcHeight - 4.7 * calcAge) * 1.55 - 500).toFixed(0);
    }
  }

  // var makeCall = function() {
  //   $.ajax({
  //     url: '/api/workoutdays',
  //     type: 'GET',

  //     dataType: 'json',
  //     success: function(data) {
  //       console.log('Data: ' + JSON.stringify(data));
  //       var dailyCheckins = 0;
  //       var dayChk = [];
  //       var totalCalories = 0;
  //       var currentDate = new Date();
  //       // note fix jan so it is 1 and not 0
  //       var currentDateString = currentDate.getDate().toString() + '-' + (currentDate.getMonth() + 1).toString() + '-' + currentDate.getFullYear().toString();

  //       for (i = 0; i < data.length; i++) {
  //         var itemDate = new Date(data[i].updatedAt);
  //         // note fix jan so it is 1 and not 0
  //         var itemDateStr = itemDate.getDate().toString() + '-' + (itemDate.getMonth() + 1).toString() + '-' + itemDate.getFullYear().toString();

  //         dayChk.push(itemDateStr);

  //         if (currentDateString == itemDateStr) {
  //           totalCalories = totalCalories + data[i].caloriesin;
  //           console.log(totalCalories);
  //         }
  //       }

  //       dailyCheckins = jQuery.unique(dayChk).length;

  //       $('#ch1').html(dailyCheckins);

  //       $('#topL').html(totalCalories);
  //     },
  //     error: function(request, error) {
  //       console.log('Request: ' + JSON.stringify(request));
  //     }
  //   });

  // $.ajax({
  //   url: '/api/users',
  //   type: 'GET',

  //   dataType: 'json',
  //   success: function(data) {
  //     console.log('Data: ' + JSON.stringify(data));
  //     user = data[0];
  //     console.log('user: ', user);
  //     $('#topR').html(user.daily_cals);
  //     console.log(user);
  //   },
  //   error: function(request, error) {
  //     console.log('Request: ' + JSON.stringify(request));
  //   }
  // });
  //};

  let grabID = () => {
    let userID = 0;
    let url = window.location.search;
    if (url.indexOf('?user_id=') !== -1) {
      let uid = url.split('=')[1];
      userID = parseInt(uid);
    }
    return userID;
  };

  let findUser = () => {
    $.get('/api/users', function(data) {
      try {
        let u;
        for (var i = 0; i < data.length; i++) {
          // console.log('i have it: ', data[i].id === grabID());
          if (data[i].id === grabID()) {
            u = data[i];
          }
        }
        //console.log('u: ', u);
        let calIn = u.WorkoutDays[0].caloriesin;
        let daily = u.WorkoutDays.length;

        $('#ch1').html(daily);
        $('#topL').html(calIn);
        $('#topR').html(u.daily_cals);
      } catch {
        console.log('Undefined User');
      }
      //return u;
    });
  };
  findUser();
  //makeCall();
});
