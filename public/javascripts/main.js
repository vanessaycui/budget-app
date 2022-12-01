/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
const createDashBtn = document.querySelector("#create-dash-btn")
const createDashForm = document.querySelector("#dashboard-creation")
const cancelBtn = document.querySelector("#form-cancel-button")

/*----- event listeners -----*/

createDashBtn.addEventListener('click', (event)=>{
    createDashForm.classList.toggle("hide-form")
    createDashBtn.classList.toggle("hide-form")

})

cancelBtn.addEventListener('click', (event)=>{
    createDashForm.classList.toggle("hide-form")
    createDashBtn.classList.toggle("hide-form")
 
})

/*----- functions -----*/

