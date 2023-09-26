document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('form');
    
    form.addEventListener('submit', async (event) => {
    
    event.preventDefault();
    
    const formData = new FormData(form);
    
    try {
    
        await fetch('/api/sessions/login', {
    
        method: 'POST',
    
        body: JSON.stringify(Object.fromEntries(formData.entries())),
    
        headers: {
    
        'Content-Type': 'application/json',
    
    },
    
    })
    
    .then((response) => response.json())
    
    .then((data) => console.log(data))
    
    .catch((error) => {
    
    throw error;
    
    });
    
    } catch (error) {
    
    console.error(error);
    
    }
    
    });
    
    const logoutButton = document.getElementById('logout');
    
    logoutButton.addEventListener('click', async () => {
    
    try {
    
        await fetch('/api/sessions/logout', {
    
        method: 'GET',
    
        headers: {
    
        'Content-Type': 'application/json',
    
    },
    
    })
    
    .then((response) => {
    
        if (response.ok) {
    
            window.location.target="_blank", href = response.url;
    
        }
    
    })
    
    .catch((error) => {
    
        throw error;
    
    });
    
    } catch (error) {
    
        console.error(error);
    
    }
    
    });
    
    });