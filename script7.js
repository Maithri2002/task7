const userContainer = document.getElementById('userContainer');
const errorText = document.getElementById('error');
const reloadBtn = document.getElementById('reloadBtn');

async function fetchUsers() {
  userContainer.innerHTML = '';
  errorText.textContent = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();

    users.forEach(user => {
      const userCard = document.createElement('div');
      userCard.className = 'user-card';
      userCard.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;
      userContainer.appendChild(userCard);
    });
  } catch (error) {
    errorText.textContent = 'Failed to load user data. Please check your connection.';
    console.error('Error fetching users:', error);
  }
}

// Load users on initial page load
fetchUsers();

// Reload data when button is clicked
reloadBtn.addEventListener('click', fetchUsers);