const user = JSON.parse(localStorage.getItem('user')); 
 
 // Image upload handling
 document.getElementById('upload-img-btn').addEventListener('click', async function () {
  const fileInput = document.getElementById('image-upload');
  const file = fileInput.files[0];

  if (!file) {
    showMessage('Please select an image first', 'error');
    return;
  }
console.log('hhiiiiiiiiiiiiiii');

  const formData = new FormData();
  formData.append('profilePhoto', file); // ✅ Ensure field name matches backend

  try {
    const response = await fetch('http://localhost:3000/profile_photo/upload', {
      method: 'POST',
      headers: {
         'Authorization': `Bearer ${user.token}`
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const data = await response.json();
    
    user.profilePic = data.url; 
    
    console.log(user)
    localStorage.setItem('user',JSON.stringify(user)) //updating profile photo link and saving to ls
const x = localStorage.getItem('user')
console.log(JSON.stringify(x));

    // ✅ Corrected to match backend response key
    document.getElementById('profile-img').src = data.profilePic 
    showMessage('Image uploaded successfully', 'success');
  } catch (error) {
    showMessage(`Error uploading image: ${error.message}`, 'error');
  }
});












// Profile form submission
document.getElementById('profile-form').addEventListener('submit', async function(e) {
  e.preventDefault();
try {
    
  const formData = {
    name: document.getElementById('name').value.trim() || user.name,
    gender: document.getElementById('gender').value.trim() || user.gender,
    height: document.getElementById('height').value.trim() || user.height,
    weight: document.getElementById('weight').value.trim() || user.weight
  };

  const response = await  fetch('http://localhost:3000/users/update_profile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
       'Authorization': `Bearer ${user.token}`
    },
    body: JSON.stringify(formData)
  })
  const data = await response.json();
  if( response.ok){
    localStorage.setItem('user',JSON.stringify(data)); //updatin in local storage...
        showMessage('Profile updated successfully', 'success');
      window.location.href='../profile/profile.html'
  }
  
} catch (error) {
  showMessage('Error updating profile: ' + error.message, 'error');
}
});

// Cancel button
document.getElementById('cancel-btn').addEventListener('click', function() {
   window.location.href='../profile/profile.html'
});

// Show message helper
function showMessage(text, type) {
  const messageEl = document.getElementById('message');
  messageEl.textContent = text;
  messageEl.className = 'message ' + type;
  
  // Auto hide after 3 seconds
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 3000);
}