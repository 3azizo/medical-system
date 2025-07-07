import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Lab from '../models/Lab.js';
import { sendOTPEmail } from '../utils/mailer.js';


export const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false,message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
      otpCode,
      otpExpiresAt,
      isVerified: false,
    });
    await user.save();
    await sendOTPEmail(email, otpCode);
    res.status(201).json({
      msg: 'Registration successful. Please check your email for the OTP.',
    })
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error'
    });
  }
};
export const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ msg: 'account not found ' });
  if (user.isVerified) return res.status(400).json({ msg: 'your account is already verified' });

  if (user.otpCode !== otp || user.otpExpiresAt < new Date()) {
    return res.status(400).json({ msg: `Invalid or expired OTP code` }); 
  }
  user.isVerified = true;
  user.otpCode = undefined;
  user.otpExpiresAt = undefined;
  await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

  res.status(200).json({token, user});
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user.isActive) {
      return res.status(403).json({ msg: 'Your account is deactivated' });
    }
    if (!user.isVerified ) {
    return res.status(401).json({ msg: 'برجاء تأكيد الإيميل قبل تسجيل الدخول' });
    }
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({ token, user:user });
  } catch (err) {
    console.log("----------error------")
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const updateProfile = async (req, res) => {
  try {
    const userRole = req.user.role;
    const userId = req.user.id;

    let updatedData = {};
    let updated;

    if (userRole === 'user') {
      const {name,email,phone,address,gender,bloodType,weight,password} = req.body;
      if (name) updatedData.name = name;
      if (email) updatedData.email = email;
      if (phone) updatedData.phone = phone;
      if (address) updatedData.address = address;
      if (gender) updatedData.gender = gender;
      if (bloodType) updatedData.bloodType = bloodType;
      if (weight) updatedData.weight = weight
      if (req.files?.profileImage?.[0]) {
        updatedData.profileImage = req.files.profileImage[0].path; 
      }
      if (password && password !== '') {
        const hashed = await bcrypt.hash(password, 10);
        updatedData.password = hashed;
      }
      updated = await User.findByIdAndUpdate(userId, updatedData, { new: true });

    } else if (userRole === 'medical_lab') {
      const {name,phone,address,workHours,password} = req.body;
      if (name) updatedData.name = name;
      if (phone) updatedData.phone = phone;
      if (address) updatedData.address = address;
      if (workHours) updatedData.workHours = workHours;
      if (req.files?.profileImage?.[0]) {
        updatedData.profileImage = req.files.profileImage[0].path;
      }
      if (req.files?.coverImage?.[0]) {
        updatedData.coverImage = req.files.coverImage[0].path;
      }

      updated = await Lab.findOneAndUpdate({ userId },updatedData,{ new: true });

      if (password && password !== '') {
        const hashed = await bcrypt.hash(password, 10);
        await User.findByIdAndUpdate(userId, { password: hashed });
      }
    }

    if (!updated) return res.status(404).json({ msg: 'Account not found' });

    res.status(200).json({
      message: 'Profile updated successfully',
      data: updated
    });

  } catch (err) {
    console.error('Update profile error:', err);
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Email or phone already exists' });
    }
    res.status(500).json({ msg: 'Server Error', error: err.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ msg: 'Logged out successfully. Remove token client-side.' });
};
