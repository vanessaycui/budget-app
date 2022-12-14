const Entry = require("../models/entry");
const Dashboard = require("../models/dashboard");
var async = require("async");

module.exports = {
  index,
  show,
  logout,
  create: createDashboard,
  delete: deleteDashboard,
  update,
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
  const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const currentMonthDate = new Date(date.getFullYear(), date.getMonth(), 0);
  const prevMonthDate = new Date(date.getFullYear(), date.getMonth() - 1, 0);

  Dashboard.findById(req.params.id).exec(function (err, userDash) {
    let categories = userDash.categories;
    let incomes = userDash.incomes;
    let prevMonthEntries = [];
    let prevMonthEntriesIncome = [];
    let currentMonthEntries = [];
    let currentMonthEntriesIncome = [];
    let recentEntries = {};

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
                dashboard: req.params.id,
                category: category,
                date: { $gte: prevMonthDate, $lt: currentMonthDate },
              }).then(function (result) {
                if (result.length === 0) {
                  catTotal.push(0);
                } else {
                  let total = 0;
                  result.forEach((entry) => {
                    total = total + entry.cost;
                  });
                  catTotal.push(total.toFixed(2));
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
                dashboard: req.params.id,
                incomeType: income,
                date: { $gte: prevMonthDate, $lt: currentMonthDate },
              }).then(function (result) {
                if (result.length === 0) {
                  incomeTotal.push(0);
                } else {
                  let total = 0;
                  result.forEach((entry) => {
                    total = total + entry.income;
                  });
                  incomeTotal.push(total.toFixed(2));
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
                dashboard: req.params.id,
                category: category,
                date: { $gte: currentMonthDate, $lt: nextMonthDate },
              }).then(function (result) {
                if (result.length === 0) {
                  catTotal.push(0);
                } else {
                  let total = 0;
                  result.forEach((entry) => {
                    total = total + entry.cost;
                  });
                  catTotal.push(total.toFixed(2));
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
                dashboard: req.params.id,
                incomeType: income,
                date: { $gte: currentMonthDate, $lt: nextMonthDate },
              }).then(function (result) {
                if (result.length === 0) {
                  incomeTotal.push(0);
                } else {
                  let total = 0;
                  result.forEach((entry) => {
                    total = total + entry.income;
                  });
                  incomeTotal.push(total.toFixed(2));
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
        function (cb) {
          const loop = async () => {
            let entries = {};
            for (let i = 0; i < categories.length; i++) {
              const category = categories[i].name;
              //find entries associated with each category and exists in userDash
              const entry = await Entry.find({
                dashboard: req.params.id,
                category: category,
              })
                .sort({ date: -1 })
                .then(function (result) {
                  if (result.length === 0) {
                    entries[category] = ["No records"];
                  } else {
                    entries[category] = [];

                    result.forEach((entry) => {
                      entries[category].push(
                        `$${entry.cost.toFixed(2)} => ${
                          entry.company
                        } on ${entry.date.toISOString().slice(0, 10)} `
                      );
                    });
                  }
                });
            }
            return entries;
          };
          loop().then((result) => {
            recentEntries = { ...recentEntries, ...result };
            cb(null, result);
          });
        },
        function (cb) {
          const loop = async () => {
            let entries = {};
            for (let i = 0; i < incomes.length; i++) {
              const income = incomes[i].incomeType;
              //find entries associated with each category and exists in userDash
              const entry = await Entry.find({
                dashboard: req.params.id,
                incomeType: income,
              })
                .sort({ date: -1 })
                .then(function (result) {
                  if (result.length === 0) {
                    entries[income] = ["No records"];
                  } else {
                    entries[income] = [];

                    result.forEach((entry) => {
                      entries[income].push(
                        `$${entry.income.toFixed(2)} => ${
                          entry.company
                        } on ${entry.date.toISOString().slice(0, 10)} `
                      );
                    });
                  }
                });
            }
            return entries;
          };
          loop().then((result) => {
            recentEntries = { ...recentEntries, ...result };
            cb(null, result);
          });
        },
      ],
      function (err) {
        let prevMonthTotalIncome = prevMonthEntriesIncome.reduce(
          (acc, curr) => acc + parseInt(curr),
          0
        );
        let prevMonthTotalExpense = prevMonthEntries.reduce(
          (acc, curr) => acc + parseInt(curr),
          0
        );
        let prevMonthTotalSavings = (
          prevMonthTotalIncome - prevMonthTotalExpense
        ).toFixed(2);

        let currentMonthTotalIncome = currentMonthEntriesIncome.reduce(
          (acc, curr) => acc + parseInt(curr),
          0
        );
        let currentMonthTotalExpense = currentMonthEntries.reduce(
          (acc, curr) => acc + parseInt(curr),
          0
        );
        let currentMonthTotalSavings = (
          currentMonthTotalIncome - currentMonthTotalExpense
        ).toFixed(2);

        //calculating the percent changes btwn categories and income
        let perChangeSpending = [];
        let perChangeIncome = [];
        for (let i = 0; i < prevMonthEntries.length; i++) {
          if (prevMonthEntries[i] === 0) {
            perChangeSpending.push((0).toFixed(2));
          } else {
            perChangeSpending.push(
              (
                ((currentMonthEntries[i] - prevMonthEntries[i]) * 100) /
                prevMonthEntries[i]
              ).toFixed(2)
            );
          }
        }
        for (let i = 0; i < prevMonthEntriesIncome.length; i++) {
          if (prevMonthEntriesIncome[i] === 0) {
            perChangeIncome.push((0).toFixed(2));
          } else {
            perChangeIncome.push(
              (
                ((currentMonthEntriesIncome[i] - prevMonthEntriesIncome[i]) *
                  100) /
                prevMonthEntriesIncome[i]
              ).toFixed(2)
            );
          }
        }
        res.render("dashboards/show", {
          dashboard: userDash,
          prevMonth: prevMonthEntries,
          prevMonthIncome: prevMonthEntriesIncome,
          prevMonthSummary: [
            prevMonthTotalExpense.toFixed(2),
            prevMonthTotalIncome.toFixed(2),
            prevMonthTotalSavings,
          ],
          recentEntries: recentEntries,
          change: perChangeSpending,
          changeIncome: perChangeIncome,
          currentMonth: currentMonthEntries,
          currentMonthIncome: currentMonthEntriesIncome,
          currentMonthSummary: [
            currentMonthTotalExpense.toFixed(2),
            currentMonthTotalIncome.toFixed(2),
            currentMonthTotalSavings,
          ],
        });
      }
    );
  });
}

function createDashboard(req, res) {
  req.body.users = req.user.id;
  let dashboard = new Dashboard(req.body);
  dashboard.save(function (err) {
    res.redirect("/dashboards");
  });
}

function deleteDashboard(req, res) {
  Dashboard.findById(req.params.id).exec(function (err, dashboard) {
    Entry.deleteMany({dashboard: dashboard.id}).exec(function(err){
      dashboard.remove();
      dashboard.save(function (err) {
        res.redirect("/dashboards");
      });
    });
  });
}

function update(req, res) {
  Dashboard.findById(req.params.id).exec(function (err, dashboard) {
    dashboard.title = req.body.title;
    dashboard.save(function (err) {
      res.redirect(`/dashboards/${req.params.id}`);
    });
  });
}

//logout OAuth user
function logout(req, res) {
  req.logout(function (err) {
    res.redirect("/");
  });
}
