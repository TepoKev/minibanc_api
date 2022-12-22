import Address from "../models/Address";
import Country from "../models/Country";
import Gender from "../models/Gender";
import Person from "../models/Person";
import Province from "../models/Province";
import Role from "../models/Role";
import User from "../models/user";
import LegalEntity from "../models/LegalEntity";
import Subsidiaire from "../models/Subsidiarie";
import { createHash } from "./tools";
import Category from "../models/Category";
import TypeCredit from "../models/TypeCredit";
import Employee from "../models/Employee";
import FixedAsset from "../models/FixedAsset";
import Credit from "../models/Credit";
import Refinancing from "../models/Refinancing";
import Quota from "../models/Quota";
import MoratoriumInterest from "../models/MoratoriumInterest";
import Debtor from "../models/Debtor";

export const initialSetup = async () => {
  //Model synchronization
  await TypeCredit.sync({ force: true });
  await Category.sync({ force: true });
  await Subsidiaire.sync({ force: true });
  await Role.sync({ force: true });
  await Country.sync({ force: true });
  await Gender.sync({ force: true });

  await Province.sync({ force: true });

  await User.sync({ force: true });

  await Person.sync({ force: true });
  await Employee.sync({ force: true });
  await FixedAsset.sync({ force: true });
  await LegalEntity.sync({ force: true });
  await Address.sync({ force: true });
  await Credit.sync({ force: true });
  await Refinancing.sync({ force: true });
  await Quota.sync({ force: true });
  await MoratoriumInterest.sync({ force: true });
  await Debtor.sync({ force: true });
  const elSalvador = await Country.create({ name: "El Salvador" });
  await Country.create({ name: "Estados Unidos" });
  await Country.create({ name: "Honduras" });

  const sanVicente = await Province.create({
    name: "San Vicente",
    zipCode: "10008",
    countryId: elSalvador.id,
  });

  const masculino = await Gender.create({ name: "Masculino" });
  await Gender.create({ name: "Femenino" });
  await Gender.create({ name: "Otro" });

  const superAdmin = await Role.create({ name: "SuperAdmin" });
  await Role.create({ name: "Admin" });
  await Role.create({ name: "Seller" });
  await Role.create({ name: "Customer" });

  const user = await User.create({
    email: "tepokev@gmail.com",
    password: createHash("2eA$%dve923B.,"),
    active: true,
    roleId: superAdmin.id,
  });

  const person = await Person.create({
    firstName: "Kevin",
    lastName: "Portillo",
    dui: "12345678-9",
    dateOfBirth: "1998-12-12",
    phoneNumber: "12345678",
    userId: user.id,
    photoUrl: null,
    genderId: masculino.id,
  });

  await Address.create({
    street: "Calle 1",
    number: "123",
    provinceId: sanVicente.id,
    personId: person.id,
    location: "Casa",
  });
};
