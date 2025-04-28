  

  document.getElementById("searchRoom").addEventListener('submit', async(e) =>{

    e.preventDefault();

    const location = document.getElementById("location").value;
    const minPrice = document.getElementById("minPrice").value;
    const maxPrice = document.getElementById("maxPrice").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;
 
    

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
               <button class=" book-btn " data-room-id = " ${room.id}" data-room-title="${room.title}">Book Now </button> `;

        results.appendChild(div);
      
    });

    // addEventListener to each "Book Now" button

    const bookBtns = document.querySelectorAll('.book-btn');

    bookBtns.forEach( (buttn) => {

        buttn.addEventListener('click', async (event) => {

          const roomId = buttn.dataset.roomId;
          
          const roomTitle = buttn.dataset.roomTitle;

          const checkIn = document.querySelector("#checkIn").value;

          const checkOut = document.querySelector("#checkOut").value;

          const userId = 1 // it must be dynamic;

          

          const bookingData = {
            user_id: userId,
            room_id: roomId,
            check_in: checkIn,
            check_out: checkOut
          };
        
          // before use of "localStorage.getItem('token') , we need to add token explicity by 
          // .setItem('key', 'value'); only at frontend not in backend.
          // key and value must be string;
          // each webBrower has localStoarage (like 5MB) at client site.
          const token = localStorage.getItem('token');// localStorage.getItem(key);
          

          const response = await fetch('http://localhost:5000/api/bookings/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' ,'Authorization':`Bearer ${token}`} ,
            body: JSON.stringify(bookingData)
        });
        

            if(response.ok){
                alert(`Booking succesful for ${roomTitle} !`);// you did it
            }else{
                const errorMessage = await response.text();
                alert(`Booking failed: ${errorMessage}`);
            }

        });
    });
});