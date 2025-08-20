class ToDo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    completed = false;

    static priorityLevels = ['Low', 'Medium', 'High'];

    getPriorityLevels() {
        return ;
    }

    setPriorityLevels(p) {
        if (priorityLevels.includes(p)) {
            this.priority = p;
        }
        else {
            throw Error("Invalid priority level.");
        }
    }

    get completed() {
        return "yo";
    }

    set completed(c) {
        this.completed = c;
    }

}



export {ToDo};
//idea: marking as completed and deleting as buttons, as opposed to only the former.