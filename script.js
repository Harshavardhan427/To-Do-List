document.addEventListener("DOMContentLoaded", loadTasks); // Load tasks on page load

function addTask() {
    const taskInput = document.getElementById("task-input");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const taskList = document.getElementById("task-list");
    const taskItem = createTaskElement(taskText);

    taskList.appendChild(taskItem);
    saveTask(taskText, false); // Save the task in local storage

    taskInput.value = ""; // Clear the input
}

function createTaskElement(text, completed = false) {
    const taskItem = document.createElement("li");
    taskItem.classList.toggle("completed", completed);

    const taskSpan = document.createElement("span");
    taskSpan.textContent = text;
    taskSpan.onclick = () => toggleComplete(taskItem, text); // Toggle completion on click
    taskItem.appendChild(taskSpan);

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.onclick = () => deleteTask(taskItem, text); // Delete task on click
    taskItem.appendChild(deleteBtn);

    return taskItem;
}

function toggleComplete(taskItem, text) {
    taskItem.classList.toggle("completed");
    const completed = taskItem.classList.contains("completed");
    updateTaskStatus(text, completed); // Update local storage
}

function deleteTask(taskItem, text) {
    taskItem.remove();
    removeTaskFromStorage(text); // Remove from local storage
}

function saveTask(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ text, completed });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = createTaskElement(task.text, task.completed);
        document.getElementById("task-list").appendChild(taskItem);
    });
}

function updateTaskStatus(text, completed) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const task = tasks.find(t => t.text === text);
    if (task) {
        task.completed = completed;
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
}

function removeTaskFromStorage(text) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    const updatedTasks = tasks.filter(task => task.text !== text);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
}

function filterTasks(filter) {
    const tasks = document.querySelectorAll("#task-list li");
    tasks.forEach(task => {
        switch (filter) {
            case "all":
                task.style.display = "flex";
                break;
            case "active":
                task.style.display = task.classList.contains("completed") ? "none" : "flex";
                break;
            case "completed":
                task.style.display = task.classList.contains("completed") ? "flex" : "none";
                break;
        }
    });
}
