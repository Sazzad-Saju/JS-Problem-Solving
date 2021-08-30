//Define UI Element
let submit_data_form = document.querySelector('#task_form');
let input_data = document.querySelector('#new_task');
let task_list = document.querySelector('#task_list');
let clear_all = document.querySelector('#clear_task')
let filter_task = document.querySelector('#filter_task');

// Add a task
submit_data_form.addEventListener('submit', addTask);

function addTask(e) {
    if (input_data.value === '') {
        alert("Please Input a Task!");
    } else {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(input_data.value + " "));
        task_list.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
        storeInLocalStorage(input_data.value)
        input_data.value = "";
    }
    e.preventDefault();
}

// clear a task 
task_list.addEventListener('click', removeTask);

function removeTask(e) {
    if (e.target.hasAttribute("href")) {
        if (confirm("Are you sure?")) {
            let elem = e.target.parentElement;
            elem.remove();
            // console.log(elem);
            remove4mLS(elem);
        }
    }
}

// clear All tasks
clear_all.addEventListener('click', clearAll);

function clearAll(e) {
    if (task_list.getElementsByTagName('li').length >= 1) {
        if (confirm("Are you sure?")) {
            task_list.innerHTML = "";
            localStorage.clear();
        }
    }
}

//filter Tasks
filter_task.addEventListener('keyup', filterTask);

function filterTask(e) {
    let temp_task = e.target.value.toLowerCase();
    // console.log(temp_task);
    document.querySelectorAll('li').forEach(item => {
        let task = item.firstChild.textContent;
        if (task.toLowerCase().indexOf(temp_task) != -1) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// local storage
function storeInLocalStorage(a_task) {
    let total_tasks;
    if (localStorage.getItem('total_tasks') === null) {
        total_tasks = [];
    } else {
        total_tasks = JSON.parse(localStorage.getItem('total_tasks'));
    }
    total_tasks.push(a_task);
    localStorage.setItem('total_tasks', JSON.stringify(total_tasks));
}

document.addEventListener('DOMContentLoaded', load_old_tasks);

function load_old_tasks() {
    let total_tasks;
    if (localStorage.getItem('total_tasks') === null) {
        total_tasks = [];
    } else {
        total_tasks = JSON.parse(localStorage.getItem('total_tasks'));
    }
    total_tasks.forEach(item => {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item + " "));
        task_list.appendChild(li);
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = 'x';
        li.appendChild(link);
    })
}
// remove a task from Local Storage
function remove4mLS(a_task) {
    let total_tasks;
    if (localStorage.getItem('total_tasks') === null) {
        total_tasks = [];
    } else {
        total_tasks = JSON.parse(localStorage.getItem('total_tasks'));
    }

    let li = a_task;
    li.removeChild(li.lastChild);

    total_tasks.forEach((task, index) => {
        if (li.textContent.trim() === task) {
            total_tasks.splice(index, 1);
        }
    });
    localStorage.setItem('total_tasks', JSON.stringify(total_tasks));
}