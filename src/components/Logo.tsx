'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { AnimatedGradientText } from './magicui/AnimatedGradientText';

interface LogoProps {
  /**
   * Size in pixels for both width and height of the logo image.
   * Text size will be scaled based on this value.
   */
  size?: number;
  /**
   * Layout direction for image and text
   */
  direction?: 'horizontal' | 'vertical';
}

export default function Logo({
  size = 40,
  direction = 'horizontal'
}: LogoProps) {
  const t = useTranslations('Home');
  const title = t('title');

  const flexDirection = direction === 'vertical' ? 'flex-col' : 'flex-row';

  return (
    <div className={`flex ${flexDirection} items-center gap-2`}>
      <Image
        src='/logo_sukegene.png'
        alt={title}
        width={size}
        height={size}
        priority
      />

      <AnimatedGradientText
        colorFrom='#42ace5'
        colorTo='#871ef7'
        className='font-bold tracking-tight text-[20px]'
      >
        {title}
      </AnimatedGradientText>
    </div>
  );
}
