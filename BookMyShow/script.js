const seatContainer = document.querySelector('.seat-container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const selectedMovie= document.getElementById('movies');
populateUI();
let ticketPrice = +selectedMovie.value;


// get date from local storage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    };

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    
    if(selectedMovieIndex !== null){
        selectedMovie.selectedIndex = selectedMovieIndex;
    }

}

// set selected movie and movie price
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// update total price and no of seats selected
function updateSelectedSeat(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const noOfSeatsSelected = selectedSeats.length;
    count.innerHTML = noOfSeatsSelected;
    total.innerHTML = noOfSeatsSelected * ticketPrice;
    //local storage logic
    const seatsIndex = [...selectedSeats].map((seat => [...seats].indexOf(seat)));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}
 

//movie selection event
selectedMovie.addEventListener('change', (event) => {
    ticketPrice = event.target.value;
    updateSelectedSeat();
    setMovieData(event.target.selectedIndex, event.target.value)
})

// seat selection event
seatContainer.addEventListener('click', (event) => {
if(event.target.classList.contains('seat') &&
!event.target.classList.contains('occupied')){
event.target.classList.toggle('selected');
updateSelectedSeat();
}
});

updateSelectedSeat();