export interface UpIconProps {
  click: () => void;
}

const UpIcon = ({ click }: UpIconProps) => {
  return (
    <i
      style={{
        minWidth: '1rem',
        textAlign: 'center',
        cursor: 'pointer',
      }}
      onClick={click}
    >
      <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10.59 7.40991L6 2.82991L1.41 7.40991L1.23266e-07 5.99991L6 -8.82626e-05L12 5.99991L10.59 7.40991Z"
          fill="black"
        />
      </svg>
    </i>
  );
};
export default UpIcon;
