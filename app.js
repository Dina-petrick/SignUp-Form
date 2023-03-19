const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message

function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = " form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

//email check

const isVaild = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const checkEmail = (input) => {
  if (isVaild(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, "email is not valid");
  }
};

// check input required

function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//length check

function checklength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be atleast ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//PasswordMatch check

function checkPasswordMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "password doesn't match");
  }
}

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

// Event Listener

form.addEventListener("submit", function (e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checklength(username, 3, 15);
  checklength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, password2);
});
