$(document).ready(function() {
  // Getting jQuery references to the workoutday body, title, form, and user select
  //let bodyInput = $("#body");
  let addworkoutForm = $('#addworkout');
  let userSelect = $('#user');

  let workoutSelect = $('#workout');
  let durationInput = $('#duration');

  // Adding an event listener for when the form is submitted
  $(document).on('submit', '#addworkout', handleWorkoutFormSubmit);

  // Gets the part of the url that comes after the "?" (which we have if we're updating a workoutday)
  let url = window.location.search;
  let workoutdayId;
  let userId;
  // Sets a flag for whether or not we're updating a workoutday to be false initially
  let updating = false;

  // If we have this section in our url, we pull out the workoutday id from the url
  // In '?workoutday_id=1', workoutdayId is 1
  if (url.indexOf('?workoutday_id=') !== -1) {
    workoutdayId = url.split('=')[1];
    getWorkoutDayData(workoutdayId, 'workoutday');
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our User
  else if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
  }

  // Getting the users, and their workoutdays
  getUsers();

  // A function for handling what happens when the form to create a new workoutday is submitted
  function handleWorkoutFormSubmit(event) {
    event.preventDefault();
    // Wont submit the workoutday if we are missing a body, title, or user
    if (!workoutSelect.val().trim() || !durationInput.val().trim() || !userSelect.val().trim()) {
      console.log('Error with NULL values');
      return;
    }
    //TODO add caloriesout maybe for dummy data
    // Constructing a newWorkoutDay object to hand to the database
    let newWorkoutDay = {
      caloriesin: workoutSelect.val().trim(),
      workout: workoutSelect.find('option:selected').text(),
      duration: durationInput.val().trim(),
      UserId: userSelect.val()
    };

    // If we're updating a workoutday run updateWorkoutDay to update a workoutday
    // Otherwise run submitWorkoutDay to create a whole new workoutday
    if (updating) {
      newWorkoutDay.id = workoutdayId;
      updateWorkoutDay(newWorkoutDay);
    } else {
      submitWorkoutDay(newWorkoutDay);
    }
  }

  // Submits a new workoutday and brings user to workoutday page upon completion
  function submitWorkoutDay(workoutday) {
    $.post('/api/workoutdays', workoutday, function() {
      window.location.href = '/workoutday';
    });
  }

  // Gets workoutday data for the current workoutday if we're editing, or if we're adding to an user's existing workoutdays
  function getWorkoutDayData(id, type) {
    let queryUrl;
    switch (type) {
      case 'workoutday':
        queryUrl = '/api/workoutdays/' + id;
        break;
      case 'user':
        queryUrl = '/api/users/' + id;
        break;
      default:
        return;
    }
    $.get(queryUrl, function(data) {
      if (data) {
        console.log(data.UserId || data.id);
        // If this workoutday exists, prefill our addworkout forms with its data
        workoutSelect.val(data.workout);
        durationInput.val(data.duration);
        userId = data.UserId || data.id;
        // If we have a workoutday with this id, set a flag for us to know to update the workoutday
        // when we hit submit
        updating = true;
      }
    });
  }

  // A function to get Users and then render our list of Users
  function getUsers() {
    $.get('/api/users', renderUserList);
  }
  // Function to either render a list of users, or if there are none, direct the user to the page
  // to create an user first
  function renderUserList(data) {
    if (!data.length) {
      // window.location.href = '/users';
    }
    $('.hidden').removeClass('hidden');
    let rowsToAdd = [];
    for (let i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    userSelect.append(rowsToAdd);
    userSelect.val(userId);
  }

  // Creates the user options in the dropdown
  function createUserRow(user) {
    let listOption = $('<option>');
    listOption.attr('value', user.id);
    listOption.text(user.name);
    return listOption;
  }

  // Update a given workoutday, bring user to the workoutday page when done
  function updateWorkoutDay(workoutday) {
    $.ajax({
      method: 'PUT',
      url: '/api/workoutdays',
      data: workoutday
    }).then(function() {
      window.location.href = '/workoutday';
    });
  }
});
