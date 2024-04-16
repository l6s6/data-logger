import React from 'react';

function Navbar() {
  return (
    <div className='h-16 bg-gray-300 items-center flex px-8 xl:mb-8 justify-between'>
      <span className='text-2xl font-bold'>
        Auswertung des Projekts "Wetterballon"
      </span>
      <span className='text-lg hidden md:block'>Leopold Scheidl</span>
    </div>
  );
}

export default Navbar;
