const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";

export const VALIDATOR_REQUIRE = () => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = () => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val) => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val) => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val) => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = () => ({ type: VALIDATOR_TYPE_EMAIL });

export const validate = (value, validators, name) => {
  let isValid = true,
    errors = [];
  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
      const error = !isValid ? `${name} is required.` : null;
      error && errors.push(error);
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH) {
      isValid = isValid && value.trim().length >= validator.val;
      const error = !isValid
        ? `${name} should be of minimum ${validator.val} characters.`
        : null;
      error && errors.push(error);
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH) {
      isValid = isValid && value.trim().length <= validator.val;
      const error = !isValid
        ? `${name} can be of maximum ${validator.val} characters.`
        : null;
      error && errors.push(error);
    }
    if (validator.type === VALIDATOR_TYPE_MIN) {
      isValid =
        isValid &&
        ((!Number.isNaN(+value) && +value >= validator.val) ||
          (Array.isArray(value) && value.length >= validator.val));
      const error = !isValid
        ? `There should be at least ${validator.val} ${name}.`
        : null;
      error && errors.push(error);
    }
    if (validator.type === VALIDATOR_TYPE_MAX) {
      isValid =
        isValid &&
        ((!Number.isNaN(+value) && +value <= validator.val) ||
          (Array.isArray(value) && value.length <= validator.val));
      const error = !isValid
        ? `There can be at most ${validator.val} ${name}.`
        : null;
      error && errors.push(error);
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
      const error = !isValid ? `${name} is not valid.` : null;
      error && errors.push(error);
    }
  }
  return errors;
};
