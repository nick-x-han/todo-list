import { ToDo } from "./todo.js";

export default class TodoForm {
    todoDiv = document.createElement("div");
    todoForm = document.createElement("form");
    completedCheckbox = document.createElement("input");
    priorityDisplay = document.createElement("select");
    dueDate = document.createElement("input");
    titleP = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");
    buttonsDiv = document.createElement("div");

    description = document.createElement("textarea");

    constructor(todo) {
        this.generateTodoHTML(todo)
        this.dom = todoDiv;
        this.dom.object = this;
    }

    generateTodoHTML(todo) {
        this.completedCheckbox.type = "checkbox";
        this.editButton.dataset.purpose = "editTodo";
        this.deleteButton.dataset.purpose = "deleteTodo";
        this.editButton.style.backgroundImage = `url(${editIcon})`;
        this.editButton.classList.add("small-button");
        this.deleteButton.style.backgroundImage = `url(${deleteIcon})`;
        this.deleteButton.classList.add("small-button");
        this.editButton.type = "button";
        this.deleteButton.type = "button";

        this.todoForm.classList.add("todo");
        this.todoForm.classList.add(todo.priority.toLowerCase());
        this.todoForm.dataset.id = todo.id;

        const options = [
            { value: 'low', text: 'Low' },
            { value: 'medium', text: 'Medium' },
            { value: 'high', text: 'High' }
        ];
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            if (opt.value === todo.priority) {
                option.selected = true;
            }
            this.priorityDisplay.appendChild(option);
        });

        

        this.dueDate.type = "date";
        this.dueDate.value = todo.dueDate;
        this.dueDate.disabled = true;

        this.titleP.name = "todoName";
        this.titleP.value = todo.title;

        this.description.textContent = todo.description;
        this.todoDiv.addEventListener("click", (e) => {
            if (e.target === this.todoDiv || e.target === this.todoForm || e.target.disabled === true) {
                if (this.description.parentElement === this.todoDiv) {
                    this.description.remove();
                }
                else {
                    this.todoDiv.append(this.description);
                }
            }
        })

        this.todoForm.append(this.completedCheckbox);
        this.todoForm.append(this.priorityDisplay);
        this.todoForm.append(this.dueDate);
        this.todoForm.append(this.titleP);
        this.buttonsDiv.append(this.editButton);
        this.buttonsDiv.append(this.deleteButton);
        this.todoForm.append(this.buttonsDiv);
        this.todoDiv.appendChild(this.todoForm);
    }
}