import Link from 'next/link'

export function Back(props) {
  return (
    <>
      <Link href={'/posts'} legacyBehavior>
        <a>
          {' '}
          <img src="/svg/back.svg" alt="back to posts" />{' '}
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
