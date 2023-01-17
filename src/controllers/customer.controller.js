import Customer from "../models/Customer";
import Person from "../models/Person";
import Address from "../models/Address";
import Province from "../models/Province";
import Country from "../models/Country";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      include: [
        {
          model: Person,
          include: [
            {
              model: Address,
              include: [
                {
                  model: Province,
                  include: [
                    {
                      model: Country,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    console.log("customers", customers);
    if (customers) {
      return res.status(200).json(customers);
    }
  } catch (error) {
    return res.status(400).json([]);
  }
};
