import React from 'react'
import Image from 'next/image'
import { Button } from '@nextui-org/button'
import Link from 'next/link'
function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-clean'>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h2 className='text-[60px] font-extrabold text-primary'>自分だけの</h2>
          <h2 className='text-[60px] font-extrabold text-primary'>ストーリーを作ろう</h2>
          <p className='text-xl text-primary font-light'>ちょっとした指示で、自分だけのストーリーを作ろう</p>
          <Link href={"/create-story"}>
          <Button size='lg' color='primary' className='mt-5 font-bold text-2xl px-8'>ストーリー作成</Button></Link>
        </div>
        <div>
          <Image src={"/hero.png"} alt="Hero" width={700} height={400} />
        </div>
      </div>
    </div>
  )
}

export default Hero