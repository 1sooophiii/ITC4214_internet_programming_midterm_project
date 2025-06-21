//when content is loaded get tasks if any and display them
document.addEventListener("DOMContentLoaded", () => {
    const taskList = document.querySelector("#taskList");
    // Parse the stringified localstorage object value into a JSON Object
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const upcomingTasks = tasks.filter((task) => task.status === "Pending");

    if (tasks.length === 0) {
        taskList.innerHTML = "<li>No tasks found.</li>";
        return;
    }

    //create html li elements for all upcoming tasks and append
    upcomingTasks.forEach((task) => {
        const li = document.createElement("li");
        li.className = `
        bg-gray-100 dark:bg-teal-800
        p-4 rounded shadow overflow-x-auto
        whitespace-nowrap sm:whitespace-normal
        max-w-full
        `;
        li.innerHTML = `
        <div class="font-semibold break-words">${task.name}</div>
        <div class="text-sm text-gray-500 dark:text-gray-300 break-words">${
            task.date
        }</div>
        <div class="text-sm break-words max-w-full overflow-hidden">${
            task.description
        }</div>
        <div class="text-xs italic mt-1 text-${
            task.status === "Completed" ? "green" : "yellow"
        }-500">
        ${task.status}
        </div>
        `;

        taskList.appendChild(li);
    });
});
