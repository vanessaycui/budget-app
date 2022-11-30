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
   
        catForm.style.display="none"
    } else {
    
        catForm.style.display="block"
    }
})


addIncomeBtn.addEventListener('click', (event)=>{
    incomecounter++
    console.log("show income")
    if (incomecounter%2===0){
 
        incomeForm.style.display="none"
    } else {
     
        incomeForm.style.display="block"
    }
})
/*----- functions -----*/

