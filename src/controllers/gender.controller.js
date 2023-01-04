import Gender from "../models/Gender";

export const getGenders = async (req, res) => {
  try {
    const genders = await Gender.findAll({ attributes: ["id", "name"] });
    return res.json(genders);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getGenderById = async (req, res) => {
  try {
    const { id } = req.params;
    const gender = await Gender.findOne({
      where: { id },
      attributes: ["id", "name"],
    });
    return res.json(gender);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const createGender = async (req, res) => {
  try {
    const { name } = req.body;
    const newGender = await Gender.create({
      name,
    });
    return res.json(newGender);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
