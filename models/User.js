import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum:["user","admin","medical_lab"],
      default: "user",
    },
    isActive: {
  type: Boolean,
  default: true,
}

  }
);

const User = mongoose.model('User', userSchema);

export default User;