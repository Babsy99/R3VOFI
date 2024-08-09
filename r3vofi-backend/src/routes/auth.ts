import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

export default router;
</function_results>

<function_results>Changes applied to r3vofi-backend\src\routes\auth.ts:
Index: c:\Users\ncten\r3vofi\r3vofi-backend\src\routes\auth.ts
===================================================================
--- c:\Users\ncten\r3vofi\r3vofi-backend\src\routes\auth.ts
+++ c:\Users\ncten\r3vofi\r3vofi-backend\src\routes\auth.ts
@@ -13,7 +13,8 @@
     await user.save();
     res.status(201).json({ message: "User created successfully" });
   } catch (error) {
-    res.status(500).json({ message: "Error creating user" });
+    console.error("Registration error:", error);
+    res.status(500).json({ message: "Error creating user", error: error.message });
   }
 });
 
@@ -36,7 +37,8 @@
     );
     res.json({ token });
   } catch (error) {
-    res.status(500).json({ message: "Error logging in" });
+    console.error("Login error:", error);
+    res.status(500).json({ message: "Error logging in", error: error.message });
   }
 });
 
</function_results>

Now that we've updated the error handling in the backend, let's check if there are any issues with the MongoDB connection. We'll look at the .env file to ensure the MongoDB URI is correctly set:

<function_calls>
<invoke name="read_file">
<parameter name="path">r3vofi-backend\.env
