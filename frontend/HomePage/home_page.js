



document.addEventListener("DOMContentLoaded", () => {
    // Retrieve user data from localStorage
    const user = JSON.parse(localStorage.getItem("user"));

    // Select elements
    const nameElement = document.getElementById("name");
    const emailElement = document.getElementById("email");
    const profileImg = document.getElementById("profile-image");

    // Check if user data exists before updating the DOM
    if (user) {
        if (user.name) nameElement.textContent = user.name;
        if (user.email) emailElement.textContent = user.email;
        if (user.profilePic) {
            profileImg.src = user.profilePic;
        } else {
            // Default profile image if user has no image
            profileImg.src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23ffffff' viewBox='0 0 24 24'%3E%3Cpath d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/%3E%3C/svg%3E";
        }
    } else {
        console.warn("No user data found in localStorage");
    }

    // Function to fetch workouts
    async function fetchWorkouts() {
        try {

            const response = await fetch("http://localhost:3000/workout/incomplete", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.token}` // Send token in Authorization header
                }
            });
            
            const data = await response.json();

            if (!Array.isArray(data)) {
                console.error("Invalid data format:", data);
                return;
            }

            const workoutGrid = document.querySelector(".workout-grid");
            workoutGrid.innerHTML = ""; // Clear previous content

            data.forEach((workout) => {
                const workoutCard = document.createElement("div");
                workoutCard.style.backgroundColor = " #e98a8a"; 

                workoutCard.classList.add("workout-card");

                workoutCard.innerHTML = `
                    <h3>${workout.type}</h3>
                    <p>Target: ${workout.target} ${workout.unit}</p>
                    <p>Achieved: ${workout.completed} ${workout.unit}</p>
                `;

                workoutGrid.appendChild(workoutCard);
            });
        } catch (error) {
            console.error("Error fetching workouts:", error);
        }
    }

    // Call fetchWorkouts when the page loads
    fetchWorkouts();
});
