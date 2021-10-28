require("dotenv").config();
const jwt = require("jsonwebtoken");

function generateToken(user) {
  if (!user) {
    return Error("User must be provided.");
  }
  return jwt.sign(user, process.env.SECRET, { expiresIn: "1h" });
}

async function isTokenValid(token) {
  if (token) {
    const auth = token.split("Bearer ")[1];
    if (auth) {
      try {
        const user = jwt.verify(auth, process.env.SECRET);
        return user;
      } catch (err) {
        throw new Error("Expired token " + err.message);
      }
    }
  }
  throw new Error("Authentication Token must be provided");
}

module.exports = { generateToken, isTokenValid };
