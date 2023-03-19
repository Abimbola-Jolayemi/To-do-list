// initial reference
const newTaskInput = document.querySelector
("#new-task input");
const tasksDiv = document.querySelector("task");
let deleteTasks, editTasks, tasks;
let updateNote = "";
let count;

//function on window load
window.onload = () => {
    updateNote = "";
    count = Object.keys(localStorage).length;
    displayTasks();
};

//function to display the tasks
const displayTasks = () => {
    if (Object.keys(localStorage).length > 0){
        tasksDiv.style.display = "inline-block";
    } else{
        tasksDiv.style.display = "none"
    }

    //clear the tasks
    tasksDiv.innerHTML = ""

    //fetch all the keys in local storage
    let tasks = Object.keys(localStorage);
    tasks = tasks.sort();

    for (let key of tasks){
        let classValue ="";

        //gett all the values
        let value = localStorage.getItem(key);
        let taskInnerDiv = document.createElement("div")
        taskInnerDiv.classList.add("task");
        taskInnerDiv.setAttribute("id", key);
        taskInnerDiv.innerHTML = '<span id="taskname'>${key.split("_")[1]}</span>';

        //localstorage will store boolean as string so we parse it to boolean back
        let editButton = document.createElement("button");
        editButton.classList.add("edit");
        editButton.innerHTML = '<i class="fa-solid-fa-pen-to-square"></i>';
        if (!JSON.parse(value)) {
            editButton.style.visibility = "visible";
        }
        else{
            editButton.style.visibility = "hidden"
            taskInnerDiv.classList.add("completed");
        }
        textInnerDiv.appendChild(editButton);
        taskInnerDiv.innerHTML += 'button class="delete"><i class="fa-solid fa-trash"></i></button>';
        tasksDiv.appendChild(taskInnerDiv);
    }
    //task completed
    tasks = document.querySelectorAll(".tasks");
    tasks.forEach((element, index) => {
        element.onclick = () => {
            //local storage update
            if(element.classList.contains("completed")){
                updateStorage(element.id.split("_")[0],
                element.innerText, false);
            }
            else{
                updateStorage(element.id.split("_")[0],
                element.innerText, true);
            }
        }
    });
};

//Disable edit button
const disableButtons = (bool) => {
    let editButton = document.getElementsByClassName("edit");
    Array.from(editButtons).forEach((element) => {
        element.disabled = bool;
    });
};

//remove task from local storage
const removeTask = (taskValue) => {
    localStorage.removeItem(taskValue);
    displayTasks();
};

//add tasks to lacl storage
const updateStorage = (iindex, taskValue, completed) => {
    localStorage.setItem('${index}_${taskValue}',completed);
    displayTasks();
};

//function to add new tasks 
document.querySelector("#push").addEventListener("click", () => {
    //Enable the edit button
    disableButtons(false);
    if(newTaskInput.value.length == 0){
        alert("Please enter task")
    }
    else{
        //store locally and displaty ffrom local storage
        if (updateNote =="") {
            //new task
            updateStorage(count, newTaskInput.value,false);
        }
        else{
            //update task
            let existingCount = updateNote.split("_")[0];
            removeTask(updateNote);
            updateStorage(existingCount, newTaskInput.value, false);
            updateNote = "";
        }
        count += 1;
        newTaskInput.value = "";
    }
}
