/*
 * Title: To Do Application using vanilla JS DOM
 * Description: This JS file has all the JS functions necessary to control the to do application
 * Author: Md Shohag ( Dream IT )
 * Date: 09/08/2022
 *
 */

// select elements & assign them to variable
let newTask = document.querySelector("#new-task");
let form = document.querySelector("form");
let todoUl = document.querySelector("#items");
let completeUl = document.querySelector(".complete-list ul");



// functions
let createTask = function(task){
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");

    label.innerText = task;
    checkBox.type = 'checkbox';

    listItem.appendChild(checkBox);
    listItem.appendChild(label);

    return listItem;
}

let addTask = function(event){
    event.preventDefault();
    let listItem = createTask(newTask.value);
    todoUl.appendChild(listItem);
    newTask.value = "";

    // bind the new list item to the incomplete list
    bindIncompleteItems(listItem, completeTask);

}

let completeTask = function(){
    let listItem = this.parentNode;
    let deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'Delete';
    deleteBtn.className = 'delete';
    listItem.appendChild(deleteBtn);

    let checkbox = listItem.querySelector('input[type="checkbox"]');
    checkbox.remove();
    completeUl.appendChild(listItem);

    // delete bind
    bindCompleteItems(listItem, deleteTask);
}

let deleteTask = function(){
    let listItem = this.parentNode;
    let ul = listItem.parentNode;
    ul.removeChild(listItem);
}


let bindIncompleteItems = function(taskItem, checkBoxClick){
    let checkBox = taskItem.querySelector('input[type="checkbox"]');
    checkBox.onchange = checkBoxClick;
}

let bindCompleteItems = function(taskItem, deleteButtonClick){
    let deleteButton = taskItem.querySelector('.delete');
    deleteButton.onclick = deleteButtonClick;
}

for(let i=0; i < todoUl.children.length; i++){
    bindIncompleteItems(todoUl.children[i], completeTask);
}

for(let i=0; i < completeUl.children.length; i++){
    bindCompleteItems(completeUl.children[i], deleteTask);
}

form.addEventListener('submit', addTask);
