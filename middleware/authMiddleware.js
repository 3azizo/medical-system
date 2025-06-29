import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
 if (req.user && req.user.isActive === false) {
  return res.status(403).json({ msg: 'Account is deactivated' });
}

  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ msg: 'No token, authorization denied' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // فيه id و role
    console.log("-------auth middleware-------"+decoded);
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export const verifyAdmin= (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
};
export const verifyMedical_lab= (req, res, next) => {
  if (req.user && req.user.role === 'medical_lab') {
    next();
  } else {
    return res.status(403).json({ error: 'Access denied. labs only.' });
  }
};