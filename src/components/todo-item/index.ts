const trashIcon = require("url:../../assets/image/trash-icon.svg");

customElements.define(
  "todo-item",
  class extends HTMLElement {
    shadow: ShadowRoot;
    title: string;
    checked: boolean;

    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
      this.title = this.getAttribute("title") || "";
      this.id = this.getAttribute("id");
      this.checked = this.hasAttribute("checked");

      const style = document.createElement("style");
      style.innerHTML = `*{margin:0;padding:0;box-sizing: border-box;}
      .root {
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        word-break: break-word;
        padding: 22px 13px;
        width: 302px;
        min-height: 120px;
        background-color: #fff599;
        font-size: 18px;
      }
      .root > div{
        padding-left: 1rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 35px;
      }
      h4{
        font-weight: 400;
      }
      .border{
        border: solid 2px;
      }
      .title.checked {
        text-decoration: line-through;
      }
      .trash{
        cursor: pointer;
        display: none;
      }
      .open{
        display: initial;
      }
      `;
      this.shadow.appendChild(style);

      this.render();
    }
    addListeners() {
      const chEl = this.shadow.querySelector(".checkbox-input");
      // Click on checkbox
      chEl.addEventListener("click", (e) => {
        const target = e.target as any;
        // Custom event, that sends the id and the checked value of the task item
        const event = new CustomEvent("change", {
          detail: {
            id: this.id,
            value: target.checked,
          },
        });
        this.dispatchEvent(event);
      });

      const trashEl = this.shadow.querySelector(".trash");
      // Click on trash image event
      trashEl.addEventListener("click", () => {
        // Custom event, that sends the id of the task item
        const deleteEvent = new CustomEvent("delete", {
          detail: {
            id: this.id,
          },
        });

        // Dispatch the event
        this.dispatchEvent(deleteEvent);
      });

      const rootEl = this.shadow.querySelector(".root");
      // Add the icon Trash
      let boolean = false;
      this.shadow.querySelector(".root").addEventListener("click", () => {
        if (!boolean) {
          trashEl.classList.add("open");
          console.log("rootEl", rootEl);
          rootEl.classList.add("border");
          boolean = true;
        } else {
          trashEl.classList.remove("open");
          rootEl.classList.remove("border");
          boolean = false;
        }
      });
    }
    render() {
      const div = document.createElement("div");
      div.innerHTML = `
        <div class="root">
            <h4 class="title ${this.checked ? "checked" : ""}">${
        this.title
      }</h4>
            <div>
                <input class="checkbox-input" type="checkbox" ${
                  this.checked ? "checked" : ""
                }>
                <img class="trash" src="${trashIcon}"/>
            </div>
        </div>
    `;
      this.shadow.appendChild(div);
      this.addListeners();
    }
  }
);
