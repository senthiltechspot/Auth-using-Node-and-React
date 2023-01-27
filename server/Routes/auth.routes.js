const authController = require("../Controllers/Auth.Controller.js");
const middleware = require("../Middlewares/AuthValidator.js");
module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({
      message: "Welcome to api routes",
    });
  });

  // Register
  app.post(
    "/api/register",
    middleware.Validemailandusername,
    authController.register
  );

  // Login
  app.post("/api/login", authController.login);

  // LogOut
  app.get("/api/logout", middleware.authorization, authController.logout);

  // Protected Data
  app.get("/api/protected", middleware.authorization, authController.protected);
};
