module.exports = (sequelize, type) => {
  return sequelize.define("user", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user: type.STRING,
    password: type.STRING //This should not be stored in plaintext
  });
};
