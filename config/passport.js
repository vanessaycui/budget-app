// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy
// const Student = require('../models/student')

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK,
//     },
//     // verify callback
//     function (accessToken, refreshToken, profile, cb) {
//       Student.findOne({ googleId: profile.id }, function (err, student) {
//         if (err) return cb(err);
//         if (student) {
//           console.log(student)
//           return cb(null, student);
//         } else {
//           // we have a new student via OAuth!
//           var newStudent = new Student({
//             name: profile.displayName,
//             email: profile.emails[0].value,
//             googleId: profile.id,
//             cohort: 'SEI-56'
//           });
//           newStudent.save(function (err) {
//             if (err) return cb(err);
//             return cb(null, newStudent);
//           });
//         }
//       });
//     }
//   )
// );

// passport.serializeUser(function(student, done) {
//   done(null, student.id)
// })
// // req.user.facts.push
// // req.user.save()

// passport.deserializeUser(function(id, done) {
//   Student.findById(id, function(err, student) {
//     done(null, student)
//   })
// })