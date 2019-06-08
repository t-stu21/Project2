$(document).ready(function() {
  var workoutContainer = $('.workout-container');
  var intensityLevel = $('level');

  $(document).on('click', 'button-delete', handleWorkoutDelete);

  var workouts;

  var url = window.location.search;
  var idHolder;
  var userID;

  if (url.indexOf('?userID=') !== -1) {
    idHolder = url.split('=')[1];
    getWorkouts(userID);
  } else {
    getWorkouts();
  }

  function getWorkouts(user) {
    userID = user || '';
    if (userID) {
      userID = '/?user_id=' + userID;
    }
    $.get('/api/workouts' + userID, function(data) {
      console.log('Workouts', data);
      workouts = data;
      if (!workouts || !workouts.lenght) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  function deleteWorkout(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/workouts/' + id
    }).then(function() {
      getWorkouts(intensityLevel.val());
    });
  }

  function initializeRows() {
    workoutContainer.empty();
    var workoutAdds = [];
    for (var i = 0; i < workouts.length; i++) {
      workoutAdds.push(createNewRow(workouts[i]));
    }
    workoutContainer.append(workoutAdds);
  }

  function createNewRow(workout) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format('MMMM Do YYYY, h:mm:ss a');
    var newWorkoutCard = $('<div>');
    newWorkoutCard.addClass('card');
    var newWorkoutCardHeading = $('<div>');
    newWorkoutCardHeading.addClass('card-header');
    var deleteBtn = $('<button>');
    deleteBtn.text('x');
    deleteBtn.addClass('delete btn btn-danger');
    // var editBtn = $("<button>");
    // editBtn.text("EDIT");
    // editBtn.addClass("edit btn btn-info");
    var newWorkoutTitle = $('<h2>');
    var newWorkoutDate = $('<small>');
    var newWorkoutUser = $('<h5>');
    newWorkoutUser.text('Written by: ' + workout.User.name);
    newWorkoutUser.css({
      float: 'right',
      color: 'blue',
      'margin-top': '-10px'
    });
    var newPostCardBody = $('<div>');
    newPostCardBody.addClass('card-body');
    var newPostBody = $('<p>');
    newWorkoutTitle.text(post.title + ' ');
    newPostBody.text(post.body);
    newWorkoutDate.text(formattedDate);
    newWorkoutTitle.append(newWorkoutDate);
    newWorkoutCardHeading.append(deleteBtn);
    // newWorkoutCardHeading.append(editBtn);
    newWorkoutCardHeading.append(newWorkoutTitle);
    newWorkoutCardHeading.append(newWorkoutUser);
    newPostCardBody.append(newPostBody);
    newWorkoutCard.append(newWorkoutCardHeading);
    newWorkoutCard.append(newPostCardBody);
    newWorkoutCard.data('post', post);
    return newWorkoutCard;
  }

  function handleWorkoutDelete() {
    var currentWorkout = $(this)
      .parent()
      .parent()
      .data('workout');
    deleteWorkout(currentWorkout.id);
  }

  function displayEmpty(id) {
    var query = window.location.search;
    var partial = '';
    if (id) {
      partial = ' for User #' + id;
    }
    workoutContainer.empty();
    var messageH2 = $('<h2>');
    messageH2.css({ 'text-align': 'center', 'margin-top': '50px' });
    messageH2.html("You have no workouts logged yet for today.  Select 'add workout' to get started!");
    workoutContainer.append(messageH2);
  }

  // let workoutInfo = ['workout', 'caloriesout'];

  // var html = "<table border='1|1'>";
  // for (var i = 0; i < rows.length; i++) {
  //   html += "<tr>";
  //   html += "<td>" + rows[i].name + "</td>";
  //   html += "<td>" + rows[i].age + "</td>";
  //   html += "<td>" + rows[i].email + "</td>";

  //   html += "</tr>";

  // }
  // html += "</table>";
  // $("div").html(html);
});
