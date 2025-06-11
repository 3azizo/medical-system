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
  const { name, address, phone,description } = req.body;

  if (!name) return res.status(400).json({ error: 'Lab name is required' });

  try {
    const newLab = new Lab({ name, address, phone,description});
    await newLab.save();
    res.status(201).json({ message: 'Lab created successfully', lab: newLab });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
}
// Delete a lab (permanent)
export const deleteLab = async (req, res) => {
  const { id } = req.params;
    // Check if the ID is a valid MongoDB ObjectId
   if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }
  
  try {
    const lab = await Lab.findById(id);
    await lab.deleteOne();
    if (!lab) {
      return res.status(404).json({ msg: 'Lab not found' });
    }
    res.status(200).json({ msg: 'Lab deleted successfully' });
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
