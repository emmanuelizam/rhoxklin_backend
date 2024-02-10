const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const pathToPublicKey = path.join(__dirname, "../public_key.pem");
const pathToPrivateKey = path.join(__dirname, "../private_key.pem");

try {
  const keys = crypto.generateKeyPairSync("rsa", {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
    },
  });
  fs.writeFileSync(pathToPrivateKey, keys.privateKey, { encoding: "utf-8" });
  fs.writeFileSync(pathToPublicKey, keys.publicKey, { encoding: "utf-8" });
} catch (error) {
  console.log(error);
}
