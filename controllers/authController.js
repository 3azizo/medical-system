import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

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
    if (!user.isActive) {
      return res.status(403).json({ msg: 'Your account is deactivated' });
    }

    
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
  const { name, email, password, phone, location } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const updatedFields = {};

    if (name !== undefined) {
      user.name = name;
      updatedFields.name = name;
    }
    
    if (email !== undefined) {
      user.email = email;
      updatedFields.email = email;
    }
    
    if (phone !== undefined) {
      user.phone = phone;
      updatedFields.phone = phone;
    }

    if (location !== undefined) {
      user.location = location;
      updatedFields.location = location;
    }

    if (password !== undefined && password !== '') {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
      updatedFields.password = 'updated';
    }

    await user.save();

    // إعداد الاستجابة
    const responseData = {
      msg: 'Profile updated successfully',
      updatedFields: Object.keys(updatedFields),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }
    };

    // إضافة location للاستجابة فقط إذا تم تحديثها أو موجودة أصلاً
    if (location !== undefined || user.location) {
      responseData.user.location = user.location;
    }

    res.status(200).json(responseData);
  } catch (err) {
    console.error('Update profile error:', err);
    
    // معالجة أخطاء محددة
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Email or phone already exists' });
    }
    
    res.status(500).json({ 
      msg: 'Server Error',
      ...(process.env.NODE_ENV === 'development' && { error: err.message })
    });
  }
};
export const logout = async (req, res) => {
  res.status(200).json({ msg: 'Logged out successfully. Remove token client-side.' });
};
