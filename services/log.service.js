import chalk from 'chalk';
import dedent from	'dedent-js'

const {bgRed, bgGreen, bgCyan, bgYellow} = chalk;

const printError = (error) => {
	console.log(`${bgRed(' ERROR ')} ${error}`);
}

const printSuccess = (msg) => {
	console.log(`${bgGreen(' SUCCESS ')} ${msg}`);
}

const printHelp = () => {
	console.log(
		dedent(`${bgCyan(' HELP ')}  
		Без параметров - вывод погоды
		-s [CITY] для указания города
		-s для вывода помощи
		-t API [KEY] для сохранения токена
		`));
}

const printWeather = (res, icon) => {
	console.log(
		dedent(`${bgYellow(' WEATHER ')} Погода в городе ${res.name}
		${icon} ${res.weather[0].description}
		Температура ${res.main.temp} Ощущается как ${res.main.feels_like}
		Влажность ${res.main.humidity}
		`));
}

export {printError, printSuccess, printHelp, printWeather}
