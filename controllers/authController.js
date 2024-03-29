const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const home = (req, res) => {
  res.status(200).send("Hello from the server side!");
};

const getProducts = (req, res) => {
  try {
    res.status(200).json({
      status: "success",
      data: {
        products: [
          {
            id: 1,
            name: "Product 1",
            price: 100,
          },
          {
            id: 2,
            name: "Product 2",
            price: 200,
          },
          {
            id: 3,
            name: "Product 3",
            price: 300,
          },
        ],
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err,
    });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: 3 });
};

const resgister = async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const response = await User.create({
      username,
      email,
      phone,
      password,
    });
    res.status(201).json({
      message: "User created successfully",
      data: response,
      createToken: createToken,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  home,
  getProducts,
  resgister,
};
