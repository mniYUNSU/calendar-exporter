import { useTranslations } from 'next-intl';
import ShinyText from './ShinyText';
import { CodeXml, ContactRound } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const t = useTranslations('Home');

  return (
    <footer className='py-6 text-xs text-center flex flex-col items-center gap-6'>
      <div className='flex flex-col items-center justify-center'>
        <ShinyText
          text={t('description')}
          className='text-sm md:text-base opacity-80 text-highlightBlur'
        />
        <ShinyText
          text={t('mainTitle')}
          className='text-sm md:text-base text-highlightBlur'
        />
        <div className='p-2'>
          <Logo />
        </div>
      </div>

      <div className='flex gap-2 flex-col items-center justify-center'>
        <ShinyText text='Made by Yunsu Bae 🏃' className='text-sm' />
        <div className='flex gap-4'>
          <a
            href='https://github.com/mniYUNSU/calendar-exporter'
            target='_blank'
            rel='noopener noreferrer'
          >
            <CodeXml width={20} height={20} />
          </a>
          <a
            href='https://mniyunsu.github.io/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <ContactRound width={20} height={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
