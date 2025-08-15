'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/file.svg',
    alt: 'Project description',
    text: 'Calendar Exporter lets you create events and export them as an .ics file.'
  },
  {
    src: '/window.svg',
    alt: 'Usage instructions',
    text: 'Fill out the form with your event details and click export to download the calendar.'
  }
];

export default function TutorialModal() {
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

  const next = () => setIndex((index + 1) % slides.length);
  const prev = () => setIndex((index - 1 + slides.length) % slides.length);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="p-2 border rounded-full text-sm hover:bg-primary/10 transition"
      >
        ?
      </button>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-4 rounded shadow-lg max-w-sm w-full text-center">
            <div className="mb-4">
              <Image
                src={slides[index].src}
                alt={slides[index].alt}
                width={80}
                height={80}
                className="mx-auto mb-2"
              />
              <p>{slides[index].text}</p>
            </div>
            <div className="flex justify-between items-center">
              <button onClick={prev} className="px-2 py-1 border rounded">Prev</button>
              <span className="text-sm">
                {index + 1} / {slides.length}
              </span>
              <button onClick={next} className="px-2 py-1 border rounded">Next</button>
            </div>
            <button
              onClick={close}
              className="mt-4 px-3 py-1 border rounded w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

