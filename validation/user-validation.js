const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function userValidation(data) {
  let errors = {};

  data.user = !isEmpty(data.user) ? data.user : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.user, { min: 2, max: 10 })) {
    errors.user = "Name must be between 2 and 10 characters";
  }

  if (Validator.isEmpty(data.user)) {
    errors.user = "Username is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
