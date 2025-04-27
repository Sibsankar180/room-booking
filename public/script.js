const searchForm = document.querySelector("#searchForm");

searchForm.addEventListener('submit', async(e) =>{

    e.preventDefault();

    const location = document.querySelector("#location").value;
    const minPrice = document.querySelector("#minPrice").value;
    const maxprice = document.querySelector("#maxPrice").value;
    const checkIn = document.querySelector("#checkIn").value;
    const checkOut = document.querySelector("#checkOut").value;

    const res = await fetch(`/api/rooms/search?location=${location}&minPrice=${minPrice}&maxPrice=${maxPrice}&check_in=${chekIn}&checkOut=${check_out}`);

    const data = await res.json();

    const results = document.querySelector("#roomResults");

    results.innerHTML = ' ';

    if(data.length === 0 ){
        results.innerHTML = "<p>No rooms found. </p>";
        return;
    }
       
    data.forEach( (room) =>{
        const div = document.createElement('div');

        div.classList.add("room");//this 'room' is different ,for applying css

        div.innerHTML = `<h3> ${room.title}</h3> 
               <p>${room.description}</p> <p> <strong> Price: </strong> ${room.price}</p> 
               <p> <strong> Location: </strong> ${room.location}</p>`;

        results.appendChild(div);

        
    });

    
});