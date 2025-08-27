class ToDo {
    constructor(title, description = "", dueDate = new Date(), priority = "Low", completed=false) {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.#completed = completed;
        ToDo.allTodos.push(this);
    }

    #completed = false;

    static priorityLevels = ['Low', 'Medium', 'High'];
    //store all tasks ever made for sorting?
    static allTodos = []

    static getTodoById(id) {
        return ToDo.allTodos.find(todo => todo.id === id);
    }

    static deleteTodoById(id) {
        let index = ToDo.allTodos.findIndex(todo => id === todo.id);
        ToDo.allTodos.splice(index, 1);
    }

    editInfo(info) {
        this.title = info.title;
        this.description = info.description;
        this.dueDate = info.dueDate;
        this.priority = info.priority;
    }

    getInfo() {
        return { title: this.title, description: this.description, dueDate: this.dueDate, priority: this.priority, completed: this.#completed }; 
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