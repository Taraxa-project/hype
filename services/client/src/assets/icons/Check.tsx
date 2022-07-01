interface CheckMarkIconProps {
  color?: string;
  width?: string;
  height?: string;
}

const CheckMarkIcon = ({ color, width, height }: CheckMarkIconProps) => {
  return (
    <i
      style={{
        minWidth: '1rem',
        textAlign: 'center',
      }}
    >
      <svg
        width={width || '14'}
        height={height || '14'}
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.00016 0.333252C3.32016 0.333252 0.333496 3.31992 0.333496 6.99992C0.333496 10.6799 3.32016 13.6666 7.00016 13.6666C10.6802 13.6666 13.6668 10.6799 13.6668 6.99992C13.6668 3.31992 10.6802 0.333252 7.00016 0.333252ZM5.66683 10.3333L2.3335 6.99992L3.2735 6.05992L5.66683 8.44659L10.7268 3.38659L11.6668 4.33325L5.66683 10.3333Z"
          fill={color || '#DDA25D'}
        />
      </svg>
    </i>
  );
};
export default CheckMarkIcon;
