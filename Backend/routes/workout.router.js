import e from "express";
import { createWorkout,getWorkout,update,getIncompleteWorkouts } from "../controllers/workout.controller.js";
import { protectRoute } from '../middlewares/auth.middleware.js';

export const WorkoutRouter = e.Router()
WorkoutRouter.post('/create',protectRoute,createWorkout);
WorkoutRouter.get('/get',protectRoute,getWorkout)
WorkoutRouter.put('/update/:id',update);
WorkoutRouter.get('/incomplete',protectRoute,getIncompleteWorkouts)


