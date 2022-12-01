/*----- constants -----*/
/*----- app's state (variables) -----*/

/*----- cached element references -----*/

const cancelBtnDash = document.querySelector("#cancel-edit")
const editForm = document.querySelector(".form-overlay")
const settingsBtn = document.querySelector("#settings-income")

/*----- event listeners -----*/
settingsBtn.addEventListener('click',(event)=>{
    editForm.style.display="flex"
})
cancelBtnDash.addEventListener('click',(event)=>{
    editForm.style.display="none"
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

