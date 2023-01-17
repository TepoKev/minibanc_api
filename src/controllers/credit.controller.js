import Credit from "../models/Credit";
import Quota from "../models/Quota";
import User from "../models/user";
import Person from "../models/Person";
import { Op } from "sequelize";
import Address from "../models/Address";
import Gender from "../models/Gender";
import { sequelize } from "../database";
import Employee from "../models/Employee";
import Customer from "../models/Customer";

export const createCredit = async (req, res) => {
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
      amount,
      paymentPeriod,
      totalFees,
      typeCreditId,
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
    if (req.decoded.roleId == 2)
      return res.status(403).json({
        message: "you don't have the permissions to create this type of users",
      });
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
    const quotes = [];
    var quotaAmount = amount / (paymentPeriod / 30).toFixed(0);
    quotaAmount = (quotaAmount + amount * (totalFees / 100)).toFixed(2);
    console.log(req.decoded);
    userFound = await User.findOne({
      where: { id: req.decoded.user },
      include: [
        {
          model: Person,
          include: [
            {
              model: Employee,
            },
          ],
        },
      ],
    });
    console.log(userFound.Person.Employee);
    try {
      const result = await sequelize.transaction(async (t) => {
        const user = await User.create({ email, active: false, roleId: 4 });
        const personalData = await Person.create({
          userId: user.id,
          genderId,
          firstName,
          lastName,
          dui,
          dateOfBirth: new Date(dateOfBirth),
          phoneNumber,
          photoUrl: null,
        });
        console.log(addresses);
        addresses.forEach(async (address) => {
          await Address.create({
            personId: personalData.id,
            provinceId: address.provinceId,
            street: address.street,
            number: address.number,
            location: address.location,
          });
        });
        const newCustomer = await Customer.create({
          personId: personalData.id,
        });
        console.log("newCustomer.id");
        console.log(newCustomer.id);
        console.log("userFound.Person.Employee.id");
        console.log(userFound.Person.Employee.id);
        const newCredit = await Credit.create(
          {
            amount,
            paymentPeriod,
            totalFees,
            typeCreditId,
            customerId: newCustomer.id,
            employeeId: userFound.Person.Employee.id,
          },
          {
            fields: [
              "amount",
              "paymentPeriod",
              "totalFees",
              "typeCreditId",
              "customerId",
              "employeeId",
            ],
            transaction: t,
          }
        );
        for (let i = 0; i < (paymentPeriod / 30).toFixed(0); i++) {
          quotes.push({
            creditId: newCredit.id,
            amount: quotaAmount,
            paymentDate: new Date().setDate(new Date().getDate() + i * 30),
            collectionDate: null,
          });
        }
        await Quota.bulkCreate(quotes, { transaction: t });
        return newCredit;
      });
      return res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCredits = async (req, res) => {
  try {
    const credits = await Credit.findAll({
      include: [
        {
          model: Customer,
          include: [
            {
              model: Person,
            },
          ],
        },
      ],
    });
    return res.status(200).json(credits);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
