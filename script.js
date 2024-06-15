// date
function currentTime() {
  const currentDate = new Date();

  const formattedDate = currentDate.toDateString();
  const date = document.querySelector(".date");
  date.innerHTML = formattedDate;

  return currentDate.getTime();
}

currentTime();
setInterval(currentTime, 1000);

// to do list
const items = [
  {
    task: "Membuat To Do List",
    done: true,
    priority: "Low",
    deadline: "Sat Jun 17 2024",
  },
  {
    task: "Membuat MyMusic Wbe",
    done: false,
    priority: "Medium",
    deadline: "Sat Jun 15 2024",
  },
  {
    task: "Konfigurasi ke Database",
    done: true,
    priority: "Medium",
    deadline: "Sat Jun 14 2024",
  },
];

// Display Task
function display() {
  const toDo = document.querySelector("#to-do-items");
  const done = document.querySelector("#done-items");
  const overdue = document.querySelector("#overdue-items");

  const { textToDo, textDone, textOverdue } = processItems();

  toDo.innerHTML = textToDo;
  done.innerHTML = textDone;
  overdue.innerHTML = textOverdue;

  doneTask();
}

display();

function processItems() {
  let textToDo = "";
  let textDone = "";
  let textOverdue = "";

  items.forEach((item, index) => {
    if (item.done) {
      if (convertDeadlineToTimestamp(item.deadline) > currentTime()) {
        textToDo += `<li class="item-list">${item.task} (${item.priority}) - Date ${item.deadline} <input type="checkbox" data-index="${index}"/></li>`;
      } else {
        textOverdue += `<li class="item-list red-bg">${item.task} (${item.priority}) - Date ${item.deadline} <input type="checkbox" data-index="${index}"/></li>`;
      }
    } else {
      textDone += `<li class="item-done-list line-through item-list">${item.task} (${item.priority}) - Date ${item.deadline}<input type="checkbox" data-index="${index}" checked/></li>`;
    }
  });

  return { textToDo, textDone, textOverdue };
}

function convertDeadlineToTimestamp(deadlineStr) {
  const deadlineDate = new Date(deadlineStr);
  return deadlineDate.getTime();
}

// Done Task
function doneTask() {
  document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener("click", function () {
      const dataIndex = parseInt(this.getAttribute("data-index"));
      items[dataIndex].done = !items[dataIndex].done;
      display();
    });
  });
}

// Add Task
document
  .querySelector("button[class='submit']")
  .addEventListener("click", function (e) {
    e.preventDefault();
    add();
  });

function add() {
  const keyword = document.querySelector("input[name='keyword']");
  const priority = document.getElementById("priority");
  const deadline = document.querySelector("input[type='date']");

  const deadlineDate = new Date(deadline.value);

  if (keyword.value && deadline.value) {
    items.push({
      task: `${keyword.value}`,
      done: true,
      priority: `${priority.value}`,
      deadline: `${deadlineDate.toDateString()}`,
    });

    keyword.value = "";
  } else {
    alert("Masukkan Task lengkap terlebih dahulu");
    return;
  }

  display();
}

// delete All Task
document.querySelector(".delete").addEventListener("click", () => {
  items.splice(0);
  display();
});
