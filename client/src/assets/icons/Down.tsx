export interface DownIconProps {
  click: () => void;
}

const DownIcon = ({ click }: DownIconProps) => {
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
          d="M1.41 0.589966L6 5.16997L10.59 0.589966L12 1.99997L6 7.99997L0 1.99997L1.41 0.589966Z"
          fill="black"
        />
      </svg>
    </i>
  );
};
export default DownIcon;
