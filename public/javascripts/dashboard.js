/*----- constants -----*/
/*----- app's state (variables) -----*/
let catcounter = 0
let incomecounter =0
/*----- cached element references -----*/

const addCatBtn = document.querySelector("#add-cat-btn")
const catForm = document.querySelector("#cat-form")
const catList = document.querySelector("#cat-list")

const addIncomeBtn = document.querySelector("#add-income-btn")
const incomeForm = document.querySelector("#income-form")
const incomeList = document.querySelector("#income-list")
/*----- event listeners -----*/


addCatBtn.addEventListener('click', (event)=>{
    catcounter++
    console.log("show cat")
    if (catcounter%2===0){
        catList.style.display="flex"
        catForm.style.display="none"
    } else {
        catList.style.display="none"
        catForm.style.display="flex"
    }
})


addIncomeBtn.addEventListener('click', (event)=>{
    incomecounter++
    console.log("show income")
    if (incomecounter%2===0){
        incomeList.style.display="flex"
        incomeForm.style.display="none"
    } else {
        incomeList.style.display="none"
        incomeForm.style.display="flex"
    }
})
/*----- functions -----*/

