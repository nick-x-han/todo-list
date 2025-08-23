

const todoManager = (function() {
    const createButton = document.querySelector("#new-todo");
    const confirmButton = document.querySelector("#confirm-button");

    function receiveEvent(button) {
        console.log("DHS");
    }
    return {receiveEvent};
})();


//so i think there should be some dom module that imports whatever stores the projects and todos. whenever buttons are pressed, it will use the modal module to call functions in the storage module, which will modify the storage. then, it will call the DOM functions to re-render the document

//todo < project < project manager < modal < dom manager. dom manager has functions like a createProject that does the dom work while also modifying project manager.dom manager takesthe role of this curent filemaybe