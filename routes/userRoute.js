import express from 'express';
import { User } from '../models/userModel.js';

const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = {
            username: req.body.username,
            password:req.body.password,
            email: req.body.email,

            // Add other required fields as needed
        };
        const user = await User.create(newUser);
        return res.status(201).send(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Get all users
/*router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            count: users.length,
            data: users
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});*/

// Get one user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        return res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Update a user by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User updated successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send({ message: error.message });
    }
});

router.get("/", async (req, res) => {
    const { username } = req.query;
  
    try {
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Adjust the response as needed
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error fetching user:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  });

  router.post("/users/verify-password", async (req, res) => {
    const { userId, password } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Replace with your actual password verification logic
      if (user.password !== password) {
        return res.status(400).json({ message: "Incorrect password" });
      }
  
      // Password verification successful
      return res.status(200).json({ message: "Password verified successfully" });
    } catch (error) {
      console.error("Error verifying password:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  });

export default router;
