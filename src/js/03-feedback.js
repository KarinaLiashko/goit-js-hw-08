import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-from-state';
const formData = {};
const savedData = localStorage.getItem(STORAGE_KEY, JSON.stringify(formData));
const parsedData = JSON.parse(savedData);

const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form textarea'),
    email: document.querySelector('.feedback-form input'),
}

startFormInput();

function onInput(e) {
     return localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
    e.preventDefault();

    if (refs.email.value === '' || refs.textarea.value === '') {
        alert('Please fill in all the fields!');
    }

    console.log(formData);

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
    return;
}

function startFormInput() {
   try {
    const savedItems = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (savedItems) {
      refs.inputEmail.value = savedItems.email;
      refs.inputTextarea.value = savedItems.message;
    }
  } catch (e) {
    console.log(e.name);
  }
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));

refs.form.addEventListener('input', e => {
    formData[e.target.name] = e.target.value;
});