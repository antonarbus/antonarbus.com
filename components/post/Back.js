'use client'

import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

export function Back(props) {
  return (
    <>
      <Link href={'/posts'} legacyBehavior>
        <a
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black'
          }}
        >
          <IoIosArrowBack style={{ width: '26px', height: '26px', color: 'black' }} /> back
        </a>
      </Link>

      <style jsx>{`
        a {
          position: fixed;
          top: 10px;
          left: 10px;
          z-index: 1;
        }
        img {
          height: 30px;
          width: auto;
          filter: contrast(0%);
        }
        img:hover {
          filter: contrast(100%);
        }
      `}</style>
    </>
  )
}
