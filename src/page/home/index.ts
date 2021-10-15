import { any } from "core-js/fn/promise";
import { state } from "../../state";

export const initHomepage = (containerEl) => {
  const div = document.createElement("div");
  // Gets the tasks enabled
  const tasks = state.getEnabledTasks();

  div.innerHTML = `
  <h1>Mis pendientes</h1>
  <form class="form">
      <label class="form__subtitle" for="input">Nuevo pendiente</label>
      <input class="form__input" type="text" id="input" />
      <button class="form__button add-button">Agregar Item</button>
  </form>
  <ul class="lista"></ul>`;

  const listaEl = div.querySelector(".lista");

  const createTasks = (items) => {
    listaEl.innerHTML = "";
    for (const item of items) {
      const todoItemEl = document.createElement("todo-item");
      todoItemEl.setAttribute("id", item.id);
      todoItemEl.setAttribute("title", item.title);
      if (item.completed) {
        todoItemEl.setAttribute("checked", "true");
      }

      // Listen the delete event
      todoItemEl.addEventListener("delete", (e: any) => {
        state.deleteTask(e.detail.id);
      });
      todoItemEl.addEventListener("change", (e: any) => {
        state.changeItemState(e.detail.id, e.detail.value);
      });
      listaEl.appendChild(todoItemEl);
    }
  };

  state.subscribe(() => {
    createTasks(state.getEnabledTasks());
  });

  createTasks(tasks);

  const input: any = div.querySelector(".form__input");
  div.querySelector(".add-button").addEventListener("click", (e) => {
    e.preventDefault();
    // If there's an empty string, do nothing
    if (input.value == "") {
      return;
    }
    state.addTasks(Math.random(), input.value);

    // Clear the input field
    input.value = "";
  });
  containerEl.appendChild(div);
};
