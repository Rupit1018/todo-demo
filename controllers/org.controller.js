// controllers/org.controller.js
import orgService from "../services/org.service.js";

export const getOrgs = async (req, res) => {
  try {
    const getorgs = await orgService.getorgs();
    res.status(200).json({
      data: getorgs,
      message: "Get Orgs...!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to Get Orgs...!",
    });
  }
};

export const createorg = async (req, res) => {
  const { name } = req.body;
  const userId = req.userId;

  try {
    if (!name) throw new Error("name is required");
    if (!userId) throw new Error("Authenticated userId missing");

    const newOrg = await orgService.createorg({ name, userId });

    return res.status(200).json({
      data: newOrg,
      message: "Org created successfully!",
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
      message: "Error creating Org.",
    });
  }
};

export const updateorg = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.userId;
  try {
    const [updateorg] = await orgService.updateorg({ name, id, userId });
    res.status(200).json({
      data: updateorg,
      message: "Update organization successfully.....!",
    });
  } catch (error) {
    return res.status(400).json({
      error: err.message,
      message: "Error update Org.",
    });
  }
};

export const deleteorg = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  try {
    const delteorg = await orgService.deleteorg({ id, userId });
    res.status(200).json({
      data: delteorg,
      message: "Delete organization Sucessfully.....!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to Delete organization.....!",
    });
  }
};

export const getOrg = async (req, res) => {
  const userId = req.userId;
  if (!userId) return res.status(401).json({ error: "Unauthenticated" });
  try {
    const getorg = await orgService.getorg({ userId });
    res.status(200).json({
      data: getorg,
      message: "Get My Org...!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to Get Org...!",
    });
  }
};
