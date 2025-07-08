import { DataTypes } from "sequelize";

export const orgModel = (sequelize) => {
  const Org = sequelize.define(
    "Org",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: { model: "users", key: "id" },
      },
    },
    {
      tableName: "orgs",
      underscored: true,
    }
  );

  return Org;
};
