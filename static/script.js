let currentId = 1;

document.addEventListener('DOMContentLoaded', () => {
    loadUsers();
    document.getElementById('userForm').addEventListener('submit', handleSubmit);
});

async function loadUsers() {
    try {
        const response = await fetch('/users');
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function displayUsers(users) {
    const tbody = document.querySelector('#usersTable tbody');
    tbody.innerHTML = '';
    
    users.forEach(user => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.user_id}</td>
            <td>${user.user_fullname}</td>
            <td>${user.user_nickname}</td>
            <td>${user.user_username}</td>
            <td>${user.user_email}</td>
            <td>${user.user_phone}</td>
            <td>
                <button onclick="editUser(${user.user_id})" class="action-btn edit-btn">Edit</button>
                <button onclick="deleteUser(${user.user_id})" class="action-btn delete-btn">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

async function handleSubmit(e) {
    e.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const user = {
        user_id: userId || currentId,
        user_fullname: document.getElementById('fullName').value,
        user_nickname: document.getElementById('nickName').value,
        user_username: document.getElementById('username').value,
        user_email: document.getElementById('email').value,
        user_phone: document.getElementById('phone').value
    };

    try {
        const url = userId ? `/users/${userId}` : '/users';
        const method = userId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (response.ok) {
            if (!userId) currentId++;
            resetForm();
            loadUsers();
        } else {
            console.error('Error saving user:', await response.text());
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function editUser(id) {
    try {
        const response = await fetch(`/users/${id}`);
        const user = await response.json();
        
        document.getElementById('userId').value = user.user_id;
        document.getElementById('fullName').value = user.user_fullname;
        document.getElementById('nickName').value = user.user_nickname;
        document.getElementById('username').value = user.user_username;
        document.getElementById('email').value = user.user_email;
        document.getElementById('phone').value = user.user_phone;
    } catch (error) {
        console.error('Error loading user:', error);
    }
}

async function deleteUser(id) {
    if (confirm('Are you sure you want to delete this user?')) {
        try {
            const response = await fetch(`/users/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                loadUsers();
            } else {
                console.error('Error deleting user:', await response.text());
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

function resetForm() {
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
}