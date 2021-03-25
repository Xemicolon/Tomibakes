exports.checkPassword = (password) => {
  const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;

  if (!regex.test(password)) {
    return false;
  }

  if (regex.test(password)) {
    return true;
  }
};
