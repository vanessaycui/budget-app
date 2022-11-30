const Entry = require('../models/entry');
const Dashboard = require('../models/dashboard')

module.exports = {
  index,
  show,
  logout,
  create: createDashboard
};

function index(req, res) {
  //show dashboards associated with user.
  Dashboard.find({users: req.user.id}).populate('users').exec(function(err, dashboards){
      res.render('dashboards/index', {
        user: req.user,
        dashboards
    })
  })
}

function show(req, res){
  Dashboard.findById(req.params.id,function( err, userDash){
    let categories = userDash.categories
    const loop = async ()=>{
      let catTotal=[]
      for (let i = 0; i<categories.length; i++){
        const category =  categories[i].name
        console.log(category)
        //find entries associated with each category
        const entry = await Entry.find({category: category})
        .then(function(result){
          if (result.length ===0){
            catTotal.push(0)
          } else {
            let total = 0
            result.forEach(entry => {
              total = total+  entry.cost 
            })
            catTotal = total
          }
          
        })
      }
      return catTotal
    }
  
    loop().then((result)=>{
      let prevMonthEntries = result

      //COME BACK TO THIS. WILL NEED TO DO THIS AGAIN FOR 3 MONTHS AND 12 MONTHS,CURRENT MONTH ETC.
  
      res.render('dashboards/show',{dashboard: userDash, prevMonth:prevMonthEntries} )


    })    
  })
}

function createDashboard(req, res){
  req.body.users = req.user.id
  let dashboard = new Dashboard(req.body)
  dashboard.save(function(err){
    if (err){
      console.log(err)
      return res.render('/dashboards')
    }
    res.redirect('/dashboards')
  })
}


//logout OAuth user
function logout(req, res){
  req.logout(function(err){
    res.redirect('/');
  });
}


function getPrevMonth() {

  
}