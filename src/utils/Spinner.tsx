interface SpinnerProps {
  size?: number | string;
  color?: string;
  className?: string;
}

export default function Spinner({
  size = 40,
  color = '#33aa44',
  className = '',
}: SpinnerProps) {
  return (
    <div
      className={`spinner-container ${className}`}
      style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke={color}
        strokeWidth='3'
        strokeLinecap='round'
        strokeLinejoin='round'
        style={{ animation: 'spin 1s linear infinite' }}
      >
        <path d='M21 12a9 9 0 1 1-6.219-8.56' />
      </svg>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
