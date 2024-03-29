interface InfoIconProps {
  color?: string;
  width?: string;
  height?: string;
}

const InfoIcon = ({ color, width, height }: InfoIconProps) => (
  <svg
    width={width || '14'}
    height={height || '14'}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M7.00016 0.333344C3.32016 0.333344 0.333496 3.32001 0.333496 7.00001C0.333496 10.68 3.32016 13.6667 7.00016 13.6667C10.6802 13.6667 13.6668 10.68 13.6668 7.00001C13.6668 3.32001 10.6802 0.333344 7.00016 0.333344ZM7.66683 10.3333H6.3335V6.33334H7.66683V10.3333ZM7.66683 5.00001H6.3335V3.66668H7.66683V5.00001Z"
      fill={color || '#B3B3B3'}
    />
  </svg>
);

export default InfoIcon;
