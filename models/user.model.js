// models/user.model.js
import { DataTypes } from "sequelize";

export const userModel = (sequelize) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true },
      },
      password: { type: DataTypes.STRING, allowNull: false },
      profilepic: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png",
      },
      token: { type: DataTypes.STRING, default: "" },
    },
    {
      tableName: "users",
      underscored: true,
    }
  );

  return User;
};
