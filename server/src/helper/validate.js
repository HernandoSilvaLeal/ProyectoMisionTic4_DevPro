function validateRegisterInput({ name, email, password, identification }) {
  const errors = [];
  if (name.trim() === "") {
    errors.name = "Username must not be empty";
  }
  if (email.trim() === "") {
    errors.email = "Email address must be provided.";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
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
}

module.exports = { validateRegisterInput };
