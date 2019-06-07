
$(document).ready(function () {
  let nameInput = $('#name');
  let passwordInput = $('#password');
  let emailInput = $('#email');
  let ageInput = $('#age');
  let genderInput = $('#gender');
  let weightInput = $('#weight');
  let goalWeightInput = $('#goal-weight');
  let heightFeetInput = $('#height-feet');
  let heightInchesInput = $('#height-inches');
  //let totalHeightInches = Number(heightFeet) * 12 + Number(heightInches);


  // Adding event listeners to the form to create a new object, and the button to delete
  // an User
  $(document).on('click', '#signup-form-btn', handleUserFormSubmit);

  // A function to handle what happens when the form is submitted to create a new User
  function handleUserFormSubmit(event) {
    event.preventDefault();

    // Don't do anything if the name fields hasn't been filled out
    if (
      !nameInput
        .val()
        .trim()
        .trim() ||
      !passwordInput
        .val()
        .trim()
        .trim() ||
      !emailInput
        .val()
        .trim()
        .trim() ||
      !ageInput
        .val()
        .trim()
        .trim() ||
      !genderInput
        .val()
        .trim()
        .trim() ||
      !weightInput
        .val()
        .trim()
        .trim() ||
      !goalWeightInput
        .val()
        .trim()
        .trim() ||
      !heightFeetInput
        .val()
        .trim()
        .trim() ||
      !heightInchesInput
        .val()
        .trim()
        .trim()
    ) {
      return;
    }

    // Variable for calCalc()
    let calcWeight = weightInput.val().trim();
    let calcHeight = Number(heightFeetInput.val().trim() * 12 + Number(heightInchesInput.val().trim()));
    let calcAge = ageInput.val().trim();
    let calcGender = genderInput.val().trim();

    // Function for calculating Daily Caloric needs
    function calCalc() {
      if (calcGender === 'Male') {
        return (66 + (6.2 * calcWeight + 12.7 * calcHeight - 6.76 * calcAge) * 1.55 - 700).toFixed(0);
      } else if (calcGender === 'Female') {
        return (655 + (4.35 * calcWeight + 4.7 * calcHeight - 4.7 * calcAge) * 1.55 - 500).toFixed(0);
      }
    }
    // Calling the upsertUser function and passing in the value of the name input
    let userData = {
      name: nameInput.val().trim(),
      password: passwordInput.val().trim(),
      email: emailInput.val().trim(),
      age: ageInput.val().trim(),
      gender: genderInput.val().trim(),
      weight: weightInput.val().trim(),
      goal_weight: goalWeightInput.val().trim(),
      height: Number(heightFeetInput.val().trim() * 12 + Number(heightInchesInput.val().trim())),
      daily_cals: calCalc()
    };

    console.log('userData: ', userData);
    addUser(userData);

  }
  // dfassdffds
  // A function for creating an user. Calls getUsers upon completion
  function addUser(userData) {
    $.post('/api/users', userData).then(() => {
      window.location.href = '/login';
    });
  }


});
