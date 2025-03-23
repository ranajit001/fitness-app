import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    type: {
      type: String,
      required: true
    },
    target: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      enum: ["km", "min", "hr", "reps"],
      required: true
    },
    completed: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const WorkoutModel  = mongoose.model("Workout", workoutSchema);
