import { WorkoutModel } from "../models/workout.model.js";

export const createWorkout = async(req,res)=>{
try {
    const userId = req.user._id;
    const {type,target,unit,completed} = req.body;

    const newWokr = await WorkoutModel.create({userId,type,unit,completed,target});
    res.status(200).json(newWokr)
} catch (e) {
    res.status(500).json({message:'create workout error'})
    console.log('reate workout error',e);
    }   
};



export const getWorkout = async(req,res)=>{
    try {
        const userId = req.user._id;
        
    
        const allWokr = await WorkoutModel.find({userId})
        res.status(200).json(allWokr)
    } catch (e) {
        res.status(500).json({message:'get workout error'})
        console.log('get workout error');
        } 
};

export const getIncompleteWorkouts = async (req, res) => {
  try {
      const userId = req.user._id;
      
      // Find workouts where target is greater than completed
      const incompleteWorkouts = await WorkoutModel.find({
          userId,
          $expr: { $gt: ["$target", "$completed"] }
      });
      
      res.status(200).json(incompleteWorkouts);
  } catch (e) {
      res.status(500).json({ message: 'Error fetching incomplete workouts' });
      console.log('Error fetching incomplete workouts:', e);
  }
};



// app.put('/workout/update/:id', authenticateToken,
export const update =   async (req, res) => {
    try {
      const workoutId = req.params.id;
      const updatedData = req.body;
      // Update logic here (e.g., MongoDB update operation)
      const updatedWorkout = await WorkoutModel.findByIdAndUpdate(workoutId, updatedData, { new: true });
      if (!updatedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
      res.json(updatedWorkout);
    } catch (error) {
      res.status(500).json({ message: 'Error updating workout' });
    }
  };