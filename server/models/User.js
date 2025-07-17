import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      required: true
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
  },
  {
    timestamps: true // Automatically add createdAt and updatedAt
  }
);

// Create and export the User model
const User = mongoose.model('User', userSchema);
export default User;
