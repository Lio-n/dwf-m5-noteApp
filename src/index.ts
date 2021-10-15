import "./components/text-style/index";
import "./components/todo-item/index";
import { initHomepage } from "./page/home/index";
import { state } from "./state";
(function main() {
  // Initializar
  state.init();
  initHomepage(document.querySelector(".root"));
})();
