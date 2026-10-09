const app = require("./app");
require("dotenv").config();
const sequelize = require("./config/database");
const PORT = process.env.PORT || 5000;

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Database connected & synced successfully with PostgreSQL.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
