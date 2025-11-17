import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {}

const Logo = (props: Props) => {
  return (
    <div>
        <Link href={'/'}>
        <Image
            src={'https://s3.us-west-2.amazonaws.com/www.yopronto.com/Pronto+Experiences+m+%2B+s+black+transparent.png'}
            alt='IPronto Logo'
            width={300}
            height={85}
            className='object-cover h-[75px] lg:h-[85px]'
        />
        </Link>
    </div>
  )
}

export default Logo