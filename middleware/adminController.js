import User from "../models/User.js";
// Get all medical labs
export const getAllLabs = async (req, res) => {
  try {
    const labs = await User.find({ role: 'medical_lab' }).select('-password');
    res.status(200).json(labs);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

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
