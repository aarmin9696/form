document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    var userState = localStorage.getItem('userState');
    if (!userState) {
      // Redirect to signup page if no user state found
      window.location.href = 'index.html';
      return;
    }
  
    // Parse the user state from local storage
    var user = JSON.parse(userState);
  
    // Display user details
    var fullNameElement = document.getElementById('fullName');
    var fullNameValueElement = document.getElementById('fullNameValue');
    var emailElement = document.getElementById('email');
    var passwordElement = document.getElementById('password');
  
    fullNameElement.innerText = 'Welcome, ' + user.fullName;
    fullNameValueElement.innerText = user.fullName;
    emailElement.innerText = user.email;
    passwordElement.innerText = user.password;
  
    // Logout functionality
    var logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function() {
      // Clear user state from local storage
      localStorage.removeItem('userState');
  
      // Redirect to signup page
      window.location.href = 'index.html';
    });
  
    // Check if user tries to access signup page and redirect to profile
    if (window.location.pathname.includes('index.html')) {
      window.location.href = 'profile.html';
    }
  });
  