import { cva, VariantProps } from 'class-variance-authority';
import { FC } from 'react';

const buttonClasses = cva(
  [
    'rounded-2xl',
    'hover:scale-110',
    'active:scale-100',
    'transition',
    'duration-200',
    'ease-in-out',
  ], {
    variants: {
      intent: {
        primary: [
          'bg-pink-950',
          'text-pink-50',
          'border-transparent',
          'hover:bg-pink-700',
        ],
        secondary: [
          'bg-pink-300',
          'text-pink-950',
          'border-solid',
          'border-2',
          'border-pink-950',
          'hover:bg-pink-200',
        ],
        text: [
          'bg-transparent',
          'text-pink-950',
          'hover:bg-gray-400',
        ]
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
    }
  },
);

export interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonClasses> {
      type?: string;
    }

const Button: FC<ButtonProps> = ({
  children,
  className,
  intent,
  size,
  ...props
}) => {
  return (
    <button
      className={buttonClasses({ intent, size, className })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
