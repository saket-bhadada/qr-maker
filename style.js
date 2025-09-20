document.getElementById('your-link').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent form from reloading the page

    const url = document.getElementById("urlinput").value;

    try {
        // Send the URL to the backend
        const response = await fetch('/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `url=${encodeURIComponent(url)}`
        });
    
        if (response.ok) {
            // Show the output div and update the image source (with cache busting)
            const output = document.querySelector('.output');
            output.style.display = 'block';
            document.querySelector('.qr-photo').src = './qr_img.png?' + new Date().getTime();
        } else {
            const errorText = await response.text();
            alert(`Failed to generate QR code: ${errorText}`);
        }
    } catch (error) {
        console.error('Error submitting form:', error);
        alert('Could not connect to the server. Please ensure it is running and try again.');
    }
});