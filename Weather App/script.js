// api key - ed6bd635b51546e9b89194536251101

// temperature result
const tempResult = document.querySelector('.temp-result');
const tempImage = document.querySelector('.temp-img');

// wind speed 
const windResult = document.querySelector('.wind-speed-result');
const windImage = document.querySelector('.wind-img');

// humidity
const humResult = document.querySelector('.humidity-result');
const humImage = document.querySelector('.humidity-img');

async function getData(cityName){

    try{
        const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=ed6bd635b51546e9b89194536251101&q=${cityName}&aqi=no`);

        if(!data.ok){
            throw new Error("Unable to fetch city.");
        }
        // parse data 
        parsed_data = await data.json();
        console.log(parsed_data);

        // updating the values
        const city = document.getElementById('city');
        city.innerText = cityName;
        
        tempResult.innerHTML = parsed_data.current['temp_c'] + `&deg C`;
        windResult.innerHTML = parsed_data.current['wind_mph'] + ` mph`;
        humResult.innerText = parsed_data.current['humidity'] + " %";
    }catch(err){
        alert('Error finding city : Please check the spelling');
    }

}

window.addEventListener('DOMContentLoaded', function(){

    const element = document.getElementById('submitCity');
    element.addEventListener('click', () => {
        // this.alert('button is clicked');
        const cityName = document.getElementById('cityName').value;
        
        if(cityName.trim() == ""){
            alert("City field can't be empty..");
        }else{
            // this.alert("You reached there");
            getData(cityName);
        }
    })

});
