"use strict";

module.exports = (
  sequelize,
  DataTypes,
  Staff,
  Customer,
  StaffCustomerFirstMessage
) => {
  const StaffCustomerMessage = sequelize.define("StaffCustomerMessages", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },

    // nextMessageId: {
    //   type: DataTypes.INTEGER,
    //   unique: true,
    //   allowNull: false,
    // },
    StaffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Staff,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Customer,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    senderIsCustomer: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    dateSend: {
      type: DataTypes.DATE,
      allowNull: false,
      unique: false,
      validate: { isDate: true },
    },
    dateReceived: {
      type: DataTypes.DATE,
      validate: { isDate: true },
    },
    dateRead: {
      type: DataTypes.DATE,
      validate: { isDate: true },
    },
  });
  /*
  StaffCustomerMessage.beforeCreate(async (instance, options) => {
    // before creating a StaffCustomerMessage, check if a first message exist between the customer and the staff
    const firstMessage = StaffCustomerFirstMessage.findByPK([
      instance.StaffId,
      instance.CustomerId,
    ]);
    if (firstMessage) {
      // If there is a first message between them and it's lastMessageId !== null, set it's lastMessageId to be the id of that message
      if (firstMessage.lastMessageId) {
        instance.prevMessageId = firstMessage.lastMessageId;
        setLastMessageId(firstMessage);
      } else {
        // otherwise if the lastMessageId === null, ie there is no other message, save the message and update lastMessageId
        setLastMessageId(firstMessage);
      }
    } else {
      // If there is no first message, create the first message and set it's lastMessageId = null
      return createStaffCustomerFirstMessage(instance);
    }
  });

  function setLastMessageId(firstMessage) {
    StaffCustomerMessage.afterSave((instance, options) => {
      firstMessage.lastMessageId = instance.id;
    });
  }

  function createStaffCustomerFirstMessage() {
    delete instance.prevMessageId;
    instance.lastMessageId = null;
    return StaffCustomerFirstMessage.create(instance);
  }
  */

  Customer.belongsToMany(Staff, {
    through: {
      model: StaffCustomerMessage, // Specify the through model
      unique: false, // Disable uniqueness constraint on the model
    },
    foreignKey: "CustomerId", // Specify the foreign key for Customer
  });

  Staff.belongsToMany(Customer, {
    through: {
      model: StaffCustomerMessage, // Same through model
      unique: false, // Disable uniqueness constraint again
    },
    foreignKey: "StaffId", // Specify the foreign key for Staff
  });
  StaffCustomerMessage.belongsTo(Staff);
  StaffCustomerMessage.belongsTo(Customer);
  Staff.hasMany(StaffCustomerMessage);
  Customer.hasMany(StaffCustomerMessage);

  return StaffCustomerMessage;
};
