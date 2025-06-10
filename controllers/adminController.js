import User from "../models/User.js";
import Lab from "../models/Lab.js";
// Get all medical labs
export const getAllLabs = async (req, res) => {
  try {
    const labs = await Lab.find().select('-password');
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
//add a new lab
export const addLab =async (req, res) => {
  const { name, address, phone } = req.body;

  if (!name) return res.status(400).json({ error: 'Lab name is required' });

  try {
    const newLab = new Lab({ name, address, phone });
    await newLab.save();
    res.status(201).json({ message: 'Lab created successfully', lab: newLab });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
// Delete a lab (permanent)
export const deleteLab = async (req, res) => {
  try {
    const lab = await User.findById(req.params.id);
    if (!lab || lab.role !== 'medical_lab') {
      return res.status(404).json({ msg: 'Lab not found' });
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: 'Lab deleted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const softDeleteLab = async (req, res) => {
  try {
    const lab = await User.findById(req.params.id);
    if (!lab || lab.role !== 'medical_lab') {
      return res.status(404).json({ msg: 'Lab not found' });
    }

    lab.isActive = false;
    await lab.save();

    res.status(200).json({ msg: 'Lab deactivated successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
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
