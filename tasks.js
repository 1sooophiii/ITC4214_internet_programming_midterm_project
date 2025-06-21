const submitButton = document.querySelector("#taskSubmit");
const nameInput = document.querySelector("#taskName");
const dateInput = document.querySelector("#taskDate");
const descriptionInput = document.querySelector("#taskDescription");

const taskTable = document.querySelector("#taskTable");
const totalEl = document.querySelector("#summary-total");
const pendingEl = document.querySelector("#summary-pending");
const completedEl = document.querySelector("#summary-completed");

const filterSelect = document.querySelector("#filterStatus");
const sortSelect = document.querySelector("#sortTasks");

// Edit modal elements
const editModal = document.querySelector("#editModal");
const editName = document.querySelector("#editName");
const editDate = document.querySelector("#editDate");
const editDesc = document.querySelector("#editDesc");
const cancelEdit = document.querySelector("#cancelEdit");
const saveEdit = document.querySelector("#saveEdit");

//let is used because the value will be updated
let editingIndex = null;
// if tasks are not null, set the localstorage item, else empty array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// append tasks content to a new array
let filteredTasks = [...tasks];

// Initial Load
window.addEventListener("DOMContentLoaded", () => {
    renderTasks();
    updateSummary();
});

function saveTasks() {
    // save task object value as string to local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// update task metrics
function updateSummary() {
    totalEl.textContent = tasks.length;
    // filters the tasks array and returns a new array with items that have status pending
    pendingEl.textContent = tasks.filter((t) => t.status === "Pending").length;
    completedEl.textContent = tasks.filter(
        (t) => t.status === "Completed"
    ).length;
}

function renderTasks() {
    // create a new html set of elements
    taskTable.innerHTML = "";

    //for each new task add a row to the table
    filteredTasks.forEach((task, index) => {
        const row = document.createElement("tr");
        // here we need string literals (`) because we need to inject dynamic variables
        row.innerHTML = `
            <td class="p-3 border-b border-r box-border border-gray-300 dark:border-gray-700 max-w-[200px] overflow-x-auto whitespace-nowrap align-middle px-4">${
                task.name
            }</td>
            <td class="p-3 border-b border-r box-border border-gray-300 dark:border-gray-700 max-w-[200px] overflow-x-auto whitespace-nowrap align-middle px-4">${
                task.description
            }</td>
            <td class="p-3 border-b border-r box-border border-gray-300 dark:border-gray-700 max-w-[200px] overflow-x-auto whitespace-nowrap align-middle px-4">${
                task.date
            }</td>
            <td class="p-3 border-b border-r box-border border-gray-300 dark:border-gray-700 max-w-[200px] overflow-x-auto whitespace-nowrap align-middle px-4">
                <select data-index="${index}" class="status-select w-full rounded dark:text-white dark:bg-teal-700">
                    <option ${
                        task.status === "Pending" ? "selected" : ""
                    }>Pending</option>
                    <option ${
                        task.status === "Completed" ? "selected" : ""
                    }>Completed</option>
                </select>
            </td>
            <td class="p-3 border-b border-r box-border border-gray-300 dark:border-gray-700 text-center max-w-[200px] overflow-x-auto whitespace-nowrap align-middle px-4">
                <button class="edit-btn text-blue-500" data-index="${index}">Edit</button> |
                <button class="delete-btn text-red-500" data-index="${index}">Delete</button>
            </td>
        `;
        taskTable.appendChild(row);
    });

    feather.replace();
    bindEventListeners();
}

//when task is submitted create a new task object
// add it to the list
// update local storage
//
submitButton.addEventListener("click", () => {
    const newTask = {
        //trim: remove empty spaces
        name: nameInput.value.trim(),
        date: dateInput.value,
        description: descriptionInput.value.trim(),
        status: "Pending",
    };

    tasks.push(newTask);
    saveTasks();
    applyFilterSort();
    updateSummary();

    //reset form
    nameInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
});

// Status change, edit, delete listeners
function bindEventListeners() {
    document.querySelectorAll(".status-select").forEach((select) => {
        // add an event listener on status select , on change of value
        select.addEventListener("change", (e) => {
            const index = e.target.getAttribute("data-index");
            tasks[index].status = e.target.value;
            saveTasks();
            applyFilterSort();
            updateSummary();
        });
    });

    document.querySelectorAll(".edit-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            editingIndex = e.target.dataset.index;
            const task = tasks[editingIndex];
            editName.value = task.name;
            editDate.value = task.date;
            editDesc.value = task.description;
            editModal.classList.remove("hidden");
            editModal.classList.add("flex");
        });
    });

    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const index = e.target.dataset.index;
            if (confirm("Delete this task?")) {
                tasks.splice(index, 1);
                saveTasks();
                applyFilterSort();
                updateSummary();
            }
        });
    });
}

// Modal events
cancelEdit.addEventListener("click", () => {
    editModal.classList.add("hidden");
});

saveEdit.addEventListener("click", () => {
    if (!editName.value.trim() || !editDate.value || !editDesc.value.trim()) {
        alert("Please fill all fields.");
        return;
    }

    tasks[editingIndex] = {
        ...tasks[editingIndex],
        name: editName.value.trim(),
        date: editDate.value,
        description: editDesc.value.trim(),
    };

    saveTasks();
    applyFilterSort();
    updateSummary();
    editModal.classList.add("hidden");
});

// Filter + Sort handling
filterSelect.addEventListener("change", applyFilterSort);
sortSelect.addEventListener("change", applyFilterSort);

function applyFilterSort() {
    const filterValue = filterSelect.value;
    const sortValue = sortSelect.value;

    filteredTasks = tasks.filter((task) => {
        // if filterValue is all return all items in the array tasks
        if (filterValue === "All") return true;
        // return only the items of the array that match the status value
        return task.status === filterValue;
    });

    filteredTasks.sort((a, b) => {
        if (sortValue === "date") {
            return new Date(a.date) - new Date(b.date);
        } else if (sortValue === "name") {
            return a.name.localeCompare(b.name);
        } else if (sortValue === "status") {
            return a.status.localeCompare(b.status);
        }
        return 0;
    });

    renderTasks();
}
