const inpVal = document.querySelector('.container .inp-sear input');
const searching = document.querySelector('.container .inp-sear i');
const weathIcon = document.querySelector(".container .info img");
const infoSpan = document.querySelector(".container .info span");
const cityPara = document.querySelector(".container .info p");
const humidity = document.querySelector(".container .footer .humidty p");
const speed = document.querySelector(".container .footer .speed p");

const mainApiKey = '23e338a328049938fb2c8293f2684d65';


inpVal.addEventListener('keyup', () => {
	if (inpVal.value === " ") {
		inpVal.value = "";
	}
})

searching.addEventListener('click', () => {
	if (inpVal.value !== "") {
		const mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inpVal.value}&appid=${mainApiKey}&units=metric`;
		getWeather(mainUrl);
	}
	inpVal.value = "";
})

window.addEventListener("keyup", (e) => {
	if (e.key === "Enter") {
		if (inpVal.value !== "") {
			const mainUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inpVal.value}&appid=${mainApiKey}&units=metric`;
			getWeather(mainUrl);
		}
		inpVal.value = "";
	}
});

async function getWeather(test) {
  await fetch(test).then((resolve) => {
    let mainResponse = resolve.json();
    return mainResponse;
  }).then((resolve) => {
		infoSpan.innerHTML = `${Math.round(resolve.main.temp)}°c`;
		cityPara.innerHTML = resolve.name;
		humidity.innerHTML = `${Math.round(resolve.main.humidity)}%`;
    speed.innerHTML = `${resolve.wind.speed}km/h`;

    if (resolve.weather[0].main === "Clear") {
			weathIcon.src = '../images/clear.png';
		} else if (resolve.weather[0].main === "Rain") {
			weathIcon.src = '../images/rain.png';
		} else if (resolve.weather[0].main === "Snow") {
			weathIcon.src = '../images/snow.png';
		} else if (resolve.weather[0].main === "Mist") {
			weathIcon.src = '../images/mist.png';
		} else if (resolve.weather[0].main === "Clouds") {
			weathIcon.src = '../images/clouds.png';
		} else if (resolve.weather[0].main === "Drizzle") {
			weathIcon.src = '../images/drizzle.png';
		}
	}).catch((reject) => {
    console.log(reject)
  })
}

