import "./styles.css";

import Project from "./project.js"
import domManager from "./dom.js"
// import odinImage from "./odin.png";

let todo_list = (function () {
    domManager.initiate();
    //so this file should keep the actual data, while the domManager calls functions from here to modify projects, I guess
    //actually nvm, i think it's just better that the dom calls whoever is managing the projects
    //this file, as in restaurant, will on page load render all the saved projects and tasks. 
    //this file should also not contain the projects. it will instead act as an interface(?) for the actual project store
})();

