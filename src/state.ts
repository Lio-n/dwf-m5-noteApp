export const state = {
  //"Borrar los item puede traer problemas
  //lo mejor es inhabilitarlos"
  data: {
    tasks: [],
  },
  listeners: [],
  // Initializar
  init() {
    // Get the local data
    const localData = JSON.parse(localStorage.getItem("saved-state"));
    // If localdata retuns "null", do nothing
    if (!localData) {
      return;
    } else {
      this.setState(localData);
    }
  },
  // Get the data
  getState() {
    return this.data;
  },
  // Stores the data
  setState(newState) {
    this.data = newState;
    //callback = cb
    for (const cb of this.listeners) {
      cb(newState);
    }
    localStorage.setItem("saved-state", JSON.stringify(newState));
  },
  // Return the Tasks that aren't "Deleted".
  getEnabledTasks() {
    const currentState = this.getState();
    console.log("currentState", currentState);
    return currentState.tasks.filter((t) => !t.deleted);
  },
  // Add the Tasks
  addTasks(id, title) {
    const currentState = this.getState();
    currentState.tasks.push({ id, title, completed: false, deleted: false });
    this.setState(currentState);
  },
  // Delete task
  deleteTask(id) {
    const currentState = this.getState();
    const foundTask = currentState.tasks.find((t) => t.id == id);
    foundTask.deleted = true;

    this.setState(currentState);
  },
  // Change Task status
  changeItemState(id, completed) {
    const currentState = this.getState();
    const found = currentState.tasks.find((t) => t.id == id);
    found.completed = completed;

    this.setState(currentState);
  },

  subscribe(callback: (any) => { any }) {
    this.listeners.push(callback);
  },
};
