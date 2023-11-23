const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("task-list");

/**
 * Adiciona uma nova tarefa à lista.
 * 
 * @function
 * @name addTaskToList
 * @returns {void}
 */
const addTaskToList = () => {
  const taskText = inputBox.value.trim();

  if (taskText === "") {
    alert("You must write something!");
  } else {
    const listItem = createListItem(taskText);
    listContainer.appendChild(listItem);
    addEventListenersToDeleteButtons();
  }

  inputBox.value = "";
  saveDataToLocalStorage();
};

/**
 * Cria um novo elemento de lista (li) com o texto fornecido.
 * 
 * @function
 * @name createListItem
 * @param {string} text - O texto da tarefa.
 * @returns {HTMLLIElement} - O elemento de lista criado.
 */
const createListItem = (text) => {
  const listItem = document.createElement("li");
  listItem.innerHTML = text;

  const deleteButton = document.createElement("span");
  deleteButton.innerHTML = "DELETE";
  deleteButton.addEventListener("click", function () {
    removeTask(listItem);
    saveDataToLocalStorage();
    addEventListenersToDeleteButtons();
  });

  listItem.appendChild(deleteButton);

  listItem.addEventListener("click", function () {
    toggleTaskCompletion(listItem);
    saveDataToLocalStorage();
  });

  return listItem;
};

/**
 * Alterna a conclusão de uma tarefa entre marcada e desmarcada.
 * 
 * @function
 * @name toggleTaskCompletion
 * @param {HTMLLIElement} taskElement - O elemento da tarefa.
 * @returns {void}
 */
const toggleTaskCompletion = (taskElement) => {
  taskElement.classList.toggle("checked");
  saveDataToLocalStorage();
};

/**
 * Remove uma tarefa da lista.
 * 
 * @function
 * @name removeTask
 * @param {HTMLLIElement} taskElement - O elemento da tarefa.
 * @returns {void}
 */
const removeTask = (taskElement) => {
  taskElement.remove();
};

/**
 * Salva o conteúdo da lista de tarefas no armazenamento local.
 * 
 * @function
 * @name saveDataToLocalStorage
 * @returns {void}
 */
const saveDataToLocalStorage = () => {
  localStorage.setItem("taskData", listContainer.innerHTML);
};

/**
 * Exibe as tarefas salvas do armazenamento local.
 * 
 * @function
 * @name showSavedTasks
 * @returns {void}
 */
const showSavedTasks = () => {
  const savedData = localStorage.getItem("taskData");

  if (savedData) {
    listContainer.innerHTML = savedData;
    addEventListenersToDeleteButtons();
    addEventListenersToTasks();
  }
};

/**
 * Adiciona ouvintes de eventos aos botões "DELETE" das tarefas.
 * 
 * @function
 * @name addEventListenersToDeleteButtons
 * @returns {void}
 */
const addEventListenersToDeleteButtons = () => {
  const deleteButtons = document.querySelectorAll("#task-list span");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      removeTask(button.parentElement);
      saveDataToLocalStorage();
      addEventListenersToDeleteButtons(); 
    });
  });
};

/**
 * Adiciona ouvintes de eventos às tarefas na lista.
 * 
 * @function
 * @name addEventListenersToTasks
 * @returns {void}
 */
const addEventListenersToTasks = () => {
  const tasks = document.querySelectorAll("#task-list li");
  tasks.forEach((task) => {
    task.addEventListener("click", function () {
      toggleTaskCompletion(task);
      saveDataToLocalStorage();
    });
  });
};

showSavedTasks();
