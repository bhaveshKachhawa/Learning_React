const input = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask(input.value);
    input.value = "";
  }
});

function addTask(text) {
  if (text.trim() === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.className = "delete-btn";
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}
