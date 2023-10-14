import clsx from 'clsx';

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) => {
  return (
    <div
      className={clsx(
        'rounded-2xl border-solid border-2 border-gray-200',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
