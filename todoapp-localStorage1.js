const form = document.querySelector("form");
const toDoList = document.querySelector("ul");

let toDos = JSON.parse(localStorage.getItem("toDos")) || [];

for (let i = 0; i < toDos.length; i++) {
  
    let newToDo = document.createElement("li");
    newToDo.innerText = toDos[i].task;
    newToDo.isCompleted = toDos[i].isCompleted ? true : false;
    newToDo.toRemove = toDos[i].toRemove ? true : false;
    if (newToDo.isCompleted) { 
      newToDo.style.textDecoration = "line-through";
    }
    toDoList.appendChild(newToDo);

    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    newToDo.appendChild(removeButton);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    let newToDo = document.createElement("li");
    let taskValue = document.getElementById("task").value;
    newToDo.innerText = taskValue;
    newToDo.isCompleted = false;
    newToDo.toRemove = false;
    toDoList.appendChild(newToDo);

    let removeButton = document.createElement("button");
    removeButton.innerText = "Remove";
    newToDo.appendChild(removeButton);

    toDos.push({ task: taskValue, isCompleted: false, toRemove: false });
    localStorage.setItem("toDos", JSON.stringify(toDos));
    form.reset();
});

toDoList.addEventListener("click", function(event) {
    let clickedItem = event.target;
    if (!clickedItem.isCompleted) {
      clickedItem.style.textDecoration = "line-through";
      clickedItem.isCompleted = true;
    } else {
      clickedItem.style.textDecoration = "none";
      clickedItem.isCompleted = false;
    }

    const targetTagToLowerCase = event.target.tagName.toLowerCase();
    if (targetTagToLowerCase === "button") {
      event.target.toRemove = true;
      event.target.parentNode.remove();
      let toDos = JSON.parse(localStorage.getItem("toDos")) || [];

      const filteredToDos = toDos.filter(toDo => toDo.toRemove === true);

      //console.log(filteredToDos);

      localStorage.setItem("toDos", JSON.stringify(toDos));
      
    }
  });