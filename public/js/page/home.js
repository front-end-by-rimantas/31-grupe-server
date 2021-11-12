import { Form } from "../components/Form.js";
import { Lightbox } from "../components/Lightbox.js";
import { commonLogic } from "../components/commonLogicForProtectedRoutes.js";

commonLogic();

const newTaskBtnDOM = document.getElementById('new_task_button');
const allUpdateBtnDOM = document.querySelectorAll('.table button[data-action="update"]');
const taskForm = new Form('#new_task_lightbox form');
const newTaskLightobx = new Lightbox('#new_task_lightbox');

newTaskBtnDOM.addEventListener('click', (e) => {
    e.preventDefault();
    newTaskLightobx.show();
    taskForm.updateUI('new');
})

for (const btnDOM of allUpdateBtnDOM) {
    btnDOM.addEventListener('click', () => {
        newTaskLightobx.show();
        taskForm.updateUI('update', +btnDOM.dataset.id);
    })
}