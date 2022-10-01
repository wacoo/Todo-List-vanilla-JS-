var addButton = document.getElementById("add-button");
var clearCompleted = document.getElementById("clear-completed-button");
var emptyList = document.getElementById("empty-button");
var saveButton = document.getElementById("save-button");
var toDoEntryBox = document.getElementById("todo-entry-box");
var toDoList = document.getElementById("todo-list");

addButton.addEventListener("click", addToDoItem);
clearCompleted.addEventListener("click", clearCompletedItems);
emptyList.addEventListener("click", emptyItems);
saveButton.addEventListener("click", saveItems);
function addToDoItem()
{
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
    saveItems();
}
function newToDoItem(itemText, completed)
{
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);
    toDoItem.appendChild(toDoText);
    if (completed){
        toDoItem.classList.add("completed");
    }
    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dbclick", toggleToDoItemState);

}
function toggleToDoItemState(){
    if(this.classList.contains("completed")){
        this.classList.remove("completed");
    }
    else
    {
        this.classList.add("completed");
    }
}

function clearCompletedItems()
{
    var completedItems = document.getElementsByClassName("completed");
    while(completedItems.length > 0)
    {
        completedItems.item(0).remove();
    }
    saveItems();
}   

function emptyItems()
{
    var items = toDoList.children;
    while (items.length > 0)
    {
        items.item(0).remove();
    }
    saveItems();
}

function saveItems()
{
    var myArray = [];
    var items = toDoList.children;
    var i = 0;
    while (i < items.length)
    {   var toDo = items.item(i);
        var toDoInfo = {
        "task": toDo.innerText,
        "completed": toDo.classList.contains("completed")
        };
        myArray.push(toDoInfo);
        i++;
        if (Array.isArray(myArray) && myArray.length)
        {
            localStorage.setItem("toDos", JSON.stringify(myArray));
            
        }
        
        
    }
    if (Array.isArray(myArray) && myArray.length <= 0)
    {
        localStorage.removeItem("toDos");
    }
    
}

function loadList(){
    if (localStorage.getItem("toDos") != null)
    {
        var myArray = JSON.parse(localStorage.getItem("toDos"));
        if (Array.isArray(myArray) && myArray.length)
        {
            for(var i = 0; i<myArray.length; i++)
            {
                var toDo = myArray[i];
                newToDoItem(toDo.task, toDo.completed);
            }
        }
    }
   /* else
    {
        alert("Empty List!");
    }*/
    
} loadList();

