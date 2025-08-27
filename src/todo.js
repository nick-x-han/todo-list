class ToDo {
    constructor(title, description = "", dueDate = new Date(), priority = "Low") {
        this.id = crypto.randomUUID();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        ToDo.allTodos.push(this);
    }

    #completed = false;

    static priorityLevels = ['Low', 'Medium', 'High'];
    //store all tasks ever made for sorting?
    static allTodos = []

    static getTodoById(id) {
        return ToDo.allTodos.find(todo => todo.id === id);
    }

    editInfo(info) {
        this.title = info.title;
        this.description = info.description;
        this.dueDate = info.dueDate;
        this.priority = info.priority;
    }

    getInfo() {
        return { title: this.title, description: this.description, dueDate: this.dueDate, priority: this.priority }; 
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