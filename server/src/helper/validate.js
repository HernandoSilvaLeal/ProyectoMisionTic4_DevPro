const regEx =
  /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const validateRegisterInput = ({ name, email, password, identification }) => {
  const errors = [];

  if (name.trim() === "") {
    errors.name = "The field name must not be empty";
  }

  if (email.trim() === "") {
    errors.email = "Email address must be provided.";
  } else {
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  if (password === "") {
    errors.password = "Password must not empty";
  }

  if (identification.trim() === "") {
    errors.identification = "Identification must not be empty";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

const validateUpdateSelfUser = ({
  name,
  email,
  password,
  confirmPassword,
  identification,
}) => {
  const errors = [];
  if (password) {
    if (password !== confirmPassword) {
      errors.passwordConfirm = "Password and confirmPassword are not the same";
    } else if (password.length < 6) {
      errors.passwordLength = "Password must be at least 6 characters long";
    }
  }
  if (name.trim() === "") {
    errors.name = "The field name must not be empty";
  }

  if (identification.trim() === "") {
    errors.identification = "The field identification must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email address must be provided.";
  } else {
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports = { validateRegisterInput, validateUpdateSelfUser };
