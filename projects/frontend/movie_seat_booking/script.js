const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;

// Get data from localstorage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Update total and count
function updateSelectedCountAndAmount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    let numOfSelectedSeats = selectedSeats.length;
    count.innerText = numOfSelectedSeats;
    total.innerText = numOfSelectedSeats * ticketPrice;
}

// Save selected movie index and price
function setMovieData(e) {
    localStorage.setItem('selectedMovieIndex', e.target.selectedIndex);
    localStorage.setItem('selectedMoviePrice', e.target.value);
}


// Seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && 
        !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');

        updateSelectedCountAndAmount();
    }
});

// Movie select change event
movieSelect.addEventListener('change', (e) => {
    ticketPrice = +e.target.value;
    setMovieData(e);
    updateSelectedCountAndAmount();
});


// Initial count and total set
updateSelectedCountAndAmount();