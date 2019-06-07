var signup = [];

$(document).ready(function() {
  var signupTemplate = $('#signup-template').html();
  console.log(signupTemplate);
  var compileSignUpTemplate = Handlebars.compile(signupTemplate);

  Handlebars.registerPartial('signup', '{{signup}}');

  $('.attendance').html(compileSignUpTemplate(signup));
});

module.exports(signup);
