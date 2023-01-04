import Role from "../models/Role";
import { Op } from "sequelize";

export const getRoles = async (req, res) => {
  try {
    if (req.decoded.roleId === 4)
      return res.status(401).json({ message: "Unauthorized" });
    if (req.decoded.roleId === 1) {
      const roles = await Role.findAll({ attributes: ["id", "name"] });
      return res.json(roles);
    }
    if (req.decoded.roleId === 2) {
      const roles = await Role.findAll({
        attributes: ["id", "name"],
        where: { id: { [Op.ne]: 1 } },
      });
      return res.json(roles);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
