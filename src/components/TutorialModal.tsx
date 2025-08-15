'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export default function TutorialModal() {
  const t = useTranslations('Tutorial');
  const slides = [
    { src: '/file.svg', text: t('slide1') },
    { src: '/window.svg', text: t('slide2') },
    { src: '/download.svg', text: t('slide3') }
  ];

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const seen = typeof window !== 'undefined' ? localStorage.getItem('tutorialSeen') : 'true';
    if (!seen) {
      setOpen(true);
    }
  }, []);

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
        className="p-2 border rounded-full text-sm hover:bg-primary/10 transition"
      >
        ?
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg max-w-sm w-full text-center">
            <div className="overflow-hidden mb-4">
              <div
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${index * 100}%)` }}
              >
                {slides.map((slide, i) => (
                  <div key={i} className="w-full flex-shrink-0">
                    <Image
                      src={slide.src}
                      alt={slide.text}
                      width={80}
                      height={80}
                      className="mx-auto mb-2"
                    />
                    <p>{slide.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">
                {index + 1} / {slides.length}
              </span>
              <button onClick={next} className="px-2 py-1 border rounded">
                {t('next')}
              </button>
            </div>
            <button
              onClick={close}
              className="mt-4 px-3 py-1 border rounded w-full"
            >
              {t('close')}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

