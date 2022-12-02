/*----- app's state (variables) -----*/
let entryForm;
/*----- cached element references -----*/

const cancelBtn = document.querySelectorAll(".cancel-edit")
const editSettingsForm = document.querySelector(".form-overlay")
const settingsBtn = document.querySelector("#settings-income")
const editBtns = document.querySelectorAll(".edit-btn")

/*----- event listeners -----*/
settingsBtn.addEventListener('click',(event)=>{
    editSettingsForm.style.display="flex"
})

cancelBtn.forEach(btn=>{
    btn.addEventListener('click',(event)=>{
        editSettingsForm.style.display="none"
        entryForm.style.display="none"
        editBtns.forEach(btn=>{
            btn.style.display="inline"
        })
    })
})

editBtns.forEach(btn => {
    btn.addEventListener('click',(event)=>{
        if (event.target.tagName ==="A"){
            entryForm = document.getElementById(`form-${event.target.id}`)
            entryForm.style.display="flex"
            editBtns.forEach(btn=>{
                btn.style.display="none"
            })
        }
    })
})


/*----- functions -----*/

