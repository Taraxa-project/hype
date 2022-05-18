import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";
import HypeIcon from "../../assets/icons/HypeIcon";
import Button from "../button/Button";

interface CustomStyledProps {
  variant?: "mobile" | "desktop";
}

const StyledHeader = styled.header<CustomStyledProps>`
  font-size: 0.875rem;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-radius: 0.75rem;
  font-size: 1rem;
  background: #ffffff;

  .headerLeft {
    width: 50%;
    display: flex;
    align-items: left;
  }

  .headerRight {
    width: 50%;
    display: flex;
    align-items: right;
    justify-content: space-evenly;
  }

  .selected {
    font-weight: 700;
    font-size: 16px;
    color: #292929;
    cursor: pointer;
  }

  .underline {
    background: #dda25d;
    align-self: flex-end;
    min-height: 10%;
    width: 100%;
    margin: 0 0 0 0;
  }

  .account {
    background: #f7f7f7;
    border-radius: 32px;
    display: flex;
    align-items: center;
    color: #787878;
  }

  .greendot {
    height: 0.33rem;
    width: 0.33rem;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
  }

  span {
    padding-top: 1rem;
    font-weight: 400;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-content: center;
    flex-direction: column;
    cursor: pointer;

    text-align: center;

    color: #adadad;

    :active {
      font-weight: 700;
      font-size: 16px;
      color: #292929;
    }
  }
`;

enum HeaderValues {
  HypeFarming = "Hype Farming",
  HypePool = "Hype Pool",
  Redeem = "Redeem",
  None = "none",
}

const Header = React.memo(
  ({
    children,
    variant,
    headerElements,
    status,
    onConnect,
    account,
  }: {
    children: React.ReactNode;
    variant: "mobile" | "desktop";
    headerElements?: HeaderValues[];
    status: "connected" | "disconnected" | "unavailable";
    onConnect: () => void;
    account: string;
  }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [selected, setSelected] = React.useState<HeaderValues>(
      HeaderValues.None
    );

    console.log("Ehtereum", window);

    const onSelect = (e: HeaderValues) => {
      setSelected(e);
    };

    const headerEntries: HeaderValues[] = headerElements || [
      HeaderValues.HypeFarming,
      HeaderValues.HypePool,
      HeaderValues.Redeem,
    ];
    return (
      <StyledHeader variant={isMobile ? "mobile" : "desktop"}>
        <div className="headerLeft">
          <HypeIcon />
        </div>
        <div className="headerRight">
          {headerEntries.map((e) =>
            e === selected ? (
              <span className="selected">
                + {e}
                <p className="underline" />
              </span>
            ) : (
              <span onClick={() => onSelect(e)}>{e}</span>
            )
          )}
          {status === "disconnected" ? (
            <Button size="regular" onClick={onConnect}>
              Connect Wallet
            </Button>
          ) : status === "connected" ? (
            <div className="account">
              <span className="greendot" />
              {account}
            </div>
          ) : (
            <div className="account">Metamask is not available.</div>
          )}
        </div>
        {children}
      </StyledHeader>
    );
  }
);

export default Header;
