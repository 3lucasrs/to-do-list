const text = document.querySelector("#input");
const addBtn = document.querySelector("#addButon");
const delBtn = document.querySelector("#delBtn");
const ul = document.querySelector("ul");

let listDatabase = [];

addBtn.addEventListener("click", () => {
  if (text.value != "") {
    setListDatabase();
  }
});

text.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    setListDatabase();
  }
});

const setListDatabase = () => {
  if (listDatabase.length >= 10) {
    alert("LIMITE");
    return;
  }

  listDatabase.push({ task: text.value, status: "" });
  updateDatabase();
  text.value = "";
};

const updateDatabase = () => {
  localStorage.setItem("todolist", JSON.stringify(listDatabase));
  loadTasks();
};

const loadTasks = () => {
  ul.innerHTML = "";
  listDatabase = JSON.parse(localStorage.getItem("todolist")) ?? [];
  listDatabase.forEach((task, i) => {
    addToView(task.task, task.status, i);
  });
};

const addToView = (task, status, i) => {
  const li = document.createElement("li");
  li.innerHTML = `<div class="divLi">
            <span class="liText" data-si=${i}>${task}</span>
            <div class="buttonslist">
             <button id="delBtn" data-i=${i} onClick='removeItem(${i})'>X</button>
            </div>
          </div>`;
  ul.appendChild(li);
};

const removeItem = (i) => {
  listDatabase.splice(i, 1);
  updateDatabase();
};

loadTasks();
