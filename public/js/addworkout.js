$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and user select
  var bodyInput = $('#body');
  var titleInput = $('#title');
  var addworkoutForm = $('#addworkout');
  var userSelect = $('#user');
  // Adding an event listener for when the form is submitted
  $(addworkoutForm).on('submit', handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var userId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  if (url.indexOf('?post_id=') !== -1) {
    postId = url.split('=')[1];
    getWorkoutDayData(postId, 'post');
  }
  // Otherwise if we have an user_id in our url, preset the user select box to be our User
  else if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
  }

  // Getting the users, and their posts
  getUsers();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or user
    if (!titleInput.val().trim() || !bodyInput.val().trim() || !userSelect.val()) {
      return;
    }
    // Constructing a newWorkoutDay object to hand to the database
    var newWorkoutDay = {
      title: titleInput.val().trim(),
      body: bodyInput.val().trim(),
      UserId: userSelect.val()
    };

    // If we're updating a post run updateWorkoutDay to update a post
    // Otherwise run submitWorkoutDay to create a whole new post
    if (updating) {
      newWorkoutDay.id = postId;
      updateWorkoutDay(newWorkoutDay);
    } else {
      submitWorkoutDay(newWorkoutDay);
    }
  }

  // Submits a new post and brings user to workoutday page upon completion
  function submitWorkoutDay(post) {
    $.post('/api/posts', post, function() {
      window.location.href = '/workoutday';
    });
  }

  // Gets post data for the current post if we're editing, or if we're adding to an user's existing posts
  function getWorkoutDayData(id, type) {
    var queryUrl;
    switch (type) {
      case 'post':
        queryUrl = '/api/posts/' + id;
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
        // If this post exists, prefill our addworkout forms with its data
        titleInput.val(data.title);
        bodyInput.val(data.body);
        userId = data.UserId || data.id;
        // If we have a post with this id, set a flag for us to know to update the post
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
      window.location.href = '/users';
    }
    $('.hidden').removeClass('hidden');
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createUserRow(data[i]));
    }
    userSelect.empty();
    console.log(rowsToAdd);
    console.log(userSelect);
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

  // Update a given post, bring user to the workoutday page when done
  function updateWorkoutDay(post) {
    $.ajax({
      method: 'PUT',
      url: '/api/posts',
      data: post
    }).then(function() {
      window.location.href = '/workoutday';
    });
  }
});
