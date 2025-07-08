import userService from "../services/user.service.js";

export const getUsers = async (req, res) => {
  try {
    const getusers = await userService.getusers();
    res.status(200).json({
      data: getusers,
      message: "Get Users...!",
    });
  } catch (error) {
    res.status(404).json({
      error: error.message,
      message: "Error to Get Users...!",
    });
  }
};
export const updateProfile = async (req, res) => {
  const userId = req.userId; 
  const { name, email, profilepic } = req.body;

  try {
    const updatedUser = await userService.updateUserProfile({
      userId,
      name,
      email,
      profilepic,
    });

    res.status(200).json({
      data: updatedUser,
      message: "Profile updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
      message: "Failed to update profile!",
    });
  }
};