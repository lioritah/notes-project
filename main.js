function task() {
  const inputs = document.querySelectorAll(`input`);
  const textArea = document.querySelectorAll(`textarea`);
  return {
    details: textArea[0].value,
    date: inputs[0].value,
    time: inputs[1].value,
  };
}

function getAndSave() {
  const currentTasks = localStorage.getItem(`allTasks`);
  let arr = [];
  const myTask = task();

  if (currentTasks) {
    arr = JSON.parse(currentTasks);
  }
  myTask.id = arr.length.toString();
  arr.push(myTask);
  localStorage.setItem(`allTasks`, JSON.stringify(arr));
  loadItem();
}

function loadItem() {
  const currentTasks = localStorage.getItem(`allTasks`);
  const noteContainer = document.querySelector(`.note-container`);
  if (currentTasks) {
    let tasks = "";
    const arr = JSON.parse(currentTasks);
    for (let i = 0; i < arr.length; i++) {
      tasks += `
        <div id="noteContent" >
        <i id=${i} class="bi bi-x-square-fill"></i>
        <p class="details">${arr[i].details}</p>
        <p class="date">${arr[i].date}</p>
        <p class="time">${arr[i].time}</p>
        </div>`;
    }
    noteContainer.innerHTML = tasks;
  }
}
function clearInput() {
  const inputs = document.querySelectorAll(`input`);
  const textArea = document.querySelector(`textarea`);

  textArea.value = ``;
  inputs[0].value = ``;
  inputs[1].value = ``;
}

function onFormSubmit(event) {
  event.preventDefault();
  getAndSave();
  clearInput();
  removeBtn();
}

function onWindowLoad() {
  loadItem();
  const form = document.querySelector("#form");
  form.onsubmit = onFormSubmit;
  const restBtn = document.querySelector(`#restBtn`);
  restBtn.onclick = clearInput;
  removeBtn();
}

window.onload = onWindowLoad;

function removeBtn() {
  const btnRemove = document.querySelectorAll(`i`);
  for (const removeBtn of btnRemove) {
    removeBtn.onclick = removeNote;
  }
}

function removeNote(event) {
  event.target.parentElement.remove();
  const btnId = event.target.getAttribute(`id`);
  const currentTasks = JSON.parse(localStorage.getItem(`allTasks`));
  let taskToDelete;
  for (let i = 0; i < currentTasks.length; i++) {
    if (currentTasks[i].id === btnId) {
      taskToDelete = i;
    }
  }
  currentTasks.splice(taskToDelete, 1);
  localStorage.setItem(`allTasks`, JSON.stringify(currentTasks));
}
