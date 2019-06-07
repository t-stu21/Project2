var results = [
  {
    number: "1000",

    goals: "10000"
  }
];

$(document).ready(function() {
  var scheduleTemplate = $("#schedule-template").html();

  var compileScheduleTemplate = Handlebars.compile(scheduleTemplate);

  $(".sch").html(compileScheduleTemplate(schedule));

  console.log(scheduleTemplate);
});
