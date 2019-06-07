var schedule = {
  days: [
    {
      name: 'Monday',
      number: '1',
      status: 'lyve'
    },
    {
      name: 'Tuesday',
      number: '2',
      status: 'Game Day'
    },
    {
      name: 'Wednesday',
      number: '3',
      status: 'Game Day'
    },
    {
      name: 'Thursday',
      number: '4',
      status: 'Game Day'
    },
    {
      name: 'Friday',
      number: '5',
      status: 'Game Day'
    },
    {
      name: 'Saturday',
      number: '6',
      status: 'Game Day'
    },
    {
      name: 'Sunday',
      number: '7',
      status: 'Game Day'
    }
  ]
};

$(document).ready(function() {
  $(document).ready(function() {
    var scheduleTemplate = $('#schedule-template').html();

    var compileScheduleTemplate = Handlebars.compile(scheduleTemplate);

    $('.sch').html(compileScheduleTemplate(schedule));
  });
});
