var schedule = {
    "days": [
        {
            "name": "Monday",
            "number": "1",
            "status": "lyve"
        },
        {
            "name": "Tuesday",
            "number": "2",
            "status": "Game Day"
        },
        {
            "name": "Wednesday",
            "number": "3",
            "status": "Game Day"
        },
        {
            "name": "Thursday",
            "number": "4",
            "status": "Game Day"
        },
        {
            "name": "Friday",
            "number": "5",
            "status": "Game Day"
        },
        {
            "name": "Saturday",
            "number": "6",
            "status": "Game Day"
        },
        {
            "name": "Sunday",
            "number": "7",
            "status": "Game Day"
        }
    ]
};

$(document).ready(function () {

    var scheduleTemplate = $("#schedule-template").html();
    console.log(scheduleTemplate)
    var compileScheduleTemplate = Handlebars.compile(scheduleTemplate);

    $('.attendance').html(compileScheduleTemplate(schedule));


});

var calorieShit = {
    "id": 2,
    "name": "Trev",
    "email": "trev@gmail.com",
    "password": "$2a$10$NU4o2/d.IgvolMH0gfyWaec3xL9xVnP9Wd0ugLFbz9fXFGASrjd52",
    "last_login": null,
    "status": "active",
    "age": 26,
    "gender": "Male",
    "weight": 180,
    "height": 77,
    "goal_weight": 190,
    "daily_cals": "2339",
    "createdAt": "2019-06-06T04:33:22.000Z",
    "updatedAt": "2019-06-06T04:33:22.000Z"
}

$(document).ready(function () {

    var userStuff = $("#goals").html();
    console.log(userStuff)
    var compileUserStuff = Handlebars.compile(userStuff);

    $('.result').html(compileUserStuff(caloriesShit));


});