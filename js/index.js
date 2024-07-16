document.addEventListener("DOMContentLoaded", () =>{
  const signInButton = document.getElementById("signIn");
  const signUpButton = document.getElementById("signUp");
  const signInFormContainer = document.getElementById("inform-container");
  const signUpFormContainer = document.getElementById("upform-container");


  signInButton.addEventListener("click", () => {
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
    `
    signInFormContainer.style.display = "block"
  })
  signUpButton.addEventListener("click", () => {
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
    `
    signUpFormContainer.style.display = "block"
  })
  
  function registerUser(username, password) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password})
    })
    .then(res => res.json())
    .then(userData => {
      console.log("Succefully Registered", userData)
    })
  }
  registerUser()

})