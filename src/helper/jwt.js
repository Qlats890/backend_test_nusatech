const jwt = require("jsonwebtoken");

class JWT {
  static jwtSignMailer(id_user, email) {
    const token = jwt.sign(
      {
        id_user,
        email,
      },
      process.env.SECRET_KEY_TOKEN,
      {
        expiresIn: "1h",
      }
    );
    return token;
  }

  static jwtVerifyMailer(token) {
    try {
      const { id_user, email } = jwt.verify(
        token,
        process.env.SECRET_KEY_TOKEN
      );
      return {
        status: true,
        id_user,
        email,
      };
    } catch (error) {
      return {
        status: false,
      };
    }
  }

  static jwtGenerate(id_user, email) {
    const token = jwt.sign(
      {
        id_user,
        email,
      },
      process.env.SECRET_KEY_TOKEN
    );
    return token;
  }

  static jwtVerify(bearerToken) {
    const bearerHead = bearerToken;
    // console.log(bearerHead);
    if (typeof bearerHead !== undefined) {
      const bearer = bearerHead.split(" ");
      const token = bearer[1];

      const { email } = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
      if (!email) {
        return {
          status: false,
        };
      } else {
        return {
          status: true,
          email,
        };
      }
    }
  }
}

module.exports = JWT;
