const bcrypt = require('bcrypt');

let secretCode;
const createSecretCode = () => {
    const dateString = new Date().valueOf();
    return secretCode = bcrypt.hashSync(dateString.toString() + dateString, bcrypt.genSaltSync());
}

module.exports = {
    createSecretCode, secretCode
}
