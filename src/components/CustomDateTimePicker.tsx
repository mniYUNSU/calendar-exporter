import { useLocale } from 'next-intl';

interface CustomDateTimePickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function CustomDateTimePicker({
  label,
  value,
  onChange
}: CustomDateTimePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div className='flex flex-col w-full'>
      <label className='mb-1 border text-sm font-medium text-white dark:text-gray-300'>
        {label}
      </label>

      <input
        type='datetime-local'
        value={value}
        onChange={handleChange}
        className='p-2 border rounded-md bg-white text-black dark:bg-gray-800 dark:text-white'
      />
    </div>
  );
}

export default CustomDateTimePicker;
