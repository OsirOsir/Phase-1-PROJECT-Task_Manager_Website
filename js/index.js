document.addEventListener("DOMContentLoaded", () =>{
  const signInButton = document.getElementById("signIn");
  const signUpButton = document.getElementById("signUp");
  const signInFormContainer = document.getElementById("inform-container");
  const signUpFormContainer = document.getElementById("upform-container");


  signInButton.addEventListener("click", (e) => {
    e.preventDefault()
    signInFormContainer.innerHTML = `
    <form id="signInForm">
          <h2>Sign In</h2>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="userEmail" name="email" required>
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="userPassword" name="password">
          </div>
          <button type="submit" id="submitButtonIn">Sign In</button>
        </form>
    `
    signInFormContainer.style.display = "block"

    signInForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("userEmail").value;
      const password = document.getElementById("userPassword").value;
      loginUser(email, password)
    })


  })

  function loginUser(email, password) {
    fetch(`http://localhost:3000/users?email=${email}&password=${password}`) // this helps me in filtering capability within JSON 
    .then(res => res.json())
    .then(data => {
      if (data.length > 0 && data[0].password.trim() !== "") { //thhis ensures the data password is not empty
        console.log("User logged in ", data[0])  //checks the first object in the array this helps me with debugging
        alert("Login succeful!")

        localStorage.setItem("currentUser", JSON.stringify(data[0]));
        signInFormContainer.style.display = "none"
      } else {
        console.log("Invalid loggins");
        alert("Invalid Loggins. Try again");
      }
    })
  }

})