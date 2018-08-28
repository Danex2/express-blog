const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function loginValidation(data) {
  let errors = {};

  data.user = !isEmpty(data.user) ? data.user : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.user)) {
    errors.user = "Username field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
