'use client'

import ExistingInventory from './existingInventory/page';

export default function Home(){
  return(
    <main className="flex justify-center items-center min-h-screen bg-black">
      {/* This will simulate iPhone frame */}
      <div className='w-full max-w-[390px] h-screen overflow-hidden'>
        <ExistingInventory />
      </div>
    </main>
  ) 
}