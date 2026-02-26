import { GlobalContext } from '@/context/GlobalWrapper'
import React, {useContext} from 'react'

export function GlobalQuoteLand() {
  const {glotrail, setGlotrail}= useContext(GlobalContext)
  return (
      <div className='mb-[102px]' style={{display: glotrail !== 0? 'none' : 'initial'}}>
           <div className='relative'>
              <div className='w-[100vw] h-[835px] lg:h-[945px] '>
                   <div className='hidden md:block h-[100%] w-[100%]'><img src="/img/global-quote-back.webp" alt="global shipping" className='w-[100%] h-[100%] object-cover ' /></div>
                   <div className='block md:hidden h-[100%] w-[100%]'><img src="/img/global-quote-back-1.webp" alt="global shipping" className='w-[100%] h-[100%] object-cover ' /></div>
              </div>
          <div className='absolute top-0'>
              <div className='bg-[#FEFEFE]/[.68] w-[90%] lg:w-[55%] lg:ml-[5%] m-auto mt-[240px] md:mt-[153px] lg:mt-[15px] py-[81px] md:py-[34px] lg:py-[64px]  '>
                <div className='w-[80%] m-auto '>
                 <h1 className='font-semibold text-[#AC0108] text-[20px] md:text-[24px] '>Get Quote</h1>
                 <p className='font-[700] text-[32px] text-[#1E1E1E] md:text-[36px] '>Ready to ship your package?, follow the procedures below</p>
                </div>
            </div>
        </div>
       </div>
      </div>
  )
}
