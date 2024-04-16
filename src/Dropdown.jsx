import React, { useState } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';

const Dropdown = ({ options, selected, sendDataToParent, title, isString }) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  return (
    <div className='w-72 font-medium text-center'>
      <span className='font-bold text-l'>{title}</span>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-slate-100 mt-4 w-full p-3 flex items-center justify-between rounded ${
          !selected && 'text-gray-700'
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + '...'
            : selected
          : 'Auswählen'}
        <BiChevronDown size={20} className={`${open && 'rotate-180'}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto w-72 rounded-2xl shadow-lg absolute z-10 ${
          open ? 'max-h-60' : 'max-h-0'
        } `}
      >
        <div className='flex items-center px-2 sticky top-0 bg-white'>
          <AiOutlineSearch size={18} className='text-gray-700' />
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder='Suchen'
            className='placeholder:text-gray-700 p-2 outline-none'
          />
        </div>
        {options?.map((option) => (
          <li
            key={option}
            className={`p-3 text-sm hover:bg-sky-600 hover:text-white border-b
            ${option === selected && 'bg-sky-600 text-white'}
            ${
              option
                ?.toString()
                .toLowerCase()
                .startsWith(inputValue.toLowerCase())
                ? 'block'
                : 'hidden'
            }`}
            onClick={() => {
              if (option !== selected) {
                sendDataToParent(option);
                setOpen(false);
                setInputValue('');
              }
            }}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropdown;
