/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/
const createDashBtn = document.querySelector("#create-dash-btn")
const createDashForm = document.querySelector("#dashboard-creation")

/*----- event listeners -----*/

createDashBtn.addEventListener('click', (event)=>{
    createDashForm.classList.toggle("hide-form")
})

/*----- functions -----*/

