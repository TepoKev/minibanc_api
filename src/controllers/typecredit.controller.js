import TypeCredit from "../models/TypeCredit";

export const getTypesCredit = async (req, res) => {
  try {
    const typesCredit = await TypeCredit.findAll();
    if (typesCredit) {
      return res.status(200).json(typesCredit);
    }
  } catch (error) {
    return res.status(400).json([]);
  }
};
