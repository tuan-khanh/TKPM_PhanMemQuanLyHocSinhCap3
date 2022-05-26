const express_handlebars = require("express-handlebars");
const path = require("path");

const hbs = express_handlebars.create({
  extname: "hbs",
  helpers: {
    if: function (v1, operator, v2, options) {
      switch (operator) {
        case "==":
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case "===":
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case "!==":
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case "<":
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case "<=":
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case ">":
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case ">=":
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case "&&":
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case "||":
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    },
  },
});

require("express-handlebars-sections")(hbs);

// hbs.registerHelper('if', function (v1, operator, v2, options) {
//     switch (operator) {
//         case '==':
//             return (v1 == v2) ? options.fn(this) : options.inverse(this);
//         case '===':
//             return (v1 === v2) ? options.fn(this) : options.inverse(this);
//         case '!==':
//             return (v1 !== v2) ? options.fn(this) : options.inverse(this);
//         case '<':
//             return (v1 < v2) ? options.fn(this) : options.inverse(this);
//         case '<=':
//             return (v1 <= v2) ? options.fn(this) : options.inverse(this);
//         case '>':
//             return (v1 > v2) ? options.fn(this) : options.inverse(this);
//         case '>=':
//             return (v1 >= v2) ? options.fn(this) : options.inverse(this);
//         case '&&':
//             return (v1 && v2) ? options.fn(this) : options.inverse(this);
//         case '||':
//             return (v1 || v2) ? options.fn(this) : options.inverse(this);
//         default:
//             return options.inverse(this);
//     }
// });

module.exports = function (app) {
  app.set("view engine", ".hbs");
  app.engine("hbs", hbs.engine);
};
