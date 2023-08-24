let session = new Session();
session = session.getSession();

if (session !== '') {
  window.location.href = 'hexa.html';
}

document.querySelector('#registracija').addEventListener('click', () => {
  document.querySelector('.custom-modal').style.display = 'block';
});
document.querySelector('#closeModal').addEventListener('click', () => {
  document.querySelector('.custom-modal').style.display = 'none';
});

let config = {
  korisnicko_ime: {
    required: true,
    minlenght: 5,
    maxlenght: 50,
  },
  register_email: {
    required: true,
    email: true,
    minlenght: 5,
    maxlenght: 50,
  },
  register_lozinka: {
    required: true,
    minlenght: 7,
    maxlenght: 25,
    matching: 'ponovi_lozinku',
  },
  ponovi_lozinku: {
    required: true,
    minlenght: 7,
    maxlenght: 25,
    matching: 'register_lozinka',
  },
};
let validator = new Validator(config, '#registrationForm');

document.querySelector('#registrationForm').addEventListener('submit', (e) => {
  e.preventDefault();
  if (validator.validationPassed()) {
    let user = new User();
    user.username = document.querySelector('#korisnicko_ime').value;
    user.email = document.querySelector('#email').value;
    user.password = document.querySelector('#lozinka').value;
    user.create();
  } else {
    alert('lose');
  }
});

document.querySelector('#loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let email = document.querySelector('#login_email').value;
  let password = document.querySelector('#login_lozinka').value;

  let user = new User();
  user.email = email;
  user.password = password;
  user.login();
});
document.querySelector('#show').addEventListener('click', (e) => {
  e.preventDefault();
  let dugme = document.querySelector('#show');
  let polje = document.querySelector('#lozinka');
  if (dugme.innerText == 'Show') {
    polje.setAttribute('type', 'text');
    dugme.innerText = 'Hide';
  } else if (dugme.innerText == 'Hide') {
    polje.setAttribute('type', 'password');
    dugme.innerText = 'Show';
  }
});
document.querySelector('#show2').addEventListener('click', (e) => {
  e.preventDefault();
  let dugme = document.querySelector('#show2');
  let polje = document.querySelector('#login_lozinka');

  if (dugme.innerText == 'Show') {
    polje.setAttribute('type', 'text');
    dugme.innerText = 'Hide';
  } else if (dugme.innerText == 'Hide') {
    polje.setAttribute('type', 'password');
    dugme.innerText = 'Show';
  }
});
