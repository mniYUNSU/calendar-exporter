import { Toaster } from 'react-hot-toast';

export default function Toast() {
  return (
    <Toaster
      position='top-center'
      containerClassName=''
      containerStyle={{}}
      toasterId='default'
      toastOptions={{
        // Define default options
        // className: '',
        // duration: 3000,
        // removeDelay: 1000,
        style: {
          color: 'var(--ggforeground)',
          backgroundColor: 'hsl(from var(--ggbackground) h s l / 0.8)',
          border: '2px solid',
          borderColor: 'hsl(from var(--ggprimary) h s l / 0.3)',
          boxShadow: '0 10px 15px -3px hsl(from var(--ggprimary) h s l / 0.3)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(8px)',
          fontWeight: 600, // font-semibold
          fontSize: '0.875rem', // text-sm = 14px
          lineHeight: '1.25rem' // text-sm에 해당하는 line-height (20px)
        },

        // Default options for specific types
        success: {
          duration: 3000,
          iconTheme: {
            primary: 'green',
            secondary: 'black'
          }
        }
      }}
    />
  );
}
