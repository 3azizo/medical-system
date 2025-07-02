import User from "../models/User.js";
import Lab from "../models/Lab.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
// Get all medical labs
export const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().select('-password');
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const addLab = async (req, res) => {
  const { name, address, phone } = req.body;


  if (!name) {
    return res.status(400).json({ error: 'name are required' });
  }

  try {
    // 1. Create lab account as user with role = 'medical_lab'
    const email= name.toLowerCase().split(" ").join("").concat("@gmail.com");
    const password = name.split(" ").join("").concat(Math.floor(Math.random() * 1000).toString());
    console.log(email, password);
    
    const hashedPassword = await bcrypt.hash(password, 10); 

    const labUser = new User({
      name,
      email,
      password: hashedPassword,
      role: 'medical_lab',
      phone,
      address
    });

    await labUser.save();
    console.log('Lab user created:', labUser);
    const lab = new Lab({
      name,
      address,
      phone,
      isActive: true,
      userId: labUser._id 
      });

    await lab.save();

    return res.status(201).json({
      message: 'Lab and account created',
      lab,
      userAccount: {
        email: labUser.email,
        password: '•••••• (saved hashed)',
        role: labUser.role
      }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
}
// Delete a lab (permanent)
export const deleteLab = async (req, res) => {
  const { id } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    const lab = await Lab.findById(id);

    if (!lab) {
      return res.status(404).json({ error: 'Lab not found' });
    }

    // Delete associated user if applicable
    if (lab.userId) {
      await User.findByIdAndDelete(lab.userId);
    }

    // Delete the lab
    await lab.deleteOne();

    res.status(200).json({ msg: 'Lab deleted successfully' });
  } catch (err) {
    console.error('Error deleting lab:', err);
    res.status(500).json({ error: 'Server Error @3azizo' });
  }
};
// Get all normal users
export const getAllUsers = async (req, res) => {
  const users = await User.find({ role: 'user' }).select('-password');
  res.status(200).json(users);
};

// Ban user
export const banUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user || user.role !== 'user') return res.status(404).json({ msg: 'User not found' });

  user.isActive = false;
  await user.save();
  res.status(200).json({ msg: 'User banned' });
};
