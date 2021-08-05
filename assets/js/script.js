function initMap(activity) {

	console.log(typeof activity);
  if(typeof activity === "undefined"){
  	activity = "cafe";
  }
 

    // Create the map.
    const pyrmont = { lat: 55.9903, lng: 13.5958 };
    const map = new google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 8.5,
      mapId: "8d193001f940fde3",
    });
    // Create the places service.
    const service = new google.maps.places.PlacesService(map);
    let getNextPage;
    const moreButton = document.getElementById("more");
  
    moreButton.onclick = function () {
      moreButton.disabled = true;
  
      if (getNextPage) {
        getNextPage();
      }
    };
    // Perform a nearby search.
    service.nearbySearch(
      { location: pyrmont, radius: 500, type: "shops" },
      (results, status, pagination) => {
        if (status !== "OK" || !results) return;
        addPlaces(results, map);
        moreButton.disabled = !pagination || !pagination.hasNextPage;
  
        if (pagination && pagination.hasNextPage) {
          getNextPage = () => {
            // Note: nextPage will call the same handler function as the initial call
            pagination.nextPage();
          };
        }
      }
    );
  }
  
  function addPlaces(places, map) {
    const placesList = document.getElementById("places");
  
    for (const place of places) {
      if (place.geometry && place.geometry.location) {
        const image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        new google.maps.Marker({
          map,
          icon: image,
          title: place.name,
          position: place.geometry.location,
        });
        const li = document.createElement("li");
        li.textContent = place.name;
        placesList.appendChild(li);
        li.addEventListener("click", () => {
          map.setCenter(place.geometry.location);
        });
      }
    }
  }

  function handleSubmit(event) {
    // Prevent the default submit action 
    event.preventDefault();

    // Get input elements
    let firstname = document.getElementById('firstname');
    

    // Log values to the console
    console.log('firstname', firstname.value);
   
}
document.getElementById("myBtn").addEventListener("click", handleSubmit);


// Get the modal
var modal = document.getElementById("submit");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}