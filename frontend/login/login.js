document
  .getElementById("login-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get form values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Prepare login data
    const loginData = {email, password };

    try {
      const response = await fetch(
        "http://localhost:3000/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        }
      );

      const data = await response.json();
 console.log(data);
 
      if (response.ok && data.token) {
        // Save both token and user data
        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        showMessage("Login successful! Redirecting...", "success");
        window.location.href = "../HomePage/home_page.html";
      } else {
        showMessage("Login failed", "error");
      }
    } catch (error) {
      showMessage("Error connecting to server", "error");
      console.log(error);
      
    }
  });

function showMessage(text, type) {
  const messageEl = document.getElementById("message");
  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
}
