$(document).ready(function() {
  /* global moment */

  // workoutdayContainer holds all of our posts
  var workoutdayContainer = $('.workoutday-container');
  var postCategorySelect = $('#category');
  // Click events for the edit and delete buttons
  $(document).on('click', 'button.delete', handleWorkoutDayDelete);
  $(document).on('click', 'button.edit', handleWorkoutDayEdit);
  // Variable to hold our posts
  var posts;

  // The code below handles the case where we want to get workoutday posts for a specific user
  // Looks for a query param in the url for user_id
  var url = window.location.search;
  var userId;
  if (url.indexOf('?user_id=') !== -1) {
    userId = url.split('=')[1];
    getWorkoutDays(userId);
  }
  // If there's no userId we just get all posts as usual
  else {
    getWorkoutDays();
  }

  // This function grabs posts from the database and updates the view
  function getWorkoutDays(user) {
    userId = user || '';
    if (userId) {
      userId = '/?user_id=' + userId;
    }
    $.get('/api/posts' + userId, function(data) {
      console.log('WorkoutDays', data);
      posts = data;
      if (!posts || !posts.length) {
        displayEmpty(user);
      } else {
        initializeRows();
      }
    });
  }

  // This function does an API call to delete posts
  function deleteWorkoutDay(id) {
    $.ajax({
      method: 'DELETE',
      url: '/api/posts/' + id
    }).then(function() {
      getWorkoutDays(postCategorySelect.val());
    });
  }

  // InitializeRows handles appending all of our constructed post HTML inside workoutdayContainer
  function initializeRows() {
    workoutdayContainer.empty();
    var postsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      postsToAdd.push(createNewRow(posts[i]));
    }
    workoutdayContainer.append(postsToAdd);
  }

  // This function constructs a post's HTML
  function createNewRow(post) {
    var formattedDate = new Date(post.createdAt);
    formattedDate = moment(formattedDate).format('MMMM Do YYYY, h:mm:ss a');
    var newWorkoutDayCard = $('<div>');
    newWorkoutDayCard.addClass('card');
    var newWorkoutDayCardHeading = $('<div>');
    newWorkoutDayCardHeading.addClass('card-header');
    var deleteBtn = $('<button>');
    deleteBtn.text('x');
    deleteBtn.addClass('delete btn btn-danger');
    var editBtn = $('<button>');
    editBtn.text('EDIT');
    editBtn.addClass('edit btn btn-info');
    var newWorkoutDayTitle = $('<h2>');
    var newWorkoutDayDate = $('<small>');
    var newWorkoutDayAuthor = $('<h5>');
    newWorkoutDayAuthor.text('Written by: ' + post.Author.name);
    newWorkoutDayAuthor.css({
      float: 'right',
      color: 'blue',
      'margin-top': '-10px'
    });
    var newWorkoutDayCardBody = $('<div>');
    newWorkoutDayCardBody.addClass('card-body');
    var newWorkoutDayBody = $('<p>');
    newWorkoutDayTitle.text(post.title + ' ');
    newWorkoutDayBody.text(post.body);
    newWorkoutDayDate.text(formattedDate);
    newWorkoutDayTitle.append(newWorkoutDayDate);
    newWorkoutDayCardHeading.append(deleteBtn);
    newWorkoutDayCardHeading.append(editBtn);
    newWorkoutDayCardHeading.append(newWorkoutDayTitle);
    newWorkoutDayCardHeading.append(newWorkoutDayAuthor);
    newWorkoutDayCardBody.append(newWorkoutDayBody);
    newWorkoutDayCard.append(newWorkoutDayCardHeading);
    newWorkoutDayCard.append(newWorkoutDayCardBody);
    newWorkoutDayCard.data('post', post);
    return newWorkoutDayCard;
  }

  // This function figures out which post we want to delete and then calls deleteWorkoutDay
  function handleWorkoutDayDelete() {
    var currentWorkoutDay = $(this)
      .parent()
      .parent()
      .data('post');
    deleteWorkoutDay(currentWorkoutDay.id);
  }

  // This function figures out which post we want to edit and takes it to the appropriate url
  function handleWorkoutDayEdit() {
    var currentWorkoutDay = $(this)
      .parent()
      .parent()
      .data('post');
    window.location.href = '/addworkout?post_id=' + currentWorkoutDay.id;
  }

  // This function displays a message when there are no posts
  function displayEmpty(id) {
    var query = window.location.search;
    var partial = '';
    if (id) {
      partial = ' for Author #' + id;
    }
    workoutdayContainer.empty();
    var messageH2 = $('<h2>');
    messageH2.css({ 'text-align': 'center', 'margin-top': '50px' });
    messageH2.html('No posts yet' + partial + ", navigate <a href='/addworkout" + query + "'>here</a> in order to get started.");
    workoutdayContainer.append(messageH2);
  }
});
