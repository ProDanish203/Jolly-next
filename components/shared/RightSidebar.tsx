import React from 'react'

export const RightSidebar = () => {
  return (
    <>
    <section className='sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-10 overflow-auto border-l-2 border-l-accentBg bg-bgDark1 px-10 pb-6 pt-28 max-xl:hidden'>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-text text-lg'>
          Suggested Communities
        </h3>
      </div>

      <div className='flex flex-1 flex-col justify-start'>
        <h3 className='text-text text-lg'>
          Suggested Users
        </h3>
      </div>

    </section>
    </>
  )
}
