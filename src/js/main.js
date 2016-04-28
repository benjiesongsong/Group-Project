import $ from 'jquery';

// BENJIES CURRENT WORK FOR THE TESTIMONY DIV
// DO NOT ERASE
var randomUserBaseURL = "http://api.randomuser.me/";
var ruGenders = ["?gender=female","?gender=male","?gender=male"];
var ruURL = randomUserBaseURL;

var testimonyURL = 'https://json-data.herokuapp.com/darts/testimonials';

// variables used to call function into objects to pull into this array
var users = [];
var testimonials = [];



// ON PAGE LOAD FUNCTIONS
getUsers();
getTestimonials();
setTimeout( function() {
  buildObject();
}, 1000);




// FUNCTION DEFINITIONS
// Made a function in order to be able to get the correct gender order each time
function getUsers () {
  ruGenders.forEach (function (gender){
  var ruFinalURL = ruURL + gender;
    $.getJSON(ruFinalURL).then(function(response){
      var user = response.results[0];
      users.push(user)
    });
  });
}


function getTestimonials() {
  $.getJSON(testimonyURL).then(function(response){
    response.results.forEach(function(testimonial){
      testimonials.push(testimonial);
    });
  });
};



function buildObject () {
  console.log(users);
  console.log(testimonials);

  }



function testimonialTemplate () {
  return `
          <ul class="users">
            <li class="userImage">${users.picture.large}</li>
            <li class="userName">${testimonials.name}</li>
            <li class="userReview">${testimonials.review}</li>
          </ul>
  `;
  $('.testimonialuser').append(testimonialTemplate());
};






// ---------------------------------------------------------------------------------------------------//
//Jeff code for company block
//interpolate company info so it can be accessed

var companyURL = 'https://json-data.herokuapp.com/darts/companies';

var companyTemplate = function(company) {
  return `
  <div class= companies>
  <img src="${company.image_url}" alt="" />
  </div>
  `
}

$.getJSON(companyURL).then (function(res){
  // console.log(res);
  res.results.forEach(function(company){


    // console.log(company.image_url);
    var html = companyTemplate(company);
    $('.container').append(html);
  })
});
