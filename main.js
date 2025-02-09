let theInput = document.querySelector(".add-task input");
let addBtn = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let boxes = document.querySelector(".boxes");
let noTasksMsg = document.querySelector(".no-tasks");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAll = document.querySelector(".delete-all");

window.onload = function () {
  theInput.focus();

  // Load tasks from localStorage if available
  if (localStorage.getItem("tasks")) {
    noTasksMsg.style.display = "none";

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task) => {
      createTasks(task);
    });

    updateTask();
  }
};

addBtn.addEventListener("click", function () {
  if (theInput.value !== "") {
    if (noTasksMsg) {
      noTasksMsg.style.display = "none";
    }

    // Save the input value before clearing
    const taskValue = theInput.value;

    createTasks(taskValue); // Create the task
    saveTaskToLocalStorage(taskValue); // Save the task to localStorage

    updateTask(); // Update task functionalities
    theInput.value = ""; // Clear the input after saving
  }
});

deleteAll.addEventListener("click", () => {
  boxes.innerHTML = ""; // Clear tasks container
  localStorage.removeItem("tasks"); // Remove all tasks from localStorage
  noTasksMsg.style.display = "block";
  tasksCount.innerHTML = "0";
  tasksCompleted.innerHTML = "0";
});

function createTasks(taskContent) {
  let box = document.createElement("div");
  box.classList.add("box");

  let titleOfBox = document.createElement("div");
  titleOfBox.classList.add("box-title");
  titleOfBox.innerHTML = `Task <span>${boxes.children.length + 1}</span>`;

  let boxContent = document.createElement("p");
  boxContent.innerHTML = taskContent; // Use the passed content, not theInput.value

  box.appendChild(titleOfBox);
  box.appendChild(boxContent);

  boxes.appendChild(box);
  tasksContainer.appendChild(boxes);

  tasksCount.innerHTML = boxes.children.length;
}

function updateTask() {
  Array.from(boxes.children).forEach((box) => {
    if (box.classList.contains("box")) {
      box.addEventListener("mouseover", function () {
        box.classList.add("targeted-box");

        if (!box.querySelector(".update")) {
          let update = document.createElement("div");
          update.className = "update";

          let deleteTask = document.createElement("div");
          deleteTask.className = "delete-task";
          deleteTask.textContent = "Delete";

          let completedTask = document.createElement("div");
          completedTask.className = "completed-task";
          completedTask.textContent = "Completed";

          update.append(deleteTask, completedTask);
          box.appendChild(update);

          // Delete Task
          deleteTask.addEventListener("click", function () {
            const taskContent = box.querySelector("p").textContent;
            box.remove();

            // Update localStorage after deletion
            removeTaskFromLocalStorage(taskContent);

            [...boxes.children].forEach((box, index) => {
              box.querySelector(".box-title span").innerHTML = index + 1;
            });

            tasksCount.innerHTML = boxes.children.length;

            if (box.classList.contains("done")) {
              tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) - 1;
            }

            if (boxes.children.length == 0) {
              noTasksMsg.style.display = "block";
            }
          });

          // Complete Task
          completedTask.addEventListener("click", function () {
            if (box.classList.toggle("done")) {
              tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) + 1;
            } else {
              tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) - 1;
            }
          });
        }
      });

      box.addEventListener("mouseleave", function () {
        box.classList.remove("targeted-box");

        let update = box.querySelector(".update");
        if (update) update.remove();
      });
    }
  });
}

function saveTaskToLocalStorage(taskContent) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks.push(taskContent); // Add the task content to the array
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Save back to localStorage
}

function removeTaskFromLocalStorage(taskContent) {
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  tasks = tasks.filter((task) => task !== taskContent);
  localStorage.setItem("tasks", JSON.stringify(tasks)); 
}


// ==========================
// Without Using LocalStorage

// let theInput = document.querySelector(".add-task input");
// let addBtn = document.querySelector(".add-task .plus");
// let tasksContainer = document.querySelector(".tasks-content");
// let boxes = document.querySelector(".boxes");
// let noTasksMsg = document.querySelector(".no-tasks");
// let tasksCount = document.querySelector(".tasks-count span");
// let tasksCompleted = document.querySelector(".tasks-completed span");
// let deleteAll = document.querySelector(".delete-all");

// window.onload = function () {
//   theInput.focus();
// }

// addBtn.addEventListener("click", function () {
//   if (theInput.value !== "") {
//     if (noTasksMsg) {
//       // noTasksMsg.remove();
//       noTasksMsg.style.display = "none";
//     };

//     createTasks();
//     updateTask();
//   }
// });

// deleteAll.addEventListener("click", () => {
//   boxes.innerHTML = "";

//   noTasksMsg.style.display = "block";
//   tasksCount.innerHTML = "0";
//   tasksCompleted.innerHTML = "0";
// });

// function createTasks() {
//   let box = document.createElement("div");
//   box.classList.add("box");

//   let titleOfBox = document.createElement("div");
//   titleOfBox.classList.add("box-title");
//   titleOfBox.innerHTML = `Task <span>${boxes.children.length + 1}</span>`;

//   let boxContent = document.createElement("p");
//   boxContent.innerHTML = theInput.value;

//   box.appendChild(titleOfBox);
//   box.appendChild(boxContent);

//   boxes.appendChild(box);
//   tasksContainer.appendChild(boxes);

//   theInput.value = "";
//   tasksCount.innerHTML = boxes.children.length;
// }

// function updateTask() {
//   Array.from(boxes.children).forEach((box) => {
//     if (box.classList.contains("box")) {
//       box.addEventListener("mouseover", function () {
//         box.classList.add("targeted-box");

//         if (!box.querySelector(".update")) {
//           let update = document.createElement("div");
//           update.className = "update";

//           let deleteTask = document.createElement("div");
//           deleteTask.className = "delete-task";
//           deleteTask.textContent = "Delete";

//           let completedTask = document.createElement("div");
//           completedTask.className = "completed-task";
//           completedTask.textContent = "Completed";

//           update.append(deleteTask, completedTask);
//           box.appendChild(update);

//           deleteTask.addEventListener("click", function () {
//             box.remove();
//             // console.log(boxes.children);

//             [...boxes.children].forEach((box, index) => {
//               box.querySelector(".box-title span").innerHTML = index+1;
//             })

//             tasksCount.innerHTML = boxes.children.length;

//             if (box.classList.contains("done")) {
//               tasksCompleted.innerHTML = parseInt(tasksCompleted.innerHTML) - 1;
//             }

//             if (boxes.children.length == 0) {
//               noTasksMsg.style.display = "block";
//             }
//           });

//           completedTask.addEventListener("click", function () {
//             if (box.classList.toggle("done")) {
//               tasksCompleted.innerHTML =
//                 parseInt(tasksCompleted.innerHTML) + 1;
//             } else {
//               tasksCompleted.innerHTML =
//                 parseInt(tasksCompleted.innerHTML) - 1;
//             }
//           })
//         }
//       });

//       box.addEventListener("mouseleave", function () {
//         box.classList.remove("targeted-box");

//         let update = box.querySelector(".update");
//         if (update) update.remove();
//       });
//     }
//   });
// }
