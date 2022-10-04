const button = document.querySelector("button");

button.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
    console.log(navigator.geolocation.getCurrentPosition(success, error));
    button.innerText = "Allow to detect Your location";

  } else {
    button.innerText = "Your browser don`t support this"
  }
})

function success(Position) {
  button.innerText = "Detecting your location...";
  let { latitude, longitude } = Position.coords;

  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=64401ee8d3444395bfb7f3aee19d5377`)
    .then(response => response.json()).then(result => {
      let allDetails = result.results[0].components;
      let { county, postcode, country } = allDetails;

      button.innerText = `${county}, ${postcode}, ${country}`;
      console.table(allDetails);
    }).catch(() => {
      button.innerText = "Something went wrong";
    })
}

function error(PositionError) {
  if (PositionError.code === 1) {
    button.innerText = "You`re denied request";
  }
  else if (PositionError.code === 2) {
    button.innerText = "Geolocation is unavailable";
  }
  else {
    button.innerText = "Something went wrong";
  }
  button.setAttribute("disabled", "true");
}