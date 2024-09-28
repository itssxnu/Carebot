particlesJS.load('particles-js', 'js/nurse.json', function() {
  console.log('particles Awa yakooo');
});


function confirmLogout(event) {
    const userConfirmed = confirm("Are you sure you want to log out?");
    if (!userConfirmed) {
        event.preventDefault();
    }
}

document.getElementById('tata').addEventListener('click', confirmLogout);
