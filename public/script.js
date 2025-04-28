  

  document.getElementById("searchRoom").addEventListener('submit', async(e) =>{

    e.preventDefault();

    const location = document.getElementById("location").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    console.log(checkIn,checkOut);
    

    const res = await fetch(`http://localhost:5000/api/rooms/search?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}&check_in=${checkIn}&check_out=${checkOut}`);

    const data = await res.json();

    const results = document.querySelector("#roomResults");

    results.innerHTML = '';

    if(data.length === 0 ){
        results.innerHTML = "<p>No rooms found. </p>";
        return;
    }
      // show each available room 
    
      data.forEach( (room) => {

        const div = document.createElement('div');

        div.classList.add("room");//this 'room' is different ,for applying css

        div.innerHTML = `<h3> ${room.title}</h3> 
               <p>${room.description}</p> <p><strong> Price: </strong> ${room.price}</p> 
               <p> <strong> Location: </strong> ${room.location}</p> 
               <button class=" book-btn " data-room-id = " ${room.id} ">Book Now </button> `;

        results.appendChild(div);
      
    });

    // addEventListener to each "Book Now" button

    const bookBtns = document.querySelectorAll('.book-btn');

    bookBtns.forEach( (buttn) => {

        buttn.addEventListener('click', async (event) => {

          const roomId = buttn.dataset.roomId;
          
          const checkIn = document.querySelector("#checkIn").value;

          const checkOut = document.querySelector("#checkOut").value;

          const userId = 1 // it must be dynamic;

          

          const bookingData = {
            user_id: userId,
            room_id: roomId,
            check_in: checkIn,
            check_out: checkOut
          };

          

          const response = await fetch('http://localhost:5000/api/bookings/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' } ,
            body: JSON.stringify(bookingData)
        });
        

            if(response.ok){
                alert(`Booking succesful !`);//${roomTitle};
            }else{
                const errorMessage = await response.text();
                alert(`Booking failed: ${errorMessage}`);
            }

        });
    });
});