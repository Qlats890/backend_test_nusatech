const bcrypt = require("bcrypt");

class Bcrypt {
  static bcryptGenerate(pass) {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_BCRYPT));
    const hash = bcrypt.hashSync(pass, salt);
    return hash;
  }

  static bcryptVerify(pass, hash) {
    const check = bcrypt.compareSync(pass, hash);
    return check;
  }
}

module.exports = Bcrypt;
