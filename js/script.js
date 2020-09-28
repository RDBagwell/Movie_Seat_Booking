const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = +movieSelect.value;

function updateSlectedCount() {
    const selectedSeats = document.querySelectorAll('.row .selected');
    const seatCount = selectedSeats.length;
    const selectedSeatIndex = [...selectedSeats].map( seat=> [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatIndex));
    
    count.textContent = seatCount;
    total.textContent = seatCount * ticketPrice;
}

function setMovieData(movieIndex, moviePrice) {
    if(!moviePrice){
        localStorage.removeItem('selectedMovieIndex');
        localStorage.removeItem('selectedMoviePrice');
    } else {
        localStorage.setItem('selectedMovieIndex', movieIndex);
        localStorage.setItem('selectedMoviePrice', moviePrice);
    }

}

function clearStorage() {
    localStorage.removeItem('selectedMovieIndex');
    localStorage.removeItem('selectedMoviePrice');
    localStorage.removeItem('selectedSeats');
    movieSelect.selectedIndex = 0;
}

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    const selectedMoviePrice = localStorage.getItem('selectedMoviePrice');

    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
        count.textContent = selectedSeats.length;
    } else {
        clearStorage();
    }

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }

    if(selectedMoviePrice !== null){
        ticketPrice = selectedMoviePrice;
    }

}

container.addEventListener('click', (e)=>{
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSlectedCount();
    }
});

movieSelect.addEventListener('change', e=>{
    ticketPrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSlectedCount();
});

populateUI();
updateSlectedCount();