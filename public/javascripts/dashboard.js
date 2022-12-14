
/*----- constants -----*/
const entryDivs = document.querySelectorAll("#entry-history>div")

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
const cancelBtn = document.querySelectorAll(".cancel-form")
const cancelBtnCat = document.querySelector(".cat-btn")
const cancelBtnIncome = document.querySelector(".income-btn")
const cancelBtnDash = document.querySelector("#cancel-dash-edit")
const editDashForm = document.querySelector(".form-overlay")
const settingsBtn = document.querySelector("#settings-dash")
const dashboardChart= document.getElementById('dash-chart');
const xaxis = document.getElementById('x-axis').innerHTML.split(",");
const currentMonthData = document.getElementById('current-data').innerHTML.split(",").map(value => parseInt(value));
const prevMonthData = document.getElementById('prev-data').innerHTML.split(",").map(value => parseInt(value));

/*----- app's state (variables) -----*/
new Chart(dashboardChart, {
    type: 'bar',
    data: {
      labels: xaxis,
      datasets: [
    {
        label: 'prev. month spending',
        data: prevMonthData,
        borderWidth: 1,
        backgroundColor: 'rgba(73, 113, 116, 0.95)'
    },
    {
        label: 'current month spending',
        data: currentMonthData,
        borderWidth: 1,
        backgroundColor: 'rgba(235, 100, 64, 0.95)'
    }
    ]
    },
    options: {
      scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value, index, ticks){
                    return '$' + value
                }
            },
            display: true
        }
      }
    }
  });

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
        entryDivs.forEach(div=>div.style.display="none")
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
    entryDivs.forEach(div=>div.style.display="none")
    if (event.target.tagName === "A"){
        categoryEntryForm.style.display= "flex";
        incomeEntryForm.style.display= "none";
        categoryEntryForm.children[0][0].value=event.target.id
        categoryEntryForm.children[0][0].pattern=event.target.id
        const history = document.getElementById("history-"+event.target.id)
        history.style.display="flex"
    }
})

currentMonthListIncome.addEventListener("click", (event)=>{
    entryDivs.forEach(div=>div.style.display="none") 
    if (event.target.tagName === "A"){
        categoryEntryForm.style.display= "none"
        incomeEntryForm.style.display= "flex";
        console.dir(incomeEntryForm)
        incomeEntryForm.children[0][0].value=event.target.id
        incomeEntryForm.children[0][0].pattern=event.target.id
        const history = document.getElementById("history-"+event.target.id.split(" ")[0]) 
        history.style.display="flex"
    }
})
/*----- functions -----*/

