import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
import Button from "../button/Button";

interface CustomStyledProps {
  variant?: "mobile" | "desktop";
}

const StyledCard = styled.div<CustomStyledProps>`
  width: ${(props) => (props.variant === "mobile" ? "310px" : "368px")};
  height: ${(props) => (props.variant === "mobile" ? "351px" : "391px")};
  letter-spacing: -0.02em;
  line-height: 20px;
  display: flex;
  border-radius: 16px;
  background: #f1f1f1;
  padding: 1%;

  h3 {
    font-weight: 700;
    font-size: 16px;
    color: #292929;
    width: 100%;
  }

  span {
    font-weight: 400;
    font-size: 14px;
    color: #595959;
    width: 100%;
    margin-bottom: 2%;
  }

  .container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }

  .dataContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .dataHeader {
    width: 50%;
    align-items: left;
    font-weight: 700;
  }

  .dataValue {
    width: 50%;
    align-items: left;
    font-weight: 400;
  }
`;

interface CardProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children?: JSX.Element | string;
  variant?: "mobile" | "desktop";
}

const Card = ({ children, variant, ...props }: CardProps) => {
  return (
    <StyledCard variant={variant} {...props}>
      {children}
    </StyledCard>
  );
};

interface HypeCardProps {
  title: string;
  description?: string;
  poolAmount?: number;
  poolToken?: string;
  bonusAmount?: number;
  bonusToken?: string;
  minRewardAmount?: number;
  minRewardToken?: string;
  duration?: string;
}

export const HypeCard = (props: HypeCardProps) => {
  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const {
    title,
    description,
    poolAmount,
    poolToken,
    bonusAmount,
    bonusToken,
    duration,
    minRewardAmount,
    minRewardToken,
  } = props;
  return (
    <Card variant={isMobile ? "mobile" : "desktop"}>
      <div className="container">
        <h3>{title}</h3>
        <span>{description}</span>
        {poolAmount && poolToken && (
          <div className="dataContainer">
            <span className="dataHeader">Pool:</span>
            <span className="dataValue">
              {poolAmount} {poolToken}
            </span>
          </div>
        )}
        {bonusAmount && bonusToken && (
          <div className="dataContainer">
            <span className="dataHeader">Bonus:</span>
            <span className="dataValue">
              {bonusAmount} {bonusToken}
            </span>
          </div>
        )}
        {minRewardAmount && minRewardToken && (
          <div className="dataContainer">
            <span className="dataHeader">Min reward:</span>
            <span className="dataValue">
              {minRewardAmount} {minRewardToken}
            </span>
          </div>
        )}
        {duration && (
          <div className="dataContainer">
            <span className="dataHeader">Duration:</span>
            <span className="dataValue">{duration}</span>
          </div>
        )}
        <Button size="full-width">Learn more</Button>
      </div>
    </Card>
  );
};

Card.defaultProps = {
  variant: "desktop",
};

export default Card;
