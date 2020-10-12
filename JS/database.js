'use strict'

class Database {
  // recuperar los usuarios - el array
  getAllUsers = () => {
    // recuperar el string
    const usersStr = localStorage.getItem("users");
    // convertir el string a un array
    const usersArr = JSON.parse( usersStr );

    // si todavia no hay usuarios, devuelve un array vacio
    if (usersArr === null) {
      return [];
    } else {
      return usersArr;
    }

  }

  saveNewUser = (newUser) => {

    // recuperar el array de los usuarios del localStorage
    const usersArr = this.getAllUsers();

    // actualizar el array de usuarios
    usersArr.push(newUser);

    // convertir el array a un string
    const usersStr = JSON.stringify(usersArr);

    // almacenar lo de nuevo
    localStorage.setItem("users", usersStr);
  }
}

const db = new Database();

console.log('db', db)
