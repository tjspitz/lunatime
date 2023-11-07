import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

const inputClasses = cva(
  [
    'border-transparent',
    'border-2',
    'focus:border-solid',
    'rounded-3xl',
    'px-8',
    'py-2',
    'max-w-[400px]'
  ],
  {
    variants: {
      intent: {
        primary: [
          'text-gray-800',
        ],
        secondary: [
          'bg-pink-100',
          'text-pink-950',
        ],
        // text: ['bg-transparent', 'text-pink-950', 'hover:bg-gray-400'],
      },
      size: {
        small: ['text-sm', 'px-3', 'py-1', 'my-2'],
        medium: ['text-med', 'px-4', 'py-2', 'my-4'],
        large: ['text-xl', 'px-8', 'py-4', 'my-6', 'font-bold'],
      },
    },
    defaultVariants: {
      intent: 'primary',
      size: 'medium',
    },
  },
);

export interface InputProps
  extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputClasses> {
      required?: boolean;
      type?: string | number;
      value?: string | number;
    }

const Input: FC<InputProps> = ({
  intent,
  size,
  className,
  required,
  type,
  value,
  ...props
}) => {
  return (
    <input
      className={inputClasses({ intent, size, className })}
      {...props}
    />
  );
};

export default Input;
