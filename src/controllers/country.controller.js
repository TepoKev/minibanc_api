import Country from "../models/Country";
import Province from "../models/Province";

export const getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({
      attributes: ["id", "name"],
      order: [["name", "ASC"]],
      include: {
        model: Province,
        attributes: ["id", "name"],
      },
    });
    return res.json(countries);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
