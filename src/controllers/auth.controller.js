import { Op } from "sequelize";
import { sequelize } from "../database";
import Address from "../models/Address";
import Person from "../models/Person";
import User from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { compareHash } from "../utils/tools";
import Province from "../models/Province";
import Country from "../models/Country";
import Role from "../models/Role";
import Gender from "../models/Gender";
import Employee from "../models/Employee";
import Customer from "../models/Customer";

dotenv.config();

export const createUser = async (req, res) => {
  try {
    const {
      email,
      genderId,
      firstName,
      lastName,
      dui,
      dateOfBirth,
      phoneNumber,
      addresses,
      photoUrl,
      roleId,
    } = req.body;
    if (!email)
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    if (!email.trim())
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    let userFound = await User.findOne({ where: { email } });
    if (userFound)
      return res.status(400).json({
        message: `email already in use`,
      });
    if (!dui)
      return res
        .status(400)
        .json({ message: "dui is required for the request" });
    if (!dui.trim())
      return res
        .status(400)
        .json({ message: "dui is required for the request" });
    if (!phoneNumber)
      return res
        .status(400)
        .json({ message: "phoneNumber is required for the request" });
    if (!phoneNumber.trim())
      return res
        .status(400)
        .json({ message: "phoneNumber is required for the request" });
    let personFound = await Person.findOne({
      where: { [Op.or]: [{ dui }, { phoneNumber }] },
    });
    if (personFound)
      return res.status(400).json({
        message: `${personFound.dui === dui ? "dui" : ""} ${
          personFound.phoneNumber === phoneNumber ? "phoneNumber" : ""
        } already in use`,
      });
    if (req.decoded.roleId < 1 || req.decoded.roleId > 3)
      return res
        .status(403)
        .json({ message: "You don't have permission to create a user" });
    if (req.decoded.roleId == 2 && roleId == 1)
      return res.status(403).json({
        message: "you don't have the permissions to create this type of users",
      });
    if (req.decoded.roleId > 0 && req.decoded.roleId < 4) {
      if (!roleId)
        return res
          .status(403)
          .json({ message: "you must specify a user role" });
      if (typeof roleId != "number")
        return res.status(400).json({
          message: "roleId must be a numerical value",
        });
      if (roleId < 1 || roleId > 4)
        return res
          .status(400)
          .json({ message: "roleId must be between 1 and 4" });
    }
    if (req.decoded.roleId == 3) roleId = 4;
    if (!genderId)
      return res
        .status(400)
        .json({ message: "genderId is required for the request" });
    if (typeof genderId != "number")
      return res
        .status(400)
        .json({ message: "genderId should be a numerical value" });
    const genderFound = await Gender.findByPk(genderId);
    if (!genderFound)
      return res.status(400).json({ message: "genderId not found" });
    if (!firstName)
      return res
        .status(400)
        .json({ message: "firstName is required for the request" });
    if (!firstName.trim())
      return res
        .status(400)
        .json({ message: "firstName is required for the request" });
    if (!lastName)
      return res
        .status(400)
        .json({ message: "lastName is required for the request" });
    if (!lastName.trim())
      return res
        .status(400)
        .json({ message: "lastName is required for the request" });
    if (!dui)
      return res
        .status(400)
        .json({ message: "dui is required for the request" });
    if (!dui.trim())
      return res
        .status(400)
        .json({ message: "dui is required for the request" });
    if (!dateOfBirth)
      return res
        .status(400)
        .json({ message: "dateOfBirth is required for the request" });
    if (!dateOfBirth)
      return res
        .status(400)
        .json({ message: "dateOfBirth is required for the request" });

    if (!addresses)
      return res
        .status(400)
        .json({ message: "addresses is required for the request" });
    if (addresses.length === 0)
      return res
        .status(400)
        .json({ message: "addresses is required for the request" });
    const errorMessage = addresses.map((address) => {
      if (!address.provinceId) return "provinceId is required for the request";
      if (typeof address.provinceId != "number")
        return "provinceId should be a numerical value";
      if (!address.location) return "location is required for the request";
      if (!address.location.trim())
        return "location is required for the request";
    });
    if (errorMessage)
      if (errorMessage.length > 0 && errorMessage[0])
        return res.status(400).json({ message: errorMessage[0] });
    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await User.create({ email, active: false, roleId });
        const personalData = await Person.create({
          userId: user.id,
          genderId,
          firstName,
          lastName,
          dui,
          dateOfBirth: new Date(dateOfBirth),
          phoneNumber,
          photoUrl: photoUrl || null,
        });
        addresses.forEach(async (address) => {
          await Address.create({
            personId: personalData.id,
            provinceId: address.provinceId,
            street: address.street,
            number: address.number,
            location: address.location,
          });
        });
        if (roleId < 4) {
          await Employee.create({ personId: personalData.id });
        } else {
          await Customer.create({ personId: personalData.id });
        }
        return user.email;
      });
      return res.status(200).json({ email: result });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const sigin = async (req, res) => {
  try {
    const {
      email,
      genderId,
      firstName,
      lastName,
      dui,
      dateOfBirth,
      phoneNumber,
      addresses,
      photoUrl,
    } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    }
    if (!email.trim()) {
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    }

    if (!genderId) {
      return res
        .status(400)
        .json({ message: "genderId is required for the request" });
    }

    if (typeof genderId != "number") {
      return res
        .status(400)
        .json({ message: "genderId should be a numerical value" });
    }

    if (!firstName) {
      return res
        .status(400)
        .json({ message: "firstName is required for the request" });
    }
    if (!firstName.trim()) {
      return res
        .status(400)
        .json({ message: "firstName is required for the request" });
    }

    if (!lastName) {
      return res
        .status(400)
        .json({ message: "lastName is required for the request" });
    }
    if (!lastName.trim()) {
      return res
        .status(400)
        .json({ message: "lastName is required for the request" });
    }

    if (!dui) {
      return res
        .status(400)
        .json({ message: "dui is required for the request" });
    }
    if (!dui.trim()) {
      return res
        .status(400)
        .json({ message: "dui is required for the request" });
    }

    if (!dateOfBirth) {
      return res
        .status(400)
        .json({ message: "dateOfBirth is required for the request" });
    }

    if (!dateOfBirth) {
      return res
        .status(400)
        .json({ message: "dateOfBirth is required for the request" });
    }

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ message: "phoneNumber is required for the request" });
    }

    if (!phoneNumber.trim()) {
      return res
        .status(400)
        .json({ message: "phoneNumber is required for the request" });
    }

    if (!addresses) {
      return res
        .status(400)
        .json({ message: "addresses is required for the request" });
    }
    if (addresses.length === 0) {
      return res
        .status(400)
        .json({ message: "addresses is required for the request" });
    }
    const errorMessage = addresses.map((address) => {
      if (!address.provinceId) {
        return "provinceId is required for the request";
      }
      if (typeof address.provinceId != "number") {
        return "provinceId should be a numerical value";
      }
      if (!address.location) {
        return "location is required for the request";
      }
      if (!address.location.trim()) {
        return "location is required for the request";
      }
    });
    if (errorMessage) {
      if (errorMessage.length > 0 && errorMessage[0])
        return res.status(400).json({ message: errorMessage[0] });
    }
    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await User.create({ email, active: false });
        await UserRole.create({ userId: user.id, roleId: 3 });
        const personalData = await Person.create({
          userId: user.id,
          genderId,
          firstName,
          lastName,
          dui,
          dateOfBirth: new Date(dateOfBirth),
          phoneNumber,
          photoUrl: photoUrl || null,
        });
        addresses.forEach(async (address) => {
          await Address.create({
            personId: personalData.id,
            provinceId: address.provinceId,
            street: address.street,
            number: address.number,
            location: address.location,
          });
        });
        return user;
      });
      jwt.sign(
        { userId: result.id },
        process.env.KEY,
        { expiresIn: 84600 },
        (err, token) => {
          if (err) {
            return res.status(500).json({ message: "Internal server error" });
          }
          return res.status(200).json({ token });
        }
      );
    } catch (error) {
      res.status(400).json({ message: error.original.detail });
    }
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    }
    if (!email.trim()) {
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    }

    if (!password) {
      return res
        .status(400)
        .json({ message: "password is required for the request" });
    }
    if (!password.trim()) {
      return res
        .status(400)
        .json({ message: "password is required for the request" });
    }
    let userFound = await User.findOne({
      where: { email },
      attributes: ["email", "password"],
    });
    if (!userFound) {
      return res.status(401).json({ message: "User not found" });
    }
    if (!compareHash(password, userFound.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    userFound = await User.findOne({
      where: { email },
      attributes: ["email", "id"],
      include: [
        {
          model: Person,
          attributes: [
            "firstName",
            "lastName",
            "dateOfBirth",
            "phoneNumber",
            "dui",
            "photoUrl",
          ],
          include: [
            {
              model: Address,
              attributes: ["street", "number", "location"],
              include: [
                {
                  model: Province,
                  attributes: ["name", "zipCode"],
                  include: [{ model: Country, attributes: ["name"] }],
                },
              ],
            },
            {
              model: Gender,
              attributes: ["name"],
            },
            {
              model: Employee,
            },
            {
              model: Customer,
            },
          ],
        },
        {
          model: Role,
          attributes: ["id", "name"],
        },
      ],
    });
    jwt.sign(
      { user: userFound.id, roleId: userFound.Role.id },
      process.env.KEY,
      { expiresIn: 84600 },
      (err, token) => {
        if (err) {
          return res.status(500).json({ message: "Internal server error" });
        }
        return res.status(200).json({ userFound, token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    }
    if (!email.trim()) {
      return res
        .status(400)
        .json({ message: "email is required for the request" });
    }
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(200).json({ message: "avaliable" });
    }
    return res.status(400).json({ message: "not avaliable" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

export const validationToken = async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res
        .status(400)
        .json({ message: "token is required for the request" });
    }
    if (!token.trim()) {
      return res
        .status(400)
        .json({ message: "token is required for the request" });
    }
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        return res.status(400).json({ message: "Invalid token" });
      }
      return res.status(200).json({ message: "Token valid" });
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};
