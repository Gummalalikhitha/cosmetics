// // // const express = require("express");
// // // const router = express.Router();
// // // const bcrypt = require("bcryptjs");
// // // const User = require("../models/User");
// // // const jwt = require("jsonwebtoken");
// // // // Register Route
// // // router.post("/register", async (req, res) => {
// // //   const { name, email, phone, password, confirmPassword } = req.body;

// // //   if (!name || !email || !phone || !password || !confirmPassword) {
// // //     return res.status(400).json({ success: false, message: "All fields are required" });
// // //   }

// // //   if (password !== confirmPassword) {
// // //     return res.status(400).json({ success: false, message: "Passwords do not match" });
// // //   }

// // //   try {
// // //     const existing = await User.findOne({ email });
// // //     if (existing) {
// // //       return res.status(400).json({ success: false, message: "User already exists with this email" });
// // //     }

// // //     const hashedPassword = await bcrypt.hash(password, 10);

// // //     const newUser = new User({
// // //       name,
// // //       email,
// // //       phone,
// // //       password: hashedPassword
// // //     });

// // //     await newUser.save();

// // //     res.status(201).json({ success: true, message: "User registered successfully" });

// // //   } catch (error) {
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });

// // // router.post("/login", async (req, res) => {
// // //   const { email, password } = req.body;

// // //   try {
// // //     const existingUser = await User.findOne({ email });
// // //     if (!existingUser)
// // //       return res.json({ success: false, message: "User not found" });

// // //     const isMatch = await bcrypt.compare(password, existingUser.password);
// // //     if (!isMatch)
// // //       return res.json({ success: false, message: "Invalid password" });

// // //     const token = jwt.sign({ id: existingUser._id }, "SECRET_KEY", {
// // //       expiresIn: "1h",
// // //     });

// // //     res.json({ success: true, token });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ success: false, message: "Server error" });
// // //   }
// // // });


// // // module.exports = router;
// // routes/authRoutes.js
// const express = require("express");
// const router = express.Router();
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");

// // REGISTER
// router.post("/register", async (req, res) => {
//   try {
//     const { username, email, phone, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//       return res.status(400).json({ message: "Passwords do not match" });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(409).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       username,
//       email,
//       phone,
//       password: hashedPassword
//     });

//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully" });

//   } catch (error) {
//     res.status(500).json({ message: "Error registering user", error });
//   }
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

//     res.status(200).json({ message: "Login successful", user });
//   } catch (error) {
//     res.status(500).json({ message: "Login error", error });
//   }
// });

// // FORGOT PASSWORD
// router.post("/forgot-password", async (req, res) => {
//   const { email, newPassword } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user)
//       return res.status(404).json({ message: "User not found with this email" });

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(newPassword, salt);

//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password reset successful" });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error while resetting password" });
//   }
// });

// module.exports = router;

// // const express = require("express");
// // const router = express.Router();
// // const bcrypt = require("bcryptjs");
// // const User = require("../models/User");
// // const jwt = require("jsonwebtoken");
// // // Register Route
// // router.post("/register", async (req, res) => {
// //   const { name, email, phone, password, confirmPassword } = req.body;

// //   if (!name || !email || !phone || !password || !confirmPassword) {
// //     return res.status(400).json({ success: false, message: "All fields are required" });
// //   }

// //   if (password !== confirmPassword) {
// //     return res.status(400).json({ success: false, message: "Passwords do not match" });
// //   }

// //   try {
// //     const existing = await User.findOne({ email });
// //     if (existing) {
// //       return res.status(400).json({ success: false, message: "User already exists with this email" });
// //     }

// //     const hashedPassword = await bcrypt.hash(password, 10);

// //     const newUser = new User({
// //       name,
// //       email,
// //       phone,
// //       password: hashedPassword
// //     });

// //     await newUser.save();

// //     res.status(201).json({ success: true, message: "User registered successfully" });

// //   } catch (error) {
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });

// // router.post("/login", async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     const existingUser = await User.findOne({ email });
// //     if (!existingUser)
// //       return res.json({ success: false, message: "User not found" });

// //     const isMatch = await bcrypt.compare(password, existingUser.password);
// //     if (!isMatch)
// //       return res.json({ success: false, message: "Invalid password" });

// //     const token = jwt.sign({ id: existingUser._id }, "SECRET_KEY", {
// //       expiresIn: "1h",
// //     });

// //     res.json({ success: true, token });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: "Server error" });
// //   }
// // });
// // module.exports = router;



// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, email, phone, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });
      user.loginStatus = true;
    await user.save();

    // success
    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Login error", error });
  }
});

// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "User not found with this email" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error while resetting password" });
  }
});

module.exports = router;

