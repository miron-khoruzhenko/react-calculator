export const isLastSymbolSign = value => {
	return value && value[value.length - 1].match(/[+÷×/*%-]/gi)
}

export const deleteLastSymbol = str => {
	return str.slice(0, str.length - 1)
}

export const getFormatedString = str => {
	return (str.replace(/[^0-9.+÷×/*%-]/gi, '')
		.replace('/', '÷')
		.replace('*', '×')
		)
}

export const getFormatedStringForSum = str => {
	let result = getFormatedString(str)
	
	// Удаление лишних нулей
	result = result.replace(/(?<=[+/*%\s-])0+(?![.\d])/g, '')  // после символов или пробелов до нормального числа
								.replace(/(?<=[+/*%\s-])0+/g, '') // группы нулей в конце
								.replace(/^0+(?=[\d])/g, '') // группы нулей в начале
								.replace(/÷/g, '/')
								.replace(/×/g, '*');

	return result;
}

export const changePreviousOpeartion = (oldVal, newVal) => {
	if (isLastSymbolSign(oldVal) && isLastSymbolSign(newVal)){
		newVal = deleteLastSymbol(oldVal) + newVal[newVal.length - 1]
	}
	return newVal;
}