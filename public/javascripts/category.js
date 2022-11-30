/*----- constants -----*/
/*----- app's state (variables) -----*/

/*----- cached element references -----*/

const cancelBtnDash = document.querySelector("#cancel-dash-edit")
const editDashForm = document.querySelector(".form-overlay")
const settingsBtn = document.querySelector("#settings-category")

/*----- event listeners -----*/
settingsBtn.addEventListener('click',(event)=>{
    editDashForm.style.display="flex"
})
cancelBtnDash.addEventListener('click',(event)=>{
    editDashForm.style.display="none"
})
cancelBtn.forEach(btn =>{
    btn.addEventListener('click',(event)=>{
        categoryEntryForm.style.display= "none";
        incomeEntryForm.style.display= "none";
        entryHistory.style.display="none"
        catForm.style.display="none"
        incomeForm.style.display="none"
        cancelBtnCat.style.display="none"
        cancelBtnIncome.style.display="none"
    })
})


/*----- functions -----*/

