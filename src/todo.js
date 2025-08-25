class ToDo {
    constructor(title, description = "", dueDate = new Date(), priority = "Low") {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        ToDo.allTasks.push(this);
    }

    #completed = false;

    static priorityLevels = ['Low', 'Medium', 'High'];
    //store all tasks ever made for sorting?
    static allTasks = []

    static getTodoById(id) {
        return ToDo.allTasks.findIndex(todo => todo.id === id);
    }

    //the modal will be auto-filled with the current info
    editInfo(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        if (ToDo.priorityLevels.includes(priority)) {
            this.priority = priority;
        }
        else {
            throw Error("Invalid priority level.");
        }
    }

    getCompleted() {
        return this.#completed;
    }

    toggleCompleted() {
        this.#completed = !this.#completed;
        return this.#completed;
    }    
}



export {ToDo};
//idea: marking as completed and deleting as buttons, as opposed to only the former.