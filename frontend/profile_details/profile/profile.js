document.addEventListener('DOMContentLoaded', async function() {
  const userData = JSON.parse(localStorage.getItem('user'))

      populateProfileData(userData);



    // Handle edit button click
    document.getElementById('edit-profile-btn').addEventListener('click', function() {
      window.location.href = '../edit-profile/edit-profile.html';
    });
    


    
    // Function to populate profile data
    function populateProfileData(userData) {
      // Update header section
      document.getElementById('profile-name').textContent = userData.name;
      document.getElementById('profile-email').textContent = userData.email;
      document.getElementById('profile-height').textContent = userData.height || '--';
      document.getElementById('profile-weight').textContent = userData.weight || '--';
      
      // Update details section
      document.getElementById('detail-name').textContent = userData.name;
      document.getElementById('detail-email').textContent = userData.email;
      document.getElementById('detail-gender').textContent = userData.gender || 'Not specified';
      document.getElementById('detail-height').textContent = userData.height || '--';
      document.getElementById('detail-weight').textContent = userData.weight || '--';
      
      // Update profile image if available
      if (userData.profilePic) {
        const profileImage = document.getElementById('profile-image');
        profileImage.src = userData.profilePic;
        profileImage.style.display = 'block';
        document.getElementById('avatar-placeholder').style.display = 'none';
      }
      















      // Update tags
      const tagsContainer = document.getElementById('tags-container');
      tagsContainer.innerHTML = '';
      
      if (userData.tags && userData.tags.length > 0) {
        userData.tags.forEach(tag => {
          const tagElement = document.createElement('span');
          tagElement.classList.add('tag');
          tagElement.textContent = tag;
          tagsContainer.appendChild(tagElement);
        });
      } else {
        tagsContainer.innerHTML = '<span style="color: var(--text-light);">No tags added yet</span>';
      }
    }
  });