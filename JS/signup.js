'use strict';


class Signup {
  constructor () {
    this.nameInput = document.querySelector("#name");
    this.characterInput = document.querySelector("#character");
    this.emailInput = document.querySelector("#email");
    this.passwordInput = document.querySelector("#password");
    this.repeatPasswordInput = document.querySelector("#repeat");

    this.buttonInput = document.querySelector("#assemble");
    this.errorsWrapper = document.querySelector(".message-container");

  }


  // gestionar cambios del input "email"
  handleEmailInput = (event) => {
    const email = event.target.value;

    // validar el texto del input email
    validator.validateValidEmail(email);

    const errors = validator.getErrors();

    // si el nombre del email es valido
    if (!errors.invalidEmailError) {
      // comprueba si el email es unico
      validator.validateUniqueEmail(email);
    }

    this.setErrorMessages();

    // comprobar si hay errores, si no hay errores activa el boton Sign up (disabled = false)
    this.checkButton();
  }

  // gestionar cambios del input "password"
  handlePasswordInput = (event) => {
    const password = event.target.value;
    const passwordRepeat = this.repeatPasswordInput.value;


    // validar el texto del input password
    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();

    // comprobar si hay errores, si no hay errores activa el boton Sign up (disabled = false)
    this.checkButton();
  }

  // gestionar cambios del input "repeat-password"
  handleRepeatPasswordInput = (event) => {
    const passwordRepeat = event.target.value;
    const password = this.passwordInput.value;

    // validar el texto del input password
    // validar el texto del input repeatPassword
    validator.validatePassword(password);
    validator.validatePasswordRepeat(password, passwordRepeat);

    this.setErrorMessages();

    // comprobar si hay errores, si no hay errores activa el boton Sign up (disabled = false)
    this.checkButton();
  }

  // gestionar el envio de los datos (submit)
  saveData = (event) => {
    // Cuando el evento ocurre, cancelalo y no recargue la pagina
    event.preventDefault();
    // recoger los valores de cada input
    const name = this.nameInput.value;
    const character = this.characterInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const repeatPassword = this.repeatPasswordInput.value;

    const newUser = new User(name, character, email, password);

    // guardar el nuevo usuario en la base de datos ( simulada :D )
    db.saveNewUser( newUser );



    // vaciar el form
    this.nameInput.value = "";
    this.characterInput.value = "";
    this.emailInput.value = "";
    this.passwordInput.value = "";
    this.repeatPasswordInput.value = "";

    this.showSuccessMessage();
    this.removeMessages();

    // reiniciar los errores del `validator`
    validator.resetValidator();
    // desactivar el botón Sign Up de nuevo
    this.buttonInput.disabled = true;
  }

  // registarar funciones para cada input/campo
  addListeners = () => {
    // escucha para los cambios de texto
    this.emailInput.addEventListener("input", this.handleEmailInput );
    this.passwordInput.addEventListener("input", this.handlePasswordInput);
    this.repeatPasswordInput.addEventListener("input", this.handleRepeatPasswordInput);

    this.buttonInput.addEventListener("click", this.saveData);

  }

  showSuccessMessage = () => {
    // vacia los errores para que no se sumen
    this.errorsWrapper.innerHTML = "";

    const errorsObj = validator.getErrors();
    // convertir el objeto a un array de strings
    const errorsStringsArr = Object.values(errorsObj);

    if (errorsStringsArr.length > 1) {
      return;
    }

    const successMessageP = document.createElement('p');
    successMessageP.innerHTML = "Welcome to the team!";

    this.errorsWrapper.appendChild(successMessageP);

  }

  
  // activar o desactivar el botón de envio (Sign Up)
  checkButton = () => {
    const errorsObj = validator.getErrors();
    const errorsArr = Object.values(errorsObj);
    

    if(errorsArr.length > 0) {
      this.buttonInput.disabled = true;
    }
    else {
      this.buttonInput.disabled = false;
    }
  }

  removeMessages = () => {
    setTimeout( () => {
      this.errorsWrapper.innerHTML = "";
    }, 2000)
  }


  setErrorMessages = () => {
    // vacia los errores para que no se sumen
    this.errorsWrapper.innerHTML = "";
    
    const errorsObj = validator.getErrors();

    // convertir el objeto a un array de strings
    const errorsStringsArr = Object.values(errorsObj);

    errorsStringsArr.forEach( (errorStr) => {
      const errorMessageP = document.createElement('p');
      errorMessageP.innerHTML = errorStr;

      this.errorsWrapper.appendChild(errorMessageP);
    })

  }
}

// crear una nueva instanica del Signup (objeto)
const signup = new Signup();

window.addEventListener("load", signup.addListeners );