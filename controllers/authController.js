import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // التحقق من وجود المستخدم
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, 10);

    // إنشاء مستخدم جديد
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // حفظ المستخدم في قاعدة البيانات
    await user.save();

    // إنشاء توكن JWT
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1d' }
    );

    // إرسال الاستجابة
    res.status(201).json({ 
      success: true,
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role 
      } 
    });
    
  } catch (err) {
    console.error('Registration Error:', err);
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    console.log("----------token------");
    console.log(token);

    res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role } });
  } catch (err) {
    console.log("----------error------")
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    await user.save();

    res.status(200).json({
      msg: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
