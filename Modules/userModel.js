import mongoose from "mongoose"; // import mongoose

const userSchema = new mongoose.Schema({
  // first name
  firstn: {
    type: String,
    required: true,
  },
  // last name
  lastn: {
    type: String,
    required: true,
  },
  // email
  email: {
    type: String,
    required: true,
    unique: true,
  },
  // password
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", userSchema); // export the model