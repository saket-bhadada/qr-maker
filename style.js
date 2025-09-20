document.getElementById('your-link').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent form from reloading the page

    const url = document.getElementById("urlinput").value;
    const form = e.target;

    const output = document.querySelector('.output');
    const qrPhoto = document.querySelector('.qr-photo');

    // Use the form's action attribute for the URL
    const actionUrl = form.action;

    // Set the image source directly to the endpoint that generates the QR code
    qrPhoto.src = `${actionUrl}?url=${encodeURIComponent(url)}`;

    output.style.display = 'block';
});
