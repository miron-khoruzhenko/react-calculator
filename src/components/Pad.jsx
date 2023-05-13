import React from 'react'
import { buttons as buttonJson } from './buttons';

export const Pad = (props) => {

	// const {buttonKey, inputValue, setInputValue, getSafeResult, handleClick} = props;

	return (
		<div className='w-full h-[70%] grid grid-rows-5 grid-cols-4 gap-4 p-4 place-items-center text-zinc-300'>

			{
				buttonJson.map(item => {

					return (<div 
						key={item.id}
						onClick={props.handleClick}

						className={`h-full  rounded-full 
							${props.buttonKey === item.key ? ' bg-white text-zinc-800 ' : ''}
							${item.bgColor && props.buttonKey !== item.key  ? item.bgColor + ' hover:bg-zinc-400 ' : ''}
							${item.textColor || ''}
							${item.key === 'Enter' ? 'col-span-2 w-full' : 'aspect-square '}
							flex justify-center items-center text-xl
							cursor-pointer transition-colors select-none
							hover:bg-zinc-500 hover:text-white active:bg-white active:text-zinc-800`}
						type={item.type}
						data-type={item.type}
						data-name={item.name}
						data-key={item.key}
						data-icon={item.icon}
						>
							{item.icon || item.key}
						</div>
					)
				})
			}
		</div>
	)
}
