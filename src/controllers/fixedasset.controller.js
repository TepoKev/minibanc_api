import FixedAsset from "../models/FixedAsset";
import Subsidiaire from "../models/Subsidiarie";
import Employee from "../models/Employee";
import Category from "../models/Category";

export const createFixedAsset = async (req, res) => {
  try {
    const {
      name,
      price,
      cant,
      purchaseDate,
      purchaseStatus,
      categoryId,
      employeeId,
    } = req.body;

    const employee = await Employee.findOne({
      where: { id: employeeId },
      include: [{ model: Subsidiaire }],
    });

    const category = await Category.findOne({
      where: { id: categoryId },
    });

    const newFixedAsset = await FixedAsset.create({
      name,
      price,
      cant,
      purchaseDate,
      purchaseStatus,
      categoryId,
      employeeId,
    });
    newFixedAsset.set({
      catalogNumber: `${newFixedAsset.id}-${employee.Subsidiaire.id}-${category.id}`,
    });
    await newFixedAsset.save();

    return res.status(201).json(newFixedAsset);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getFixedAssets = async (req, res) => {
  try {
    const fixedAssets = await FixedAsset.findAll({
      include: [{ model: Employee }, { model: Category }],
    });
    return res.status(200).json(fixedAssets);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
