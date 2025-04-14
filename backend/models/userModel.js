const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  upcomingMeetings: [{
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Creator' },
    emotion: String,
    dateTime: Date,
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    meetLink: String
  }]
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12); 
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;