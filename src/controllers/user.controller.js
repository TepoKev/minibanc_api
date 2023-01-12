import Person from "../models/Person";
import User from "../models/user";
import Role from "../models/Role";
import Gender from "../models/Gender";
import Customer from "../models/Customer";
import Employee from "../models/Employee";

export const getUsers = async (req, res) => {
  try {
    if (req.decoded.roleId < 1 || req.decoded.roleId > 2)
      return res.status(403).json({ message: "Forbidden" });
    const users = await User.findAll({
      include: [
        {
          model: Person,
          attributes: { exclude: ["userId", "genderId"] },
          include: [
            { model: Gender },
            { model: Customer },
            { model: Employee },
          ],
        },
        { model: Role },
      ],
      attributes: { exclude: ["password", "roleId"] },
    });
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
