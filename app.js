const addBtn = document.querySelector(".add-btn");
const todosContainer = document.querySelector(".todos");
const input = document.querySelector("input");
let tempEdit;

addBtn.addEventListener("click", addTodo);
window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTodo();
});
todosContainer.addEventListener("click", (e) => {
  checkRemoveEdit(e);
});

function getInput() {
  if (input.value) {
    return input.value;
  }
  return false;
}

function addTodo() {
  const inputValue = getInput();
  if (inputValue != false) {
    // create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-box");
    // create div
    const innerTodo = document.createElement("div");
    innerTodo.classList.add("todo");
    innerTodo.textContent = inputValue;
    newTodo.appendChild(innerTodo);
    // check button
    const checkBtn = document.createElement("button");
    checkBtn.innerHTML = '<i class="fas fa-check"></i>';
    checkBtn.setAttribute("class", "btn check-btn");
    newTodo.appendChild(checkBtn);
    // delete button
    const removeBtn = document.createElement("button");
    removeBtn.innerHTML = '<i class="fas fa-times"></i>';
    removeBtn.setAttribute("class", "btn delete-btn");
    newTodo.appendChild(removeBtn);
    //add li
    todosContainer.appendChild(newTodo);
    // clear input
    input.value = "";
  }
}

function checkRemoveEdit(e) {
  const currentBtn = e.target;
  // check/uncheck item
  if (currentBtn.classList.contains("check-btn")) {
    currentBtn.parentElement.firstChild.classList.toggle("checked");
  }
  // delete item
  if (currentBtn.classList.contains("delete-btn")) {
    todosContainer.removeChild(currentBtn.parentElement);
  }
  // edit item
  if (currentBtn.classList.contains("todo")) {
    // save item to temp variable
    tempEdit = currentBtn;
    // create edit box
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.classList.add("todo-editable");
    editInput.value = currentBtn.textContent;
    //replace todo with edit box
    currentBtn.parentElement.replaceChild(editInput, currentBtn);
    editInput.focus();
  }
  // save item
  if (currentBtn.classList.contains("todo-editable")) {
    if (currentBtn.value == "") return;
    // re assign data
    tempEdit.textContent = currentBtn.value;
    currentBtn.parentElement.replaceChild(tempEdit, currentBtn);
  }
}
