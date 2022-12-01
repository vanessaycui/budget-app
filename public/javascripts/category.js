/*----- constants -----*/
/*----- app's state (variables) -----*/
let entryForm;

/*----- cached element references -----*/

const cancelBtn = document.querySelectorAll(".cancel-edit")
const editSettingsForm = document.querySelector("#cat-settings-form")
const settingsBtn = document.querySelector("#settings-category")
const editBtns = document.querySelectorAll("#show-table")


/*----- event listeners -----*/
settingsBtn.addEventListener('click',(event)=>{
    editSettingsForm.style.display="flex"
})

cancelBtn.forEach(btn=>{
    btn.addEventListener('click',(event)=>{
        editSettingsForm.style.display="none"
        entryForm.style.display="none"
    })
})

editBtns.forEach(btn => {
    btn.addEventListener('click',(event)=>{
        if (event.target.tagName ==="A"){
            entryForm = document.getElementById(`form-${event.target.id}`)
            entryForm.style.display="flex"
        }
    
    })
})


/*----- functions -----*/

