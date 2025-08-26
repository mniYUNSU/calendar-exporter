'use client';

import Logo from '@/components/Logo';
import TutorialModal from '@/components/TutorialModal';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { AnimatedThemeToggler } from '@/components/magicui/AnimatedThemeToggler';
import ClickSpark from './ClickSpark';
import { useTheme } from 'next-themes';

export default function NavigationBar() {
  const { theme } = useTheme();

  return (
    <ClickSpark
      sparkColor={theme === 'dark' ? '#f4f0ff' : '#4f46e5'}
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className='flex justify-between gap-2 p-4 sticky top-0 z-10 backdrop-blur bg-gradient-to-br from-ggbackground/90 to-ggprimary/5'>
        <Logo />
        <div className='flex justify-center gap-2 items-center'>
          <AnimatedThemeToggler className='p-2 rounded-full text-sm hover:bg-ggprimary/10 transition' />
          <TutorialModal />
          <LocaleSwitcher />
        </div>
      </div>
    </ClickSpark>
  );
}
