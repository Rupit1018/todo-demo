// models/todo.model.js
import { DataTypes } from "sequelize";

export const todoModel = (sequelize) => {
  const Todo = sequelize.define(
    "Todo",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      desc: {
        type: DataTypes.STRING,
      },
      orgId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "org_id",
        references: {
          model: "orgs",
          key: "id",
        },
        onDelete: "CASCADE", 
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: "user_id",
        references: { model: "users", key: "id" },
      },
    },
    {
      tableName: "todos",
      underscored: true,
    }
  );

  // ✅ Define association (to Org)
  Todo.associate = (models) => {
    Todo.belongsTo(models.Org, {
      foreignKey: "org_id", 
      onDelete: "CASCADE", 
    });
  };

  return Todo;
};  
