
let theInput = document.querySelector(".add-task input");
let addBtn = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let boxes = document.querySelector(".boxes");
let noTasksMsg = document.querySelector(".no-tasks");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let deleteAll = document.querySelector(".delete");

window.onload = function () {
  theInput.focus();
}

addBtn.addEventListener("click", function () {
  if (theInput.value !== "") {
    if (noTasksMsg) {
      noTasksMsg.remove();
    };

    createTasks();
    updateTask();
  }
});


function createTasks() {
  let box = document.createElement("div");
  box.classList.add("box");

  let titleOfBox = document.createElement("div");
  titleOfBox.innerHTML = `Task <span>${boxes.children.length}</span>`;

  let boxContent = document.createElement("p");
  boxContent.innerHTML = theInput.value;

  box.appendChild(titleOfBox);
  box.appendChild(boxContent);

  boxes.appendChild(box);
  tasksContainer.appendChild(boxes);

  theInput.value = "";
}


function updateTask() {

  let tasks = boxes.children;

  Array.from(tasks).forEach((element) => {
    element.addEventListener("mouseover", function (event) {
      event.target.classList.add("targeted-box");

      if (!event.target.querySelector(".update")) {

        let update = document.createElement("div");
        update.classList.add("update");

        let deleteTask = document.createElement("div");
        update.classList.add("delete-task");
        deleteTask.innerHTML = "Delete";

        let completedTask = document.createElement("div");
        update.classList.add("completed-task");
        completedTask.innerHTML = "Completed";

        update.appendChild(deleteTask);
        update.appendChild(completedTask);

        event.target.appendChild(update);
      }

    });
  })
}