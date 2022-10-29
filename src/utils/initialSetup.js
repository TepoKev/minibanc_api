import Address from "../models/Address";
import Country from "../models/Country";
import Gender from "../models/Gender";
import Person from "../models/Person";
import Province from "../models/Province";
import Role from "../models/Role";
import User from "../models/user";
import UserRole from "../models/UserRole";
import { createHash } from "./tools";

export const initialSetup = async () => {
  //Model synchronization
  await Role.sync({ force: true });
  await Country.sync({ force: true });
  await Gender.sync({ force: true });

  await Province.sync({ force: true });

  await User.sync({ force: true });

  await Person.sync({ force: true });
  await Address.sync({ force: true });

  await UserRole.sync({ force: true });

  const elSalvador = await Country.create({ name: "El Salvador" });
  await Country.create({ name: "Estados Unidos" });
  await Country.create({ name: "Honduras" });

  const sanVicente = await Province.create({
    name: "San Vicente",
    zipCode: "10008",
    countryId: elSalvador.id,
  });

  await Gender.create({ name: "Masculino" });
  await Gender.create({ name: "Femenino" });
  await Gender.create({ name: "Otro" });

  await Role.create({ name: "SuperAdmin" });
  await Role.create({ name: "Admin" });
  await Role.create({ name: "Seller" });
  await Role.create({ name: "Customer" });

  const user = await User.create({
    email: "tepokev@gmail.com",
    password: createHash("2eA$%dve923B.,"),
    active: true,
  });

  const person = await Person.create({
    firstName: "Kevin",
    lastName: "Tejada",
    dui: "12345678-9",
    dateOfBirth: "1998-12-12",
    phoneNumber: "12345678",
    userId: user.id,
  });

  await Address.create({
    street: "Calle 1",
    number: "123",
    provinceId: sanVicente.id,
    personId: person.id,
    location: "Casa",
  });
  await UserRole.create({ userId: 1, roleId: 1 });
};
