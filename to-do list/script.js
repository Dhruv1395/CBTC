

window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem('todos')) || [];
  const addTodoForm = document.getElementById("addTodoForm");
  addTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let todoText = document.getElementById("todoText").value;
    let warn = document.getElementById("warn");
    if (todoText === "") {
      warn.innerHTML = "⚠️ Please enter your task first!";
      warn.style.color = "#dc3545";

      return false;
    }
    else {
      warn.innerHTML = "Task added successfully 👍";
      warn.style.color = "green";

    }
    const todo = {
      content: e.target.elements.entry.value,
      creatat: new Date().getMinutes(),
      taskdone: "none"
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    e.target.reset();
    display();
  })
  display();

  let day = document.getElementById("day");
  let mnth = document.getElementById("mnth");
  let year = document.getElementById("year");
  const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let ctime = new Date();
  day.innerHTML = ctime.getDate();
  mnth.innerHTML = month[ctime.getMonth()];
  year.innerHTML = ctime.getFullYear();
})
function display() {
  const list = document.getElementById("todoUl");
  list.innerHTML = '';

  todos.forEach((todo, index) => {
    const item = document.createElement('li');
    const input = document.createElement('input');
    const done = document.createElement('button')
    const edit = document.createElement('button');
    const del = document.createElement('button');

    item.classList.add("shadow");

    input.setAttribute('type', 'text');
    input.setAttribute('value', todo.content);
    input.setAttribute('readonly', true);

    done.classList.add("done-botton");
    done.innerHTML = '<i class="fa-solid fa-check"></i>';
    if (todo.taskdone === "line-through") {
      input.style.textDecoration = "line-through";
      done.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';

    }

    done.addEventListener("click", () => {
      if (todo.taskdone === "line-through") {
        input.style.textDecoration = "none";
        todo.taskdone = "none";
        done.innerHTML = '<i class="fa-solid fa-check"></i>';


      } else if (todo.taskdone === "none") {
        input.style.textDecoration = "line-through";
        todo.taskdone = "line-through";
        done.innerHTML = '<i class="fa-solid fa-rotate-right"></i>';
        let donetask = JSON.parse(localStorage.getItem('done')) || [];

       
        donetask.push(todo);

        // Save the updated 'done' array back to local storage
        localStorage.setItem('done', JSON.stringify(donetask));

      }
      localStorage.setItem('todos', JSON.stringify(todos));

    });

    del.classList.add("delete-botton");
    del.innerHTML = '<i class="fa-solid fa-trash"></i>';
    del.addEventListener('click', () => {
      deleteTodo(index);
      display();
    });
    edit.classList.add("edit-botton");
    edit.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
    edit.addEventListener("click", () => {
      input.removeAttribute('readonly');
      input.focus();
      input.style.borderBottom = "2px solid black";
      input.addEventListener("blur", (e) => {
        input.setAttribute('readonly', true);
        todo.content = e.target.value;
        input.style.borderBottom = "none";
        localStorage.setItem('todos', JSON.stringify(todos));

      })

    })
    item.appendChild(input);
    item.appendChild(done);
    item.appendChild(edit);
    item.appendChild(del);
    list.appendChild(item);
  });
  localStorage.setItem('todos', JSON.stringify(todos));

}
function deleteTodo(index) {
  todos.splice(index, 1);
}

display();

//completed task
function complete() {
  document.getElementById("h3").innerHTML= '<i class="fa-solid fa-hand-point-right"></i>'+" "+"Your done task list";
  const doneData = JSON.parse(localStorage.getItem("done")) || [];
  const list = document.getElementById("todoUl");
  list.innerHTML = '';
  doneData.forEach((todo, index) => {
    const item = document.createElement('li');
    const span = document.createElement('span');
    const del = document.createElement('button');
    item.classList.add("shadow");

    span.textContent = todo.content;
   
    item.appendChild(span);
    list.appendChild(item);
  })
}
function active(){
  document.getElementById("h3").innerHTML= '<i class="fa-solid fa-hand-point-right"></i>'+" "+"Your list";

  display();
}
