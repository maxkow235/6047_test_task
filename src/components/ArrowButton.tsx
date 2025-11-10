import Image from 'next/image';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  ariaLabel: string;
  onClick: () => void;
  disabled?: boolean;
};

export function ArrowButton({
  direction,
  ariaLabel,
  onClick,
  disabled = false,
}: ArrowButtonProps) {
  return (
    <button
      type='button'
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
      className={`hidden md:flex h-6 w-6 items-center justify-center leading-none ${
        disabled ? 'cursor-not-allowed opacity-30' : ''
      }`}
    >
      <Image
        src='/icons/chevron.svg'
        alt=''
        width={9}
        height={17}
        className={direction === 'left' ? 'rotate-180' : ''}
      />
    </button>
  );
}
