'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { BookOpenText, CircleArrowRight, CircleX } from 'lucide-react';
import Logo from './Logo';
import { cn } from '@/lib/utils';

export default function TutorialModal() {
  const t = useTranslations('Tutorial');
  const slides = [
    { src: '/tutorial1.png', text: t('slide1') },
    { src: '/tutorial2.png', text: t('slide2') },
    { src: '/tutorial3.png', text: t('slide3') },
    { src: '/tutorial4.png', text: t('slide4') }
  ];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const seen =
      typeof window !== 'undefined'
        ? localStorage.getItem('tutorialSeen')
        : 'true';
    if (!seen) {
      setOpen(true);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    localStorage.setItem('tutorialSeen', 'true');
    setOpen(false);
  };

  const next = () => {
    if (index < slides.length - 1) {
      setIndex(index + 1);
    } else {
      close();
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className='p-2 rounded-full text-sm hover:bg-primary/10 transition'
      >
        <BookOpenText width={20} height={20} />
      </button>
      {open &&
        createPortal(
          <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'>
            <div className='max-w-sm w-full bg-ggbackground/70 p-4 text-center backdrop-blur-sm border border-ggprimary/20 rounded-2xl shadow-lg shadow-ggprimary/10 bg-gradient-to-br from-ggbackground/100 to-ggprimary/10 text-ggforeground md:from-ggbackground/30'>
              <div className='overflow-hidden h-[400px] flex w-full flex-col gap-2'>
                <div className='mx-auto'>
                  <Logo />
                </div>
                <div
                  className='flex transition-transform duration-500'
                  style={{ transform: `translateX(-${index * 100}%)` }}
                >
                  {slides.map((slide, i) => (
                    <div key={i} className='w-full flex-shrink-0'>
                      <div className='flex flex-col items-center h-full gap-2'>
                        <Image
                          src={slide.src}
                          alt={slide.text}
                          width={400}
                          height={400}
                          className='mx-auto w-full rounded-2xl border border-ggprimary/20'
                        />
                        <div className='flex flex-col justify-center items-center text-ggforeground pt-4'>
                          <p className='text-lg font-semibold text-ggforeground'>
                            {slide.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='flex justify-between items-center'>
                <button onClick={close} className='px-2 py-1 rounded'>
                  <CircleX />
                </button>
                <div className='flex flex-row gap-1'>
                  {slides.map((slide, i) => (
                    <div
                      key={i}
                      className={cn(
                        `w-2 h-2 rounded-full bg-highlight`,
                        i === index && `bg-secondary`
                      )}
                    ></div>
                  ))}
                </div>
                <button onClick={next} className='px-2 py-1 rounded'>
                  <CircleArrowRight />
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
