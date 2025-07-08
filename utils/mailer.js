import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (to, otpCode) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'تأكيد البريد الإلكتروني',
    html: `
    <div style="font-family: 'Tahoma', sans-serif; background-color: #f9f9f9; padding: 20px; border-radius: 10px; direction: rtl; text-align: right; color: #333;">
      <h2 style="color: #2e86de;">مرحبًا بك في نظام تحاليل الطبية </h2>
      <p>شكرًا لتسجيلك معنا.</p>
      <p>لإتمام عملية التسجيل، يرجى استخدام رمز التحقق التالي:</p>
      <div style="font-size: 28px; font-weight: bold; background-color: #eaf4ff; padding: 15px; border-radius: 8px; text-align: center; color: #2e86de;">
        ${otpCode}
      </div>
      <p style="margin-top: 20px;">تنبيه: هذا الرمز صالح لمدة <strong>10 دقائق فقط</strong>. لا تشاركه مع أي شخص.</p>
      <hr style="margin: 30px 0;">
      <p style="font-size: 14px; color: #777;">إذا لم تقم بطلب هذا الرمز، يمكنك تجاهل هذه الرسالة بأمان.</p>
      <p style="font-size: 14px; color: #777;">مع تحياتنا،<br>فريق الدعم </p>
    </div>
  `,
  };
  await transporter.sendMail(mailOptions);
};
