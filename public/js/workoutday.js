$(document).ready(function() {
  /* global moment */

  // workoutdayContainer holds all of our workoutdays
  var workoutdayContainer = $('.workoutday-container');
  var workoutdayCategorySelect = $('#category');
  // Click events for the edit and delete buttons
  $(document).on('click', 'button.delete', handleWorkoutDayDelete);
  $(document).on('click', 'button.edit', handleWorkoutDayEdit);
  // Variable to hold our workoutdays
  var workoutdays;

  // The code below handles the case where we want to get workoutday workoutdays for a specific user
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
    $.get('/api/workoutdays' + userId, function(data) {
      console.log('WorkoutDays', data);
      workoutdays = data;
      if (!workoutdays || !workoutdays.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete workoutdays
  function deleteWorkoutDay(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/workoutdays/' + id
    }).then(function() {
      getWorkoutDays(workoutdayCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed workoutday HTML inside workoutdayContainer
  function initializeRows() {
    workoutdayContainer.empty();
    var workoutdaysToAdd = [];
    for (var i = 0; i < workoutdays.length; i++) {
      workoutdaysToAdd.push(createNewRow(workoutdays[i]));
    }
    workoutdayContainer.append(workoutdaysToAdd);
  }

  // This function constructs a workoutday's HTML
  function createNewRow(workoutday) {
    var formattedDate = new Date(workoutday.createdAt);
    formattedDate = moment(formattedDate).format('MMMM Do YYYY, h:mm:ss a');
    var newWorkoutDayCard = $('<div>');
    newWorkoutDayCard.addClass('card');
    var newWorkoutDayCardHeading = $('<div>');
    newWorkoutDayCardHeading.addClass('card-header');
    var deleteBtn = $('<button>');
    deleteBtn.text('DELETE');
    deleteBtn.addClass('delete btn btn-danger');
    var editBtn = $('<button>');
    editBtn.text('EDIT');
    editBtn.addClass('edit btn btn-info');
    var newWorkoutDayTitle = $('<h2>');
    var newWorkoutDayDate = $('<small>');
    var newWorkoutDayUser = $('<h5>');
    newWorkoutDayUser.text('UserID: ' + workoutday.UserId + ' & Workout: ' + workoutday.workout);
    //console.log('workoutday.User.name: ', workoutday.UserId);

    newWorkoutDayUser.css({
      float: 'right',
      color: 'blue',
      'margin-top': '-10px'
    });
    var newWorkoutDayCardBody = $('<div>');
    newWorkoutDayCardBody.addClass('card-body');
    var newWorkoutDayBody = $('<p>');
    //////newWorkoutDayTitle.text(workoutday.title + ' ');
    newWorkoutDayBody.text(workoutday.body);
    newWorkoutDayDate.text(formattedDate);
    newWorkoutDayTitle.append(newWorkoutDayDate);
    newWorkoutDayCardHeading.append(deleteBtn);
    newWorkoutDayCardHeading.append(editBtn);
    //////newWorkoutDayCardHeading.append(newWorkoutDayTitle);
    newWorkoutDayCardHeading.append(newWorkoutDayUser);
    newWorkoutDayCardBody.append(newWorkoutDayBody);
    newWorkoutDayCard.append(newWorkoutDayCardHeading);
    newWorkoutDayCard.append(newWorkoutDayCardBody);
    newWorkoutDayCard.data('workoutday', workoutday);
    return newWorkoutDayCard;
  }

  // This function figures out which workoutday we want to delete and then calls deleteWorkoutDay
  function handleWorkoutDayDelete() {
    var currentWorkoutDay = $(this)
      .parent()
      .parent()
      .data('workoutday');
    deleteWorkoutDay(currentWorkoutDay.id);
  }

  // This function figures out which workoutday we want to edit and takes it to the appropriate url
  function handleWorkoutDayEdit() {
    var currentWorkoutDay = $(this)
      .parent()
      .parent()
      .data('workoutday');
    window.location.href = '/addworkout?workoutday_id=' + currentWorkoutDay.id;
  }

  // This function displays a message when there are no workoutdays
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = '';
    if (id) {
      partial = ' for User #' + id;
    }
    workoutdayContainer.empty();
    var messageH2 = $('<h2>');
    messageH2.css({ 'text-align': 'center', 'margin-top': '50px' });
    messageH2.html('No workoutdays yet' + partial + ", navigate <a href='/addworkout" + query + "'>here</a> in order to get started.");
    workoutdayContainer.append(messageH2);
  }

  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get('/api/users', renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      window.location.href = '/users';
    }
    $('.hidden').removeClass('hidden');
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log('rowsToAdd: ' + rowsToAdd);
    console.log('userSelect: ' + userSelect);
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    var listOption = $('<option>');
    listOption.attr('value', user.id);
    listOption.text(user.name);
    return listOption;
  }
});
