import React, { useRef, useState } from 'react'
import { Display } from './Display';
import { Pad } from './Pad';

import { isLastSymbolSign, deleteLastSymbol, changePreviousOpeartion, getFormatedString, getFormatedStringForSum} from './functions';

// TODO: не заменять иконки
// TODO: заменить иконки только при сумме
// TODO: сделать состояние с типом данных для handleClick при нажатии клавиатуры



export const Calculator = () => {
	const	[buttonKey, setButtonKey]		= useState(''),
				[inputValue, setInputValue] = useState(''),
				[oldValue, setOldValue]			= useState('');

	const inputRef = useRef(null);



	const getSafeResult = (event) => {
		let result = inputValue;
		if (isLastSymbolSign(result))
			result = deleteLastSymbol(result);

		result = getFormatedString(result);

		setOldValue(result);

		result = getFormatedStringForSum(result);
		
		try{
			// eslint-disable-next-line no-eval
			// result = String(parseInt(eval(result)*1000000) / 1000000);
			result = String(eval(result));
			
			if(result === 'NaN'){
				setInputValue('Undefined');
				setTimeout(allClear, 1000);
			}else if(result === 'Infinity'){
				setTimeout(allClear, 1000);
				setInputValue(result);
			}else{
				console.log(1)
				setInputValue(result);
			}
		}catch {
			allClear();
			setInputValue('Error');
			setTimeout(allClear, 1000);
		}
	}



	const allClear = () => {
		setOldValue('')
		setInputValue('');
	}



	const handleClick = (event) => {
		// DOC: Отслеживание нажатия на сам калькулятор. 
		// DOC: Проверяет тип нажатой кнопки и в зависимоти от него делает опреацию

		const dataSet = event.target.dataset;

		inputRef.current.focus()

		if(dataSet.type === 'number'){
			setInputValue(inputValue + dataSet.key);

		}else if (dataSet.type === 'operation'){
			let icon = dataSet.icon,
					key = dataSet.key

			switch (event.target.dataset.name){

				case 'allClear':
					allClear();
					break;

				case 'delete':
					setInputValue(deleteLastSymbol(inputValue));
					break

				case 'percent':
				case 'division':
				case 'multiplication':
					if(!inputValue || (inputValue.length === 1 && isLastSymbolSign(inputValue)))
						break;
				// eslint-disable-next-line no-fallthrough
				case 'subtraction':
				case 'addition':
					setInputValue(
						changePreviousOpeartion(
							inputValue, 
							inputValue + (icon || key))
					);
					break

				case 'result':
					if (!inputValue)
							break;
					getSafeResult(event);
					break;

				default:
					break;
			}

		}else if (dataSet.key === '.'){
			setInputValue(inputValue + '.');
		}
	}



	return (
		<div className='h-4/5 aspect-[3/5] max-w-[90vw] bg-[#1c1d1f] rounded-lg shadow-sm shadow-zinc-800 z-10 flex flex-col'>
			<Display 
				setButtonKey={setButtonKey}
				setInputValue={setInputValue}
				inputRef={inputRef}
				inputValue={inputValue}
				oldValue={oldValue}
				handleClick={handleClick}
				getSafeResult={getSafeResult}
				/>
			<Pad 
				buttonKey={buttonKey}
				inputValue={inputValue}
				setInputValue={setInputValue}
				getSafeResult={getSafeResult}
				handleClick={handleClick}
				inputRef={inputRef}
				/>			
		</div>
	)
}

