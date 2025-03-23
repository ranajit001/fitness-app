document.addEventListener("DOMContentLoaded", () => {
    const workoutForm = document.getElementById("workoutForm");
    const workoutList = document.getElementById("workoutList");
    const messageDiv = document.getElementById("message");

    function loadWorkouts() {
        const storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
        workoutList.innerHTML = "";
        storedWorkouts.forEach((workout, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${workout.type} - ${workout.target} ${workout.unit} (${workout.completed}/${workout.target} completed)
                <button onclick="editWorkout(${index})">Edit</button>
            `;
            workoutList.appendChild(listItem);
        });
    }

    loadWorkouts();

    workoutForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(workoutForm);
        const newWorkout = {
            type: formData.get("type"),
            target: parseFloat(formData.get("target")),
            unit: formData.get("unit"),
            completed: parseFloat(formData.get("completed")) || 0,
        };

        let storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
        storedWorkouts.push(newWorkout);
        localStorage.setItem("workouts", JSON.stringify(storedWorkouts));

        try {
            const response = await fetch("http://localhost:3000/workouts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newWorkout)
            });

            const result = await response.json();
            messageDiv.textContent = result.message;
            messageDiv.style.color = "green";
        } catch (error) {
            messageDiv.textContent = "Failed to save workout. Please try again.";
            messageDiv.style.color = "red";
        }

        workoutForm.reset();
        loadWorkouts();
    });

    window.editWorkout = function (index) {
        let storedWorkouts = JSON.parse(localStorage.getItem("workouts")) || [];
        const workout = storedWorkouts[index];

        document.getElementById("type").value = workout.type;
        document.getElementById("target").value = workout.target;
        document.getElementById("unit").value = workout.unit;
        document.getElementById("completed").value = workout.completed;

        storedWorkouts.splice(index, 1);
        localStorage.setItem("workouts", JSON.stringify(storedWorkouts));
        loadWorkouts();
    };
});
