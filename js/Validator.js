class Validator {
  constructor(config) {
    this.elementsConfig = config;
    this.errors = {};

    this.generateErrorsObject();
    this.inputListener();
  }
  generateErrorsObject() {
    for (let field in this.elementsConfig) {
      this.errors[field] = [];
    }
  }
  inputListener() {
    let inputSelector = this.elementsConfig;
    for (let field in inputSelector) {
      let el = document.querySelector(`input[name="${field}"]`);
      el.addEventListener('input', this.valdate.bind(this));
    }
  }
  valdate(e) {
    let elFields = this.elementsConfig;
    let field = e.target;
    let fieldName = field.getAttribute('name');
    let fieldValue = field.value;
    this.errors[fieldName] = [];
    if (elFields[fieldName].required) {
      if (fieldValue === '') {
        this.errors[fieldName].push('Polje je prazno');
      }
    }
    if (elFields[fieldName].email) {
      if (!this.valdateEmail(fieldValue)) {
        this.errors[fieldName].push('Neuspravna Email adresa');
      }
    }
    if (
      fieldValue.length < elFields[fieldName].minlenght ||
      fieldValue.length > elFields[fieldName].maxlength
    ) {
      this.errors[fieldName].push(
        `Polje mora imati Minimalno ${elFields[fieldName].minlenght} i Maksimalno ${elFields[fieldName].maxlenght} karaketera`
      );
    }
    if (elFields[fieldName].matching) {
      let matchingEl = document.querySelector(
        `input[name="${elFields[fieldName].matching}"]`
      );
      if (fieldValue !== matchingEl.value) {
        this.errors[fieldName].push('Loznike se nepoklapaju');
      }
      if (this.errors[fieldName].length === 0) {
        this.errors[fieldName] = [];
        this.errors[elFields[fieldName].matching] = [];
      }
    }
    if (elFields[fieldName].correct) {
      console.log(fieldValue);
      if (fieldValue != konbr) {
        this.errors[fieldName].push('Nemas Pojma');
      } else {
        this.errors[fieldName].push('Ti si Doktor');
      }
    }
    this.populateErrors(this.errors);
  }
  populateErrors(errors) {
    for (const elem of document.querySelectorAll('ul')) {
      elem.remove();
    }
    for (let key of Object.keys(errors)) {
      let parentElement = document.querySelector(
        `input[name="${key}"]`
      ).parentElement;
      let errorsElement = document.createElement('ul');
      parentElement.appendChild(errorsElement);
      errors[key].forEach((error) => {
        let li = document.createElement('li');
        if (error === 'Ti si Doktor') {
          li.style.color = 'green';
        }
        li.innerText = error;
        errorsElement.appendChild(li);
      });
    }
  }
  validationPassed() {
    for (let key of Object.keys(this.errors)) {
      if (this.errors[key].length > 0) {
        return false;
      }
    }

    return true;
  }
  valdateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    } else {
      return false;
    }
  }
}
