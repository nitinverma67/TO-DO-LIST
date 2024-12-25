document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const newTaskButton = document.getElementById('newTask');
    const taskList = document.querySelector('.task-list');
    const progressBar = document.getElementById('progress');
    const numbers = document.getElementById('numbers');

    let totalTasks = 0;
    let completedTasks = 0;

    newTaskButton.addEventListener('click', (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
        }
    });

    function addTask(taskText) {
        totalTasks++;
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span>${taskText}</span>
            <button onclick="deleteTask(this)">x</button>
        `;
        taskList.appendChild(li);
        updateProgress();
    }

    window.deleteTask = function (button) {
        const li = button.parentElement;
        if (li.querySelector('.task-checkbox').checked) {
            completedTasks--;
        }
        totalTasks--;
        taskList.removeChild(li);
        updateProgress();
    }

    taskList.addEventListener('change', function(event) {
        if (event.target.classList.contains('task-checkbox')) {
            if (event.target.checked) {
                completedTasks++;
            } else {
                completedTasks--;
            }
            updateProgress();
        }
    });

    function updateProgress() {
        if (totalTasks === 0) {
            progressBar.style.width = '0%';
            numbers.textContent = '0 / 0';
        } else {
            const progress = (completedTasks / totalTasks) * 100;
            progressBar.style.width = progress + '%';
            numbers.textContent = `${completedTasks} / ${totalTasks}`;
        }
    }
});
