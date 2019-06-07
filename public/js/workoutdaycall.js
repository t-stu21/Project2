$(document).ready(function() {
  // var scheduleTemplate = $("#schedule-template").html();

  // var compileScheduleTemplate = Handlebars.compile(scheduleTemplate);

  // $(".sch").html(compileScheduleTemplate(schedule));

  // console.log(scheduleTemplate);

  var makeCall = function() {
    $.ajax({
      url: "/api/workoutdays",
      type: "GET",

      dataType: "json",
      success: function(data) {
        console.log("Data: " + JSON.stringify(data));
        var dailyCheckins = 0;
        var dayChk = [];
        var totalCalories = 0;
        var currentDate = new Date();
        // note fix jan so it is 1 and not 0
        var currentDateString =
          currentDate.getDate().toString() +
          "-" +
          (currentDate.getMonth() + 1).toString() +
          "-" +
          currentDate.getFullYear().toString();

        for (i = 0; i < data.length; i++) {
          var itemDate = new Date(data[i].updatedAt);
          // note fix jan so it is 1 and not 0
          var itemDateStr =
            itemDate.getDate().toString() +
            "-" +
            (itemDate.getMonth() + 1).toString() +
            "-" +
            itemDate.getFullYear().toString();

          dayChk.push(itemDateStr);

          if (currentDateString == itemDateStr) {
            totalCalories = +data[i].caloriesin;
            console.log(totalCalories);
          }
        }

        dailyCheckins = jQuery.unique(dayChk).length;

        $("#ch1").html(dailyCheckins);

        $("#topL").html(totalCalories);
      },
      error: function(request, error) {
        console.log("Request: " + JSON.stringify(request));
      }
    });
  };
  makeCall();
});
