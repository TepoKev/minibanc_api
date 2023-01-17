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
import Customer from "../models/Customer";

export const initialSetup = async () => {
  //Model synchronization
  const force = true;
  await TypeCredit.sync({ force });
  await Category.sync({ force });
  await Subsidiaire.sync({ force });

  await Role.sync({ force });
  await Country.sync({ force });
  await Gender.sync({ force });

  await Province.sync({ force });

  await User.sync({ force });

  await Person.sync({ force });

  await Employee.sync({ force });
  await Customer.sync({ force });

  await FixedAsset.sync({ force });
  await LegalEntity.sync({ force });
  await Address.sync({ force });
  await Credit.sync({ force });
  await Refinancing.sync({ force });
  await Quota.sync({ force });
  await MoratoriumInterest.sync({ force });

  await Subsidiaire.create({ id: 0, name: "San Vicente" });
  await Subsidiaire.create({ id: 1, name: "San Salvador" });
  await Subsidiaire.create({ id: 2, name: "Santa Miguel" });

  const elSalvador = await Country.create({ name: "El Salvador" });
  await Country.create({ name: "Estados Unidos" });
  await Country.create({ name: "Honduras" });

  const sanVicente = await Province.create({
    name: "San Vicente",
    zipCode: "10008",
    countryId: elSalvador.id,
  });

  await Gender.create({ id: 1, name: "Masculino" });
  await Gender.create({ id: 2, name: "Femenino" });
  await Gender.create({ id: 3, name: "Otro" });

  await Role.create({ id: 1, name: "SuperAdmin" });
  await Role.create({ id: 2, name: "Admin" });
  await Role.create({ id: 3, name: "Seller" });
  await Role.create({ id: 4, name: "Customer" });

  await TypeCredit.create({ id: 1, name: "Crédito de Consumo" });
  await TypeCredit.create({ id: 2, name: "Crédito Hipotecario" });
  await TypeCredit.create({ id: 3, name: "Crédito de Vehículo" });
  await TypeCredit.create({ id: 4, name: "Crédito de Educación" });

  const superUser = await User.create({
    email: "tepokev@gmail.com",
    password: createHash("2eA$%dve923B.,"),
    active: true,
    roleId: 1,
  });

  const superPerson = await Person.create({
    firstName: "Kevin",
    lastName: "Portillo",
    dui: "12345678-9",
    dateOfBirth: "1998-12-12",
    phoneNumber: "12345678",
    userId: superUser.id,
    photoUrl: null,
    genderId: 1,
  });

  await Employee.create({
    personId: superPerson.id,
    subsidiarieId: 0,
  });

  await Address.create({
    street: "Calle 1",
    number: "123",
    provinceId: sanVicente.id,
    personId: superPerson.id,
    location: "Casa",
  });

  const adminUser = await User.create({
    email: "oscar@gmail.com",
    password: createHash("123456789"),
    active: true,
    roleId: 2,
  });

  const adminPerson = await Person.create({
    firstName: "Oscar",
    lastName: "Peraza",
    dui: "12545778-9",
    dateOfBirth: "1998-12-12",
    phoneNumber: "74342332",
    userId: adminUser.id,
    photoUrl: null,
    genderId: 1,
  });

  await Employee.create({
    personId: adminPerson.id,
    subsidiarieId: 1,
  });

  await Address.create({
    street: "Calle 12",
    number: "321",
    provinceId: sanVicente.id,
    personId: adminPerson.id,
    location: "Casa",
  });

  const sellerUser = await User.create({
    email: "steven@gmail.com",
    password: createHash("123456789"),
    active: true,
    roleId: 3,
  });

  const sellerPerson = await Person.create({
    firstName: "Steven",
    lastName: "Lainez",
    dui: "12505771-0",
    dateOfBirth: "1998-12-12",
    phoneNumber: "72321121",
    userId: sellerUser.id,
    photoUrl: null,
    genderId: 1,
  });

  await Employee.create({
    personId: sellerPerson.id,
    subsidiarieId: 2,
  });

  await Address.create({
    street: "Calle 123",
    number: "3214",
    provinceId: sanVicente.id,
    personId: sellerPerson.id,
    location: "Casa",
  });

  await Category.create({ name: "Automovil" });
  await Category.create({ name: "Moto" });
  await Category.create({ name: "Camioneta" });
  await Category.create({ name: "Camion" });
  await Category.create({ name: "Maquinaria" });
  await Category.create({ name: "Otros" });
};
