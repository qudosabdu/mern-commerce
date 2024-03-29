const app = require("./app");
const router = require("./routers/authRouter");
const port = process.env.PORT || 3000;
const conectDB = require("./utils/db");


conectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`App running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });

app.use("/", router);
