import Logo from '@/components/Logo';
import TutorialModal from '@/components/TutorialModal';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { AnimatedThemeToggler } from '@/components/magicui/AnimatedThemeToggler';

export default function NavigationBar() {
  return (
    <div className='flex justify-between gap-2 p-4 sticky top-0 z-10 backdrop-blur bg-gradient-to-br from-ggbackground/90 to-ggprimary/5'>
      <Logo />
      <div className='flex justify-center gap-2 items-center'>
        <TutorialModal />
        <LocaleSwitcher />
        <AnimatedThemeToggler className='rounded-full text-sm hover:bg-ggprimary/10 transition' />
      </div>
    </div>
  );
}
