import React, { useEffect, useState } from 'react'
import { getFormatedString, changePreviousOpeartion} from './functions';


export const Display = (props) => {

	const [textSize, setTextSize] = useState('text-5xl');


	useEffect(() => {
		handleChangeLength(props.inputValue)
	}, [props.inputValue])



	const handleChangeLength = val => {
		//DOC: Изменение font-size при переполнении инпута

		const len = val.length + 1;

		if (len < 10)
			setTextSize('text-5xl');
		else if (17 > len && len >= 10)
			setTextSize('text-3xl');
		else if (len >= 17)
			setTextSize('text-xl');
		
	}



	const handleKeyDown = event => {
		const key = event.key;

		props.setButtonKey(event.key)

		if (props.inputValue && key === 'Enter'){
			props.getSafeResult(event);				
		}
	}




	const handleInput = event => {
		// DOC: Провекра инпута на ввод только цифр и выбранных символов
		// ? Не получилось использовать состояние, контроль происходит медленее
		let result = getFormatedString(event.target.value)

		result = changePreviousOpeartion(props.inputValue, result)
		
		props.setInputValue(result);
	}



	return (
		<div className='h-[30%] w-full p-3 pb-5	flex justify-end items-end flex-col'>

			{/* History */}
			<div className="text-md mb-1 text-zinc-500">{
			props.oldValue}</div>
			{/* Result */}
			<input
				ref={props.inputRef}
				autoFocus ={true}
				onKeyDown={handleKeyDown}
				onKeyUp={() => props.setButtonKey('')}
				onChange={(e) => {
					props.setInputValue(e.target.value)
					handleInput(e);
				}}
				value={props.inputValue}
				className={`${textSize}
					font-bold text-right 
					bg-transparent border-none w-full 
					focus:outline-none caret-zinc-700`}
			/>
		</div>
	)
}