const Entry = require("../models/entry");
const Dashboard = require("../models/dashboard");
var async = require("async");

module.exports = {
  index,
  show,
  logout,
  create: createDashboard,
};

function index(req, res) {
  //show dashboards associated with user.
  Dashboard.find({ users: req.user.id })
    .populate("users")
    .exec(function (err, dashboards) {
      res.render("dashboards/index", {
        user: req.user,
        dashboards,
      });
    });
}

function show(req, res) {
  //getting dates
  const date = new Date();
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 1);
  const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);

  Dashboard.findById(req.params.id)
    .populate("entries")
    .exec(function (err, userDash) {
      let categories = userDash.categories;
      let incomes = userDash.incomes;
      let prevMonthEntries = [];
      let prevMonthEntriesIncome = [];
      let currentMonthEntries = [];
      let currentMonthEntriesIncome = [];

      async.series(
        [
          //getting prev month entries
          function (cb) {
            let catTotal = [];
            const loop = async () => {
              for (let i = 0; i < categories.length; i++) {
                const category = categories[i].name;
                //find entries associated with each category and exists in userDash
                const entry = await Entry.find({
                  _id: { $in: userDash.entries },
                  category: category,
                  date: { $gt: prevMonthDate, $lt: currentMonthDate },
                }).then(function (result) {
                  if (result.length === 0) {
                    catTotal.push(0);
                  } else {
                    let total = 0;
                    result.forEach((entry) => {
                      total = total + entry.cost;
                    });
                    catTotal.push(total);
                  }
                });
              }
              return catTotal;
            };
            loop().then((result) => {
              prevMonthEntries = result;
              cb(null, result);
            });
          },
          function (cb) {
            let incomeTotal = [];
            const loop = async () => {
              for (let i = 0; i < incomes.length; i++) {
                const income = incomes[i].incomeType;
                //find entries associated with each incomeType and exists in userDash
                const entry = await Entry.find({
                  _id: { $in: userDash.entries },
                  incomeType: income,
                  date: { $gt: prevMonthDate, $lt: currentMonthDate },
                }).then(function (result) {
                  if (result.length === 0) {
                    incomeTotal.push(0);
                  } else {
                    let total = 0;
                    result.forEach((entry) => {
                      total = total + entry.income;
                    });
                    incomeTotal.push(total);
                  }
                });
              }
              return incomeTotal;
            };
            loop().then((result) => {
              prevMonthEntriesIncome = result;
              cb(null, result);
            });
          },
          //getting current month entries
          function (cb) {
            let catTotal = [];
            const loop = async () => {
              for (let i = 0; i < categories.length; i++) {
                const category = categories[i].name;
                //find entries associated with each category and exists in userDash
                const entry = await Entry.find({
                  _id: { $in: userDash.entries },
                  category: category,
                  date: { $gt: currentMonthDate, $lt: nextMonthDate },
                }).then(function (result) {
                  if (result.length === 0) {
                    catTotal.push(0);
                  } else {
                    let total = 0;
                    result.forEach((entry) => {
                      total = total + entry.cost;
                    });
                    catTotal.push(total);
                  }
                });
              }
              return catTotal;
            };
            loop().then((result) => {
              currentMonthEntries = result;
              cb(null, result);
            });
          },
          function (cb) {
            let incomeTotal = [];
            const loop = async () => {
              for (let i = 0; i < incomes.length; i++) {
                const income = incomes[i].incomeType;
                //find entries associated with each incomeType and exists in userDash
                const entry = await Entry.find({
                  _id: { $in: userDash.entries },
                  incomeType: income,
                  date: { $gt: currentMonthDate, $lt: nextMonthDate },
                }).then(function (result) {
                  if (result.length === 0) {
                    incomeTotal.push(0);
                  } else {
                    let total = 0;
                    result.forEach((entry) => {
                      total = total + entry.income;
                    });
                    incomeTotal.push(total);
                  }
                });
              }
              return incomeTotal;
            };
            loop().then((result) => {
              currentMonthEntriesIncome = result;
              cb(null, result);
            });
          },
        ],
        function (err) {
          
          let prevMonthTotalIncome = prevMonthEntriesIncome.reduce((acc, curr) => acc+curr, 0);
          let prevMonthTotalExpense = prevMonthEntries.reduce((acc, curr) => acc+curr, 0);
          let prevMonthTotalSavings = prevMonthTotalIncome - prevMonthTotalExpense

          let currentMonthTotalIncome = currentMonthEntriesIncome.reduce((acc, curr) => acc+curr, 0);
          let currentMonthTotalExpense = currentMonthEntries.reduce((acc, curr) => acc+curr, 0);
          let currentMonthTotalSavings = currentMonthTotalIncome - currentMonthTotalExpense
    

          //calculating the percent changes btwn categories and income
          let perChangeSpending = [];
          let perChangeIncome = [];
          for (let i = 0; i < prevMonthEntries.length; i++) {
            if (prevMonthEntries[i] === 0) {
              perChangeSpending.push(0);
            } else {
              perChangeSpending.push(
                ((currentMonthEntries[i] - prevMonthEntries[i]) * 100) /
                  prevMonthEntries[i]
              );
            }
          }
          for (let i = 0; i < prevMonthEntriesIncome.length; i++) {
            if (prevMonthEntriesIncome[i] === 0) {
              perChangeIncome.push(0);
            } else {
              perChangeIncome.push(
                ((currentMonthEntriesIncome[i] - prevMonthEntriesIncome[i]) *
                  100) /
                  prevMonthEntriesIncome[i]
              );
            }
          }

          res.render("dashboards/show", {
            dashboard: userDash,
            prevMonth: prevMonthEntries,
            prevMonthIncome: prevMonthEntriesIncome,
            prevMonthSummary: [prevMonthTotalExpense, prevMonthTotalIncome, prevMonthTotalSavings],

            change: perChangeSpending,
            changeIncome: perChangeIncome,
            currentMonth: currentMonthEntries,
            currentMonthIncome: currentMonthEntriesIncome,
            currentMonthSummary: [currentMonthTotalExpense, currentMonthTotalIncome, currentMonthTotalSavings]
          });
        }
      );
    });
}

function createDashboard(req, res) {
  req.body.users = req.user.id;
  let dashboard = new Dashboard(req.body);
  dashboard.save(function (err) {
    if (err) {
      console.log(err);
      return res.render("/dashboards");
    }
    res.redirect("/dashboards");
  });
}

//logout OAuth user
function logout(req, res) {
  req.logout(function (err) {
    res.redirect("/");
  });
}

function getPrevMonth() {}
