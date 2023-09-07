#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js'
import { saveKeyValue, getKeyValue, WEATHER_DICTIONARY } from './services/storage.service.js'

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? await getKeyValue(WEATHER_DICTIONARY.city);
		// if (!city.length) throw new Error('Не задан город, задайте его через команду -s [CITY]')
		const weather = await getWeather(city);
		printWeather(weather, getIcon(weather.weather[0].icon));
	} catch(e){
		if(e.response?.status === 404) {
			printError('Неверно указан город');
		} else if (e.response?.status === 401) {
			printError('Неверно указан токен');
		} else {
			printError(e.message);
		}
	}
}

const saveToken = async (token) => {
	if(!token.length) {
		printError('Не передан токен');
		return
	}
	try{
		await saveKeyValue(WEATHER_DICTIONARY.token, token);
		printSuccess('Токен сохранен');
	} catch(e) {
		printError(e.message);
	}
}

const saveCity = async (city) => {
	if(!city.length) {
		printError('Не передан Город');
		return
	}
	try{
		await saveKeyValue(WEATHER_DICTIONARY.city, city);
		printSuccess('Город сохранен');
	} catch(e) {
		printError(e.message);
	}
}


const initCLI = () => {
	const args = getArgs(process.argv);

	if (args.h) {
		return printHelp();
	}

	if (args.s) {
		return saveCity(args.s);
	}

	if (args.t) {
		return saveToken(args.t);
	}

	return getForecast();
}

initCLI();