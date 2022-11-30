/*----- constants -----*/
/*----- app's state (variables) -----*/

/*----- cached element references -----*/

const addCatBtn = document.querySelector("#add-cat-btn")
const catForm = document.querySelector("#cat-form")
const catList = document.querySelector("#cat-list")

const addIncomeBtn = document.querySelector("#add-income-btn")
const incomeForm = document.querySelector("#income-form")
const incomeList = document.querySelector("#income-list")

const currentMonthListCat = document.querySelector("#current-month-list-cat")
const currentMonthListIncome = document.querySelector("#curr-month-list-income")
const categoryEntryForm = document.querySelector("#entry-form-categories")
const incomeEntryForm = document.querySelector("#entry-form-income")
const entryHistory = document.querySelector("#entry-history")

const cancelBtn = document.querySelectorAll(".cancel-form")
const cancelBtnCat = document.querySelector(".cat-btn")
const cancelBtnIncome = document.querySelector(".income-btn")
/*----- event listeners -----*/

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




addCatBtn.addEventListener('click', (event)=>{

    catForm.style.display="table"

    cancelBtnCat.style.display="table"

        
})


addIncomeBtn.addEventListener('click', (event)=>{
        incomeForm.style.display="table"
        cancelBtnIncome.style.display="table"

})

currentMonthListCat.addEventListener("click", (event)=>{
    if (event.target.tagName === "A"){
        console.log(event.target.id)
        categoryEntryForm.style.display= "flex";
        incomeEntryForm.style.display= "none";
        categoryEntryForm.children[0][0].value=event.target.id
        entryHistory.style.display="flex"
    
    }
    
})

currentMonthListIncome.addEventListener("click", (event)=>{
    if (event.target.tagName === "A"){
        categoryEntryForm.style.display= "none";
        incomeEntryForm.style.display= "flex";
        incomeEntryForm.children[0][0].value=event.target.id 
        entryHistory.style.display="flex"

    }
    
})
/*----- functions -----*/

