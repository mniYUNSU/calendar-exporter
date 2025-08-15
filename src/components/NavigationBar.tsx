import Logo from '@/components/Logo';
import TutorialModal from '@/components/TutorialModal';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import ThemeToggle from '@/components/ThemeToggle';

export default function NavigationBar() {
  return (
    <div className='flex justify-between gap-2 p-4 sticky top-0 z-10 backdrop-blur bg-gradient-to-br from-background to-primary/5'>
      <Logo />
      <div className='flex justify-end gap-2'>
        <TutorialModal />
        <LocaleSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
}
