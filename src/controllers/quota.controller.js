import Quota from "../models/Quota";

export const getQuotasByCreditId = async (req, res) => {
  try {
    console.log(req.params.id);
    const quotas = await Quota.findAll({
      where: { creditId: req.params.id },
    });
    console.log("quotas", quotas);
    if (quotas) {
      return res.status(200).json(quotas);
    }
  } catch (error) {
    return res.status(400).json([]);
  }
};
