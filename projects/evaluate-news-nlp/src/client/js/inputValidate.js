// very simple input validation
function isInputValid(formText) {
  let text = formText.trim();
  return text == ""? false: true;
}

export {
    isInputValid
}
