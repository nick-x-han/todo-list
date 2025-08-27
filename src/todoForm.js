import editIcon from "./images/pencil.svg"
import deleteIcon from "./images/delete.svg"
import checkIcon from "./images/check-bold.svg"
import cancelIcon from "./images/cancel.svg"

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

    description = document.createElement("textarea");

    constructor(todo) {
        this.todo = todo;
        this.initiateTodoHTML(todo)
        this.dom = this.todoDiv;
        this.dom.parent = this;
        this.toggleReadStatus();
        this.regenerateTodoHTML(todo);
        this.changeButtonEditState();
    }

    toggleEditForm() {
        this.toggleReadStatus();
        this.changeButtonEditState();
        this.toggleOpenDescription(this.todoDiv);
    }

    finalizeEdits(event) {
        //confirm the edit
        if (event.target === this.editButton) {
            this.todo.editInfo(this.getFormValues());
        }
        this.regenerateTodoHTML();
        this.toggleEditForm();
    }

    changeButtonEditState() {
        //when used in constructor, this bool will be false b/c purpose wasn't set yet
        let previouslyClosedState = this.editButton.dataset.purpose === "editTodo";
        if (previouslyClosedState) {
            this.editButton.dataset.purpose = "exitEditTodo";
            this.deleteButton.dataset.purpose = "exitEditTodo";
            this.editButton.style.backgroundImage = `url(${checkIcon})`;
            this.deleteButton.style.backgroundImage = `url(${cancelIcon})`;
        }
        else {
            this.editButton.dataset.purpose = "editTodo";
            this.deleteButton.dataset.purpose = "deleteTodo";
            this.editButton.style.backgroundImage = `url(${editIcon})`;
            this.deleteButton.style.backgroundImage = `url(${deleteIcon})`;
        }

    }

    toggleReadStatus() {
        let currentReadStatus = this.dueDate.readOnly;
        this.dueDate.readOnly = !currentReadStatus;
        this.description.readOnly = !currentReadStatus;
        this.titleDisplay.readOnly = !currentReadStatus;
        this.priorityDisplay.disabled = !currentReadStatus;
        this.dueDate.classList.toggle("todo-date");
        this.titleDisplay.classList.toggle("todo-title");
        this.description.classList.toggle("todo-description");
        this.completedCheckbox.classList.toggle("todo-completed");
        this.priorityDisplay.classList.toggle("todo-priority");
    }

    toggleOpenDescription(target) {
        if (target === this.todoDiv || target === this.todoForm | target.readOnly === true) {
            if (this.description.parentElement === this.todoDiv) {
                this.description.remove();
                this.todoForm.classList.remove("description-open");
            }
            else {
                this.todoDiv.append(this.description);
                this.todoForm.classList.add("description-open");
            }
        }
    }

    initiateTodoHTML(todo) {
        this.completedCheckbox.type = "checkbox";

        this.editButton.classList.add("small-button");
        this.deleteButton.classList.add("small-button");
        this.editButton.type = "button";
        this.deleteButton.type = "button";
        this.buttonsDiv.classList.add("todo-buttons-container");

        this.todoForm.classList.add("todo");
        this.todoDiv.dataset.id = todo.id;



        this.dueDate.type = "date";

        this.titleDisplay.name = "todoName";

        this.todoDiv.addEventListener("click", e => this.toggleOpenDescription(e.target));

        const options = [
            { value: 'low', text: 'Low' },
            { value: 'medium', text: 'Medium' },
            { value: 'high', text: 'High' }
        ];
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            this.priorityDisplay.appendChild(option);
        });

        this.todoForm.append(this.completedCheckbox);
        this.todoForm.append(this.priorityDisplay);
        this.todoForm.append(this.titleDisplay);
        this.todoForm.append(this.dueDate);
        this.buttonsDiv.append(this.editButton);
        this.buttonsDiv.append(this.deleteButton);
        this.todoForm.append(this.buttonsDiv);
        this.todoDiv.appendChild(this.todoForm);
    }

    regenerateTodoHTML() {
        const options = Array.from(this.priorityDisplay.children);
        options.forEach(opt => {

            if (opt.value === this.todo.priority) {
                opt.selected = true;
                this.priorityDisplay.classList.add(opt.value);
                this.todoForm.classList.add(opt.value)
            }
            else {
                this.priorityDisplay.classList.remove(opt.value);
                this.todoForm.classList.remove(opt.value)
            }
        });

        this.dueDate.value = this.todo.dueDate;
        this.titleDisplay.value = this.todo.title;
        this.description.textContent = this.todo.description;
        this.completedCheckbox.checked = this.todo.getCompleted();
    }

    getFormValues() {
        let title = this.titleDisplay.value;
        let description = this.description.textContent;
        let dueDate = this.dueDate.value;
        let priority = this.priorityDisplay.value;

        return { title, description, dueDate, priority }
    }

}