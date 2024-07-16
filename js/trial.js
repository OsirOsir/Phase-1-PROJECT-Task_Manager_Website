document.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.getElementById("signIn");
  const signUpButton = document.getElementById("signUp");
  const signInFormContainer = document.getElementById("inform-container");
  const signUpFormContainer = document.getElementById("upform-container");

  signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    signInFormContainer.innerHTML = `
    <form id="signInForm">
      <h2>Sign In</h2>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="userEmail" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="userPassword" name="password" required>
      </div>
      <button type="submit" id="submitButtonIn">Sign In</button>
    </form>
    `;
    signInFormContainer.style.display = "block";

    document.getElementById("signInForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("userEmail").value;
      const password = document.getElementById("userPassword").value;
      loginUser(email, password);
    });
  });

  signUpButton.addEventListener("click", (e) => {
    e.preventDefault();
    signUpFormContainer.innerHTML = `
    <form id="signUpForm">
      <h2>Sign Up</h2>
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <button type="submit" id="submitButtonUp">Sign Up</button>
    </form>
    `;
    signUpFormContainer.style.display = "block";

    document.getElementById("signUpForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      registerUser(username, email, password);
    });
  });

  function registerUser(username, email, password) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    })
    .then((res) => res.json())
    .then((userData) => {
      console.log("Successfully Registered", userData);
      alert("Registration successful! Please log in now.");
      // Redirect to log in and hide sign-up form, (show sign-in form)
      signUpFormContainer.style.display = "none";
      signInButton.click();
    });
  }

  function loginUser(email, password) {
    fetch(`http://localhost:3000/users?email=${email}&password=${password}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          console.log("User Logged in:", data[0]);
          alert("Login successful!");
          // The below code stores user's details in local storage
          localStorage.setItem("currentUser", JSON.stringify(data[0]));
          signInFormContainer.style.display = "none";
          // Load the dashboard or main application interface here
        } else {
          console.log("Invalid credentials");
          alert("Invalid credentials. Please try again.");
        }
      });
  }
});
