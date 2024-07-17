document.addEventListener("DOMContentLoaded", () => {
  const signInButton = document.getElementById("signIn");
  const signUpButton = document.getElementById("signUp");
  const signInFormContainer = document.getElementById("inform-container");
  const signUpFormContainer = document.getElementById("upform-container");
  const createButton = document.getElementById("btn1");
  // const mreButton = document.getElementById("btn2");
  const taskFormContainer = document.getElementById("taskFormContainer");
  const tasksList = document.getElementById("tasksList");
  const currentUser = JSON.parse(localStorage.getItem("currentUser")); //I'm retreving the currentUser object stored locally browser storage.. when I logged in 

  pullTask();

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
            <input type="password" id="userPassword" name="password" required>
          </div>
          <button type="submit" id="submitButtonIn">Sign In</button>
        </form>
    `
    signInFormContainer.style.display = "block"
    // signInFormContainer.style.zIndex = 1000

    document.getElementById("signInForm").addEventListener("submit", (e) => {
      e.preventDefault()
      const email = document.getElementById("userEmail").value;
      const password = document.getElementById("userPassword").value;
      loginUser(email, password)
    })
  })

  signUpButton.addEventListener("click", (e) => {
    e.preventDefault()
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

    document.getElementById("signUpForm").addEventListener("submit", (e) => {
      e.preventDefault()
      const userName = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value
      registerUser(email, password)
    })

  })

  function registerUser(email, password) {
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(userData => {
        console.log("Registered succesfully", userData);
        alert("Registered Succesfully!.. Now log in ");
        signUpFormContainer.style.display = "none" //redirects to log in and hides the sighnup button 
        signInButton.click();
      })
  }

  function loginUser(email, password) {
    fetch(`http://localhost:3000/users?email=${email}&password=${password}`) // this helps me in filtering capability within JSON 
      .then(res => res.json())
      .then(data => {
        if (data.length > 0 && data[0].password.trim() !== " ") { //thhis ensures the data password is not empty
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

  createButton.addEventListener("click", (e) => {
    taskFormContainer.innerHTML = `
        <form id="taskForm">
            <div class="form-group">
                <label for="taskTitle">Task Title:</label>
                <input type="text" id="taskTitle" name="taskTitle" required>
            </div>
            <div class="form-group">
                <label for="taskDescription">Description:</label>
                <textarea id="taskDescription" name="taskDescription"></textarea>
            </div>
            <div class="form-group">
                <label for="taskDeadline">Deadline:</label>
                <input type="date" id="taskDeadline" name="taskDeadline">
            </div>
            <div class="form-group">
                <label for="taskPriority">Priority:</label>
                <select id="taskPriority" name="taskPriority">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div class="form-group">
                <label for="taskCategory">Category:</label>
                <input type="text" id="taskCategory" name="taskCategory">
            </div>
            <button type="submit">Create Task</button>
        </form>
    `
    const taskForm = document.getElementById("taskForm")
    taskForm.style.display = "block"
    taskForm.addEventListener("submit", (e) => {
      // e.preventDefault()

      const title = document.getElementById("taskTitle").value;
      const description = document.getElementById("taskDescription").value;
      const deadline = document.getElementById("taskDeadline").value;
      const priority = document.getElementById("taskPriority").value;
      const category = document.getElementById("taskCategory").value;

      createTask(title, description, deadline, priority, category);
    });
  });

  function createTask(title, description, deadline, priority, category) {
    fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, description, deadline, priority, category })
    })
      .then(res => res.json())
      .then(taskData => {
        console.log("Task created", taskData)
        alert("Confirm to create task")
        taskForm.reset();
      })
      .catch(error => console.error("Error creating task:", error));
  }

  function pullTask() {
    fetch(`http://localhost:3000/tasks?userId=${currentUser.id}`) // a querry parameter
      .then(res => res.json())
      .then(listData => {
        tasksList.innerHTML = "";
        listData.forEach(task => {
          const li = document.createElement("li");
          li.innerHTML = `
        <h3>${task.title}</h3>
        <p>${task.description}</p>
        <p>Deadline: ${task.deadline}</p>
        <p>Priority: ${task.priority}</p>
        <p>Category: ${task.category}</p>
        <button id="deleteTask" data-task-id="${task.id}">Delete</button>        
        `;

          tasksList.appendChild(li);
        });
        //adding eventlisteners to the buttons while it iterates through each button in the list and then calls the functions Taskdelete
        document.querySelectorAll("#deleteTask").forEach(button => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const taskId = button.getAttribute("data-task-id");
            deleteTask(taskId);
          })
        })
      });
  }
  function deleteTask(taskId) {
    fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE"
    })
      .then(() => {
        alert("Delete Task ?");
        pullTask(); //takes me back to pull tasksList
      })
      .catch(error => console.error("Problem deleting task", error));
  }

  

})