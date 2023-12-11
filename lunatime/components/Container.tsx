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
        'rounded-2xl border-solid border-4 border-pink-950 bg-yellow-50',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default Container;
