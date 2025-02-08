import React from 'react'

export default function Loading() {
  return (
    <div className=' w-full h-screen bg-slate-900 flex flex-col items-center justify-center'>
        <div className=' pulse p-2 bg-none'>
            <img src="/C.png" alt="" width={50} />

        </div>
        {/* <div className=' spinner'>

        </div> */}
    </div>
  )
}
