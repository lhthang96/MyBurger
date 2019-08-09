export const updatedObject = (object, updatedProps) => {
  return {
    ...object,
    ...updatedProps
  }
}

export const formValidation = (input, rules, password) => {
  let isValid = true;
  let errorMessage = [];

  if (rules.required) {
    if (input.trim() === '') {
      isValid = false;
      errorMessage.push('This field is required.');
    }
  };

  if (rules.minLength) {
    if (input.length < rules.minLength) {
      isValid = false;
      errorMessage.push('Min length is ' + rules.minLength + ' letters.');
    }
  };

  if (rules.maxLength) {
    if (input.length > rules.maxLength) {
      isValid = false;
      errorMessage.push('Max length is ' + rules.maxLength + ' letters.');
    }
  };

  if (rules.isPhone) {
    if (input.length > 11 || input.length < 10) {
      isValid = false;
      errorMessage.push('Invalid phone number.');
    }
  };

  if (rules.isPasswordConfirm) {
    if (input !== password) {
      isValid = false;
      errorMessage.push('Confirmed password is not match');
    }
  };

  return ({
    isValid: isValid,
    errorMessage: errorMessage
  });
}