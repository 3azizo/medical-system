import TestResult from '../models/TestResult.js';
import sendNotification from '../utils/sendNotification.js';
export const addTestResult = async (req, res) => {
  const { testType, values, userId } = req.body;

  try {
    // لو المرسل هو معمل لازم يرسل userId
    const userToAssign = req.user.role === 'medical_lab' ? userId : req.user.id;

    const result = new TestResult({
      user: userToAssign,
      testType,
      values,
      addedBy: req.user.id,
    });

    await result.save();
    if (req.user.role === 'medical_lab') {
  await sendNotification(userToAssign, `تمت إضافة نتيجة تحليل جديدة (${testType}) لحسابك.`);
}

    res.status(201).json({ msg: 'Test result added', result });
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};

export const getUserResults = async (req, res) => {
  try {
    const results = await TestResult.find({ user: req.user.id }).sort({ date: -1 });
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ msg: 'Server Error' });
  }
};
export const shareResult = async (req, res) => {
  const result = await MedicalTestResult.findById(req.params.id);

  if (!result || result.user.toString() !== req.user.id)
    return res.status(403).json({ msg: 'Access denied' });

  result.sharedWith.push(req.body.userId);
  await result.save();

  res.status(200).json({ msg: 'Shared successfully' });
};
