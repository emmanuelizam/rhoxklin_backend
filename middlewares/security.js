const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { username, password } = require("../config/db.config");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

const pathToPublicKey = path.join(__dirname, "../public_key.pem");
const pathToPrivateKey = path.join(__dirname, "../private_key.pem");

module.exports = (Staff) => {
  const PUBLIC_KEY = fs.readFileSync(pathToPublicKey, { encoding: "utf-8" });
  const PRIVATE_KEY = fs.readFileSync(pathToPrivateKey, { encoding: "utf-8" });
  const generateToken = (user) => {
    try {
      payload = {
        id: user.id,
        name: user.name,
      };

      return jsonwebtoken.sign(payload, PRIVATE_KEY, {
        expiresIn: "1d",
        algorithm: "RS256",
      });
    } catch (error) {
      console.log(error);
    }
  };

  passport.use(
    new LocalStrategy((username, password, done) => {
      try {
        Staff.findAll({
          where: { [Op.or]: [{ email: username }, { phoneNumber: username }] },
        })
          .then(([staff]) => {
            try {
              if (staff) {
                if (bcrypt.compareSync(password, staff.password)) {
                  return done(null, staff, { message: "success!" });
                }
                return done(null, false, {
                  message: "incorrect password or username",
                });
              }
              done(null, false, { message: "no user found" });
            } catch (error) {
              console.log(error);
            }
          })
          .catch((error) => {
            console.log(error);
            return done(error, false);
          });
      } catch (error) {
        console.log(error);
        return done(error, false);
      }
    })
  );

  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUBLIC_KEY,
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (payload, done) => {
      try {
        const staff = await Staff.findByPk(payload.id);
        if (!staff) {
          return done(null, false);
        }
        return done(null, staff);
      } catch (error) {
        return done(error, false);
      }
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const staff = await Staff.findByPk(id);
      done(null, staff);
    } catch (error) {
      console.log(error);
    }
  });

  return { passport, generateToken };
};
