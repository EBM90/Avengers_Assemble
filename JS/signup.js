class Signup {
    constructor(){
        this.userName = document.querySelector('#name')
        this.favCharacter = document.querySelector('#name')
        this.userEmail = document.querySelector('#email')
        this.userPassword = document.querySelector('#password')
        this.repeatPass = document.querySelector('#repeat')
        this.assembleButton = document.querySelector('#assemble')
    }

    handleEmailInput(event){
        const email = event.target.value

    }
    handlePasswordInput(event){
        const password = event.target.value
    }
    handleRepeatPasswordInput(event){
        const repeatPassword = event.target.value
    }
    saveData(event){
        event.preventDefault()
        const name = this.userName.value
        const character = this.favCharacter.value
        const email = this.userEmail.value
        const password = this.userPassword.value
        // function(name, character, email, password){

        // }
    }

    addListeners(){
        this.userEmail.addEventListener('input', this.handleEmailInput)
        this.userPassword.addEventListener('input', this.handlePasswordInput)
        this.repeatPass.addEventListener('input', this.handleRepeatPasswordInput)
        

    }
}

const singUp = new Signup()
window.addEventListener('load', singUp.addListeners)