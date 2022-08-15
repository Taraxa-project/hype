interface DotIconProps {
  color?: string;
  width?: string;
  height?: string;
}

const DotIcon = ({ color, width, height }: DotIconProps) => {
  return (
    <i
      style={{
        minWidth: '1rem',
        textAlign: 'center',
      }}
    >
      <svg
        width={width || '6'}
        height={height || '6'}
        viewBox="0 0 6 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="3" r="3" fill={color || '#DDA25D'} />
      </svg>
    </i>
  );
};
export default DotIcon;
