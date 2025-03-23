
// *************************************** Saturday at 23:59:59 *******************************************************

import cron from 'node-cron';
import { WorkoutModel } from '../models/workout.model.js';
import connectDB from './mongodb.config.js';

// Connect to MongoDB once when the app starts
await connectDB();

const deleteOldWorkouts = async () => {
    try {
        const today = new Date();
        // Get the start of the current week (Sunday)
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - today.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        console.log("Deleting workouts before:", startOfWeek);

        // Delete workouts created before this week's start
        const result = await WorkoutModel.deleteMany({ createdAt: { $lt: startOfWeek } });

        console.log(`Deleted ${result.deletedCount} old workouts`);
    } catch (error) {
        console.error("Error deleting old workouts:", error);
    }
};

// Schedule the job to run every Saturday at 23:59:59
cron.schedule("59 59 23 * * 6", async () => {
    console.log("Running weekly cleanup task...");
    await deleteOldWorkouts();
});

console.log("Cron job scheduled to delete old workouts every Saturday at 23:59:59.");
