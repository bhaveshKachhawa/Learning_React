const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");

input.addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    const task = input.value.trim();
    if (task !== "") {
      addTask(task);
      input.value = "";
    }
  }
});

function addTask(taskText) {
  const li = document.createElement("li");

  const left = document.createElement("div");
  left.className = "left";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = taskText;

  checkbox.addEventListener("change", () => {
    span.classList.toggle("done");
  });

  left.appendChild(checkbox);
  left.appendChild(span);

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.className = "delete-btn";
  deleteBtn.onclick = () => li.remove();

  li.appendChild(left);
  li.appendChild(deleteBtn);
  list.appendChild(li);
}
