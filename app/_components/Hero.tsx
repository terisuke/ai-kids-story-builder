import { Button } from '@nextui-org/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10 h-screen'>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                <h2 className='text-[70px] text-primary font-extrabold py-10'>あなただけのオリジナル絵本をAIが作ります</h2>
                <p className='text-2xl text-primary font-light'>あなたの思いを絵本にして、お子さんと一緒に読みましょう</p>
                <Link href={'/create-story'}>
                <Button size='lg' color='primary' 
                className='mt-5 font-bold text-2xl p-8'>絵本を作成</Button>
                </Link>
            </div>
            <div>
                <Image src={'/hero.png'} alt='hero' width={700} height={400}/>
            </div>
        </div>
    </div>
  )
}

export default Hero