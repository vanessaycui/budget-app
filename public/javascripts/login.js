
/*----- constants -----*/
/*----- app's state (variables) -----*/
/*----- cached element references -----*/

const userStatus= document.querySelector("#user-status")
const navBarLinks = document.querySelectorAll("#nav-mobile>li")

/*----- event listeners -----*/

/*----- functions -----*/
checkUser()
function checkUser(){
    if (userStatus.value===""){
        navBarLinks.forEach(links=>{
            links.style.display="none"
        })
    } else {
        navBarLinks[1].style.display = "none"
    }
}