import Image from 'next/image';

export default function Footer() {
  return (
    <footer className='pt-6 text-xs opacity-60 text-center flex flex-col items-center gap-2'>
      <span>Made by Yunsu Bae - 다국어 지원 테스트 중</span>
      <div className='flex gap-4'>
        <a
          href='https://github.com/sukegene'
          target='_blank'
          rel='noopener noreferrer'
        >
          <Image src='/github.svg' alt='GitHub' width={20} height={20} />
        </a>
        <a href='/' target='_blank' rel='noopener noreferrer'>
          <Image src='/globe.svg' alt='Website' width={20} height={20} />
        </a>
      </div>
    </footer>
  );
}
