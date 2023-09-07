const getArgs = (args) => {
	const res = { };
	const [executor, filename, ...rest] = args;
	rest.forEach((val, i, arr) => {
		if (val.charAt(0) === '-') {
			if( i === arr.length - 1) {
				res[val.substr(1)] = true;
			} else if (arr[i + 1].charAt(0) !== '-') {
				res[val.substr(1)] = arr[i + 1];
			} else {
				res[val.substr(1)] = true;
			}
		}
	});
	return res;
};

export { getArgs }