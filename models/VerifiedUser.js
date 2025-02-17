const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    minlength: 3,  // Minimum 3 characters
    maxlength: 20, // Maximum 20 characters
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
    validator: function (v) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(v);
    },
    message: "Password must contain at least one number, one uppercase, and one lowercase letter."
    }
  },
  admin: {
    type: Boolean,
    default: false, // Default to false (not an admin)
  }
});

module.exports = mongoose.model("Verified-Users", UserSchema)
