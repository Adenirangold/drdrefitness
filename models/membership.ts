import mongoose from "mongoose";

const Schema = mongoose.Schema;

const MembershipPlanSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },

  price: {
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
    },
    billingFrequency: {
      type: String,
      enum: ["monthly", "quarterly", "biannual", "annual"],
      required: true,
    },
  },
});

export default mongoose.model("MembershipPlan", MembershipPlanSchema);
