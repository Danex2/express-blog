module.exports = (sequelize, type) => {
  return sequelize.define("post", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    title: type.STRING,
    text: type.STRING,
    name: type.STRING
  });
};
