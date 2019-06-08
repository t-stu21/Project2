
$(document).ready(function() {

  // workoutdayContainer holds all of our workoutdays
  var workoutdayContainer = $('.workout-container');
  var workoutdayCategorySelect = $('#category');

  $(document).on('click', 'button.edit', handleWorkoutDayEdit);
  // Variable to hold our workoutdays
  var workoutdays;

  // The code below handles the case where we want to get workoutdays for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
    getWorkoutDays(userId);
  }
  // If there's no userId we just get all workoutdays as usual
  else {
    getWorkoutDays();
  }

  // This function grabs workoutdays from the database and updates the view
  function getWorkoutDays(user) {
    userId = user || '';
    if (userId) {
      userId = '/?user_id=' + userId;
    }
    $.get('/api/workoutdays' + userId, function (data) {
      console.log('WorkoutDays', data);
      workoutdays = data;
      if (!workoutdays || !workoutdays.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }



  // InitializeRows handles appending all of our constructed workoutday HTML inside workoutdayContainer
  function initializeRows() {
    workoutdayContainer.empty();
    let workoutdaysToAdd = [];
    for (let i = 0; i < workoutdays.length; i++) {
      workoutdaysToAdd.push(createNewRow(workoutdays[i]));
    }
    workoutdayContainer.append(workoutdaysToAdd);
  }

  // This function constructs a workoutday's div
  function createNewRow(workoutday) {
    let newWorkoutDayCard = $('<div>');
    newWorkoutDayCard.css({ 'text-align': 'center' });
    let card = `<div class="card">
    <div class="card-body">
      <h2 class="card-title">Workout Day for User ${workoutday.UserId}</h2>
      <h5 class="card-text">${workoutday.workout}</h5>
      <h5 class="card-text">Time Duration: ${workoutday.duration} Minutes</h5>
      <h5 class="card-text">${workoutday.createdAt.slice(0, -14)}</h5>
      <a href="/addworkout?workoutday_id=${workoutday.id}" class="edit btn btn-info">Edit Workout</a>
    </div>
  </div>`;
    newWorkoutDayCard.html(card);
    return newWorkoutDayCard;
  }

  // This function figures out which workoutday we want to edit and takes it to the appropriate url
  function handleWorkoutDayEdit() {
    let currentWorkoutDay = $(this)
      .parent()
      .parent()
      .data('workoutday');
    window.location.href = '/addworkout?workoutday_id=' + currentWorkoutDay.id;
  }

  // This function displays a message when there are no workoutdays
  function displayEmpty(id) {
    let query = window.location.search;
    let partial = '';
    if (id) {
      partial = ' for User #' + id;
    }
    workoutdayContainer.empty();
    let messageNoWorkouts = $('<div>');
    messageNoWorkouts.css({ 'text-align': 'center' });
    let card = `<div class="card">
    <div class="card-body">
      <h2 class="card-title">No workoutdays yet ${partial}</h2>
      <h5 class="card-text">Follow below in order to get started...</h5>
      <a href="/addworkout${query}" class="btn btn-primary">Add Workout</a>
    </div>
  </div>`;
    messageNoWorkouts.html(card);
    workoutdayContainer.append(messageNoWorkouts);
  }

  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get('/api/users', renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = '/workoutday';
    }
    $('.hidden').removeClass('hidden');
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    // console.log('rowsToAdd: ' + rowsToAdd);
    // console.log('userSelect: ' + userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }
});
