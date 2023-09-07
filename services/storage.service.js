import { homedir } from 'os';
import path, { join } from 'path';
import { promises } from 'fs';
// import { join, basename, dirname, extname, relative, isAbsolute, resolve, sep } from 'path';

// homedir - домашняя папка пользователя
const filepath = join(homedir(), 'weather-data.json');

const WEATHER_DICTIONARY ={
	token: 'token',
	city: 'city'
}

const saveKeyValue = async (key, value) => {
	let data = { };
	if ( await isFileExists(filepath)) {
		const file = await promises.readFile(filepath);
		data = JSON.parse(file);
	}
	data[key] = value;
	await promises.writeFile(filepath, JSON.stringify(data));
	// // имя последнего файла или директории
	// console.log(basename(filepath));
	// // имя директории 
	// console.log(dirname(filepath));
	// // расширение 
	// console.log(extname(filepath));
	// // отношение определяет дествие которое нужно выполнить для перехода от 1 арг кo 2 
	// console.log(relative(filepath, dirname(filepath)));
	// // определяет абсолютный путь или нет 
	// console.log(isAbsolute(filepath));
	// // позволяет выполнить операцию относительно пути исполнения
	// console.log(resolve('..'));
	// //разделитель между файлами и папками используемый в системе
	// console.log(sep);


}

const getKeyValue = async (key) => {
	if ( isFileExists(filepath)) {
		const file = await promises.readFile(filepath);
		const data = JSON.parse(file);
		return data[key];
	}
	return undefined; 
}

const isFileExists = async (path) => {
	try {
		await promises.stat(path);
		return true;
	} catch(e) {
		return false;
	}
} 

export { saveKeyValue,  getKeyValue, WEATHER_DICTIONARY}