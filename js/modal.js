function editNav() {
  var x = document.getElementById("myTopnav");
  x.classList.toggle("responsive");
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const form = document.querySelector('form');
const closeBtn = document.querySelector(".close");
const confirmationMessage = document.getElementById('confirmationMessage');
const btnDisplay = document.getElementById('closeBtn');
const heightModal = document.getElementById('modalBody');
const height = document.getElementById('content');


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", () => {
  modalbg.style.display = "block";
}));

function displayForm () {
  btnDisplay.style.display = "none";
  confirmationMessage.innerText = '';
  confirmationMessage.style.display = "none";
  form.style.display = "block";
  heightModal.classList.remove('important-padding');
  height.classList.remove('height')
}

// close modal
closeBtn.addEventListener("click", () => {
  modalbg.style.display = "none";
  displayForm();
});

// close button modal
btnDisplay.addEventListener("click", () => {
  modalbg.style.display ="none";
  displayForm();
})

// close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === modalbg) {
    modalbg.style.display = "none";
  }
  displayForm();
});

// Validate form
function validateForm(event) {
  event.preventDefault();
  let isValid = {
    prenom: true,
    nom: true,
    email: true,
    date: true,
    number: true,
    radio: true,
    checkbox: true
  }; 

  // Je déclare des functions de validations qui seront reutilisable dans d'autres petites functions
  isValid.prenom = validatePrenomField('first', 'firstNameError', 2, 'Le champ prénom doit contenir au moins 2 caractères');
  isValid.nom = validateNomField('last', 'lastNameError', 2, 'Le champ nom doit contenir au moins 2 caractères');
  isValid.email = validateEmailField('email', 'emailError');
  isValid.date = validateDateField('birthdate', 'birthdateError', 'Vous devez entrer votre date de naissance');
  isValid.number = validateNumberField('quantity', 'quantityError', 0, 99, 'Le champ nombre de concours doit être un nombre entre 0 et 99');
  isValid.radio = validateRadioButtons('location', 'locationError', 'Veuillez sélectionner une localisation');
  isValid.checkbox = validateCheckbox('checkbox1', 'checkbox1Error', 'Vous devez accepter les conditions d\'utilisation');

  // Si le form est true, tu fais disparaitre le formulaire et tu fais apparaitre un texte
  if (isValid.prenom && isValid.nom && isValid.email && isValid.date && isValid.number && isValid.radio && isValid.checkbox) {
    form.style.display = 'none';
    confirmationMessage.innerText = 'Merci pour votre inscription !';
    confirmationMessage.style.display = 'flex';
    btnDisplay.style.display = 'block';
    heightModal.classList.add('important-padding');
    height.classList.add('height')
  }
}

// Add form submit event listener
form.addEventListener("submit", validateForm);

// permet de soumettre le formulaire validateForm s'il est true

// Validate a text field with minimum length
// je rajoute des arguments à ma function, ce qui équivaut à ('first', 'firstNameError', 2, 'Le champ prénom doit contenir au moins 2 caractères')
function validatePrenomField(fieldId, errorId, minLength, errorMessage) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  const errorField = document.getElementById(errorId);
  if (value.length < minLength) {
    errorField.innerText = errorMessage;
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}

function validateNomField(fieldId, errorId, minLength, errorMessage) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  const errorField = document.getElementById(errorId);
  if (value.length < minLength) {
    errorField.innerText = errorMessage;
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}

// Validate email
function validateEmailField(fieldId, errorId) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  const errorField = document.getElementById(errorId);
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailPattern.test(value)) {
    errorField.innerText = 'Le champ email doit être une adresse email valide';
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}

// Validate date field
function validateDateField(fieldId, errorId, errorMessage) {
  const field = document.getElementById(fieldId);
  const value = field.value.trim();
  const errorField = document.getElementById(errorId);
  if (!value) {
    errorField.innerText = errorMessage;
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}

// Validate number field
function validateNumberField(fieldId, errorId, minValue, maxValue, errorMessage) {
  const field = document.getElementById(fieldId);
  const value = parseInt(field.value);
  const errorField = document.getElementById(errorId);
  if (isNaN(value) || value < minValue || value > maxValue) {
    errorField.innerText = errorMessage;
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}

// Validate radio buttons
function validateRadioButtons(name, errorId, errorMessage) {
  const radios = document.querySelectorAll(`input[name="${name}"]`);
  let selected = false;
  const errorField = document.getElementById(errorId);
  for (const radio of radios) {
    if (radio.checked) {
      selected = true;
      break;
    }
  }
  if (!selected) {
    errorField.innerText = errorMessage;
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}

// Validate checkbox
function validateCheckbox(fieldId, errorId, errorMessage) {
  const checkbox = document.getElementById(fieldId);
  const errorField = document.getElementById(errorId);
  if (!checkbox.checked) {
    errorField.innerText = errorMessage;
    return false;
  } else {
    errorField.innerText = '';
    return true;
  }
}