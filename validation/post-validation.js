const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function postValidation(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.text = !isEmpty(data.text) ? data.text : "";

  if (Validator.isEmpty(data.title)) {
    errors.title = "Please add a title for your post.";
  }

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Your post must be between 10 to 300 characters.";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
