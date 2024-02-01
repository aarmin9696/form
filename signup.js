document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('signupForm').addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Get form values
      var fullName = document.getElementById('fullNameInput').value;
      var email = document.getElementById('emailInput').value;
      var password = document.getElementById('passwordInput').value;
      var confirmPassword = document.getElementById('confirmPasswordInput').value;
  
      // Validate form values
      var errors = [];
  
      // Check if full name is empty or contains only whitespace
      if (fullName.trim() === '') {
        errors.push('Full Name is required.');
      }
  
      // Check if email is empty or contains only whitespace
      if (email.trim() === '') {
        errors.push('Email is required.');
      }
  
      // Check if password is empty or contains less than 6 characters
      if (password === '' || password.length < 6) {
        errors.push('Password should be at least 6 characters long.');
      }
  
      // Check if confirm password is empty
      if (confirmPassword === '') {
        errors.push('Confirm Password is required.');
      }
  
      // Check if confirm password matches password
      if (confirmPassword !== password) {
        errors.push('Passwords do not match.');
      }
  
      // Display errors or proceed with signup
      var errorContainer = document.getElementById('errorContainer');
      if (errors.length > 0) {
        errorContainer.style.color = 'red';
        errorContainer.innerText = 'All fields are mandatory.';
      } else {
        // Generate access token and create user state
        var accessToken = generateAccessToken();
        var userState = {
          fullName: fullName,
          email: email,
          password: password,
          accessToken: accessToken
          // Add other user properties as needed
        };
  
        // Store user state in local storage
        localStorage.setItem('userState', JSON.stringify(userState));
  
        // Clear form fields
        document.getElementById('fullNameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';
        document.getElementById('confirmPasswordInput').value = '';
  
        // Show success message
        errorContainer.style.color = 'green';
        errorContainer.innerText = 'Signed up successfully!';
  
        // Redirect to profile page
        setTimeout(function() {
          window.location.href = 'profile.html';
        }, 1000); // Delay redirection for 1 second
      }
    });
  
    function generateAccessToken() {
      // Implement random token generation logic
      // Return a random 16-byte string
      // Create a Uint8Array with 16 bytes
      var buffer = new Uint8Array(16);
  
      // Fill the buffer with random values
      crypto.getRandomValues(buffer);
  
      // Convert the buffer to a hex string
      var hexString = Array.prototype.map.call(buffer, function(byte) {
        return ('0' + byte.toString(16)).slice(-2);
      }).join('');
  
      return hexString;
    }
  });
  