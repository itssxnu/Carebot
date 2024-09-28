particlesJS.load('particles-js', 'js/particlesjs-config.json', function() {
  console.log('particles awoo');
});

//Anna panna
window.onload = function() {
    document.getElementById('username').focus();
};

//Enter kara giya :)
document.getElementById('loginForm').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
    }
});

// Mi no go without purawala ihi ihi
document.getElementById('submit').addEventListener('click', function(event) {

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();


    if (username === '' || password === '') {
        event.preventDefault()
        alert('Hadissida?? Purawala Idapan YAKO!!');
    } else {

        /*document.querySelector('.button-wrap').style.display = 'none';
        document.getElementById('loadingSpinner').style.display = 'block';


        setTimeout(() => {
            window.location.href = 'nurse.html';
        }, 2000);*/
    }   
});

document.addEventListener('touchstart', Start, false);
document.addEventListener('touchend', End, false);
document.addEventListener('touchmove', Move, false);

let alluwa = 0;
let athariya = 0;
let helluwa = 0;

function Start(event) {
    alluwa = event.touches[0].clientY;
}

function Move(event) {
    helluwa = event.touches[0].clientY;
    if (helluwa - alluwa > 50) { 
        document.documentElement.style.overflowY = 'auto';
    }
}

function End(event) {
    athariya = event.changedTouches[0].clientY;
    if (athariya - alluwa > 50) {
        setTimeout(() => {
            document.documentElement.style.overflowY = 'hidden';
        }, 1000);  // delay to allow refresh
    }
}
