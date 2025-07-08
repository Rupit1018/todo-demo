// services/org.service.js
import { sequelize } from "../config/db.js";
import { orgModel } from "../models/org.model.js";

const Org = orgModel(sequelize);

const createorg = async ({ name, userId }) => {
  const createOrg = await Org.create({ name, userId }); // ✅ now works
  return createOrg;
};

const updateorg = async ({ name, id, userId }) => {
  return await Org.update(
    { name },
    { where: { id, userId: userId }, returning: true }
  );
};

const getorgs = async () => {
  return await Org.findAll();
};
const getorg = async ({ userId }) => {
  return await Org.findAll({ where: { userId } });
};
const deleteorg = async ({ id, userId }) => {
  return await Org.destroy({ where: { id, userId } });
};
export default { createorg, updateorg, getorgs, deleteorg, getorg };
