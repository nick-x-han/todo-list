import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"

export default class TodoForm {
    todoDiv = document.createElement("div");
    todoForm = document.createElement("form");
    completedCheckbox = document.createElement("input");
    priorityDisplay = document.createElement("select");
    dueDate = document.createElement("input");
    titleDisplay = document.createElement("input");
    editButton = document.createElement("button");
    deleteButton = document.createElement("button");
    buttonsDiv = document.createElement("div");

    editState = false;

    description = document.createElement("textarea");

    constructor(todo) {
        this.todo = todo;
        this.initiateTodoHTML(todo)
        this.dom = this.todoDiv;
        this.dom.parent = this;
        this.toggleReadOnly();
    }

    toggleReadOnly() {
        this.editState = !this.editState;
        this.dueDate.readOnly = this.editState;
        this.description.readOnly = this.editState;
        this.titleDisplay.readOnly = this.editState;
        this.priorityDisplay.disabled = this.editState;
        this.dueDate.classList.toggle("todo-date");
        this.titleDisplay.classList.toggle("todo-title");
        this.description.classList.toggle("todo-description");
        this.completedCheckbox.classList.toggle("todo-completed");
        this.priorityDisplay.classList.toggle("todo-priority");
    }

    initiateTodoHTML(todo) {
        this.completedCheckbox.type = "checkbox";
        this.editButton.dataset.purpose = "editTodo";
        this.deleteButton.dataset.purpose = "deleteTodo";
        this.editButton.style.backgroundImage = `url(${editIcon})`;
        this.deleteButton.style.backgroundImage = `url(${deleteIcon})`;
        this.editButton.classList.add("small-button");
        this.deleteButton.classList.add("small-button");
        this.editButton.type = "button";
        this.deleteButton.type = "button";

        this.todoForm.classList.add("todo");
        this.todoDiv.dataset.id = todo.id;



        this.dueDate.type = "date";

        this.titleDisplay.name = "todoName";

        this.todoDiv.addEventListener("click", (e) => {
            if (e.target === this.todoDiv || e.target === this.todoForm || e.target.readOnly === true) {
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
        this.todoForm.append(this.titleDisplay);
        this.todoForm.append(this.dueDate);
        this.buttonsDiv.append(this.editButton);
        this.buttonsDiv.append(this.deleteButton);
        this.todoForm.append(this.buttonsDiv);
        this.todoDiv.appendChild(this.todoForm);

        this.regenerateTodoHTML(todo);
    }

    regenerateTodoHTML() {
        const options = [
            { value: 'low', text: 'Low' },
            { value: 'medium', text: 'Medium' },
            { value: 'high', text: 'High' }
        ];
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            if (opt.value === this.todo.priority) {
                option.selected = true;
                this.priorityDisplay.classList.add(opt.value);
                this.todoForm.classList.add(opt.value)
            }
            else {
                this.priorityDisplay.classList.remove(opt.value);
                this.todoForm.classList.remove(opt.value)
            }
            this.priorityDisplay.appendChild(option);
        });

        this.dueDate.value = this.todo.dueDate;
        this.titleDisplay.value = this.todo.title;
        this.description.textContent = this.todo.description;
        this.completedCheckbox.checked = this.todo.getCompleted();
    }
}