<<<<<<< HEAD
var signup = [];

$(document).ready(function() {
  var signupTemplate = $("#signup-template").html();
  console.log(signupTemplate);
  var compileSignUpTemplate = Handlebars.compile(signupTemplate);

  Handlebars.registerPartial("signup", "{{signup}}");

  $(".attendance").html(compileSignUpTemplate(signup));
});

module.exports(signup);
=======
var signup = [

];

$(document).ready(function () {

    var signupTemplate = $("#signup-template").html();
    console.log(signupTemplate)
    var compileSignUpTemplate = Handlebars.compile(signupTemplate);

    Handlebars.registerPartial('signup', '{{signup}}');

    $('.attendance').html(compileSignUpTemplate(signup));


});

module.exports(signup);
>>>>>>> 97c69c0963420d625768ef70d72f5f3e7aa91997
