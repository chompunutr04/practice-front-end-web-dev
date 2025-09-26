document.addEventListener("DOMContentLoaded", function () {
    // ประกาศตัวแปร โดยดึงจาก medthod document.getElementById
const todoList = document.getElementById("todo-list");
const todoInput = document.getElementById("todo-input");
const addButton = document.getElementById("add-button");
// อาร์เรย์สำหรับเก็บรายการ Todo
let todos = [];
// เพิ่มรายการ Todo
function addTodo() {
const todoText = todoInput.value.trim();
if (todoText !== "") {
const todoItem = {

text: todoText,
completed: false,
};
todos.push(todoItem);
renderTodoList();
todoInput.value = "";
}
}
//  ลบรายการ Todo
function deleteTodo(index) {
todos.splice(index, 1);
 renderTodoList();
 }
// ตรวจสอบ/ยกเลิกการเสร็จสิ้นรายการ Todo
 function toggleComplete(index) {
 todos[index].completed = !todos[index].completed;
renderTodoList();
 }
// แสดงรายการ Todo บนหน้าเว็บ
function renderTodoList() {
console.log(todos);
todoList.innerHTML = "";
for (let i = 0; i < todos.length; i++) {
const todoItem = todos[i];
const listItem = document.createElement("li");
listItem.textContent = todoItem.text;
if (todoItem.completed) {
listItem.classList.add("completed");
}

// สร้างปุ่มลบในรายการที่เพิ่ม
const deleteButton = document.createElement("button");
deleteButton.textContent = "ลบ";
deleteButton.addEventListener("click", () => deleteTodo(i));
// สร้างปุ่มเสร็จในรายการที่เพิ่ม แล้วแสดงยกเลิกเมื่อกด
const completeButton = document.createElement("button");
completeButton.textContent = todoItem.completed ? "ยกเลิก" : "เสร็จ";
completeButton.addEventListener("click", () => toggleComplete(i));
listItem.appendChild(completeButton);
listItem.appendChild(deleteButton);
todoList.appendChild(listItem);
}
}
// การกดปุ่ม "เพิ่ม"
addButton.addEventListener("click", addTodo);
// การกด Enter ใน input
todoInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
addTodo();
}
});

// แสดงรายการ Todo คร้ังแรก
renderTodoList();
});