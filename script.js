document.addEventListener("DOMContentLoaded", function() {
    const addTaskButton = document.getElementById("addTaskButton");
    const taskTitleInput = document.getElementById("taskTitleInput");
    const taskDescriptionInput = document.getElementById("taskDescriptionInput");
    const taskList = document.getElementById("taskList");
    const clearAllButton = document.getElementById("clearAllButton");
    const submitTaskButton = document.getElementById("submitTaskButton");
    const inputContainer = document.getElementById("inputContainer");

    // Load tasks from local storage on page load
    loadTasks();

    // Show input fields when "Add Task" button is clicked
    addTaskButton.addEventListener("click", () => {
        inputContainer.style.display = "block";
        taskTitleInput.focus();
    });

    // Load tasks from local storage and display them
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            displayTask(task.title, task.description);
        });
    }

    // Function to add a task
    const addTask = () => {
        const taskTitle = taskTitleInput.value.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        const taskDescription = taskDescriptionInput.value.trim().charAt(0).toUpperCase() + taskDescriptionInput.value.trim().slice(1);
        if (taskTitle === "" || taskDescription === "") {
            alert("Please enter both task title and description.");
            return;
        }
     
        // Save task to local storage
        saveTaskToLocalStorage(taskTitle, taskDescription);
        
        // Display the task
        displayTask(taskTitle, taskDescription);

        taskTitleInput.value = ""; // Clear title input
        taskDescriptionInput.value = ""; // Clear description input
        inputContainer.style.display = "none"; // Hide input container
    };

    // Function to save tasks to local storage
    function saveTaskToLocalStorage(title, description) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ title, description });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to display a task as a card
    function displayTask(title, description) {
        const taskCard = document.createElement("div");
        taskCard.classList.add("task-card");

        const leftDiv = document.createElement("div");
        leftDiv.classList.add("leftDiv");

        const titleDiv = document.createElement("h3");
        titleDiv.classList.add("task-title");
        titleDiv.textContent = title;

        const descriptionDiv = document.createElement("p");
        descriptionDiv.classList.add("task-description");
        descriptionDiv.textContent = description;

        const rightDiv = document.createElement("div");
        rightDiv.classList.add("rightDiv");

        const removeButton = document.createElement("button");
        removeButton.innerHTML = "<i class='fa-solid fa-trash'></i>";
        removeButton.classList.add("remove");
        removeButton.title = "Remove Note";
        removeButton.onclick = () => {
            taskCard.remove();
            removeTaskFromLocalStorage(title);
        };

        taskCard.appendChild(leftDiv);
        leftDiv.appendChild(titleDiv);
        leftDiv.appendChild(descriptionDiv);
        taskCard.appendChild(rightDiv);
        rightDiv.appendChild(removeButton);
        taskList.appendChild(taskCard);
    }

    // Function to remove task from local storage
    function removeTaskFromLocalStorage(title) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const updatedTasks = tasks.filter(task => task.title !== title);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Event Listener for submit task button
    submitTaskButton.addEventListener("click", addTask);

    // Event Listener for Clear All button
    clearAllButton.addEventListener("click", () => {
        taskList.innerHTML = "";
        localStorage.removeItem('tasks'); // Clear all tasks from local storage
    });

    // Allow pressing "Enter" to add a task
    taskTitleInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    taskDescriptionInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });
});