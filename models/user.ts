import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: true,
  },
  profilePicture: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    country: String,
  },

  emergencyContact: {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  membership: {
    plan: {
      type: Schema.Types.ObjectId,
      ref: "MembershipPlan",
    },
    status: {
      type: String,
      enum: ["active", "expired", "suspended", "cancelled"],
      default: "active",
    },
    startDate: Date,
    endDate: Date,
    autoRenew: {
      type: Boolean,
      default: false,
    },
  },
});
