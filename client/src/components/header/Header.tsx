import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";
import HamburgerMenuIcon from "../../assets/icons/HambugerMenu";
import { HypeIconSmall } from "../../assets/icons/HypeIcon";
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
    margin-left: 3rem;
  }

  .headerRight {
    width: 50%;
    display: flex;
    align-items: right;
    justify-content: space-evenly;
  }

  .selected {
    font-weight: 700;
    font-size: 1rem;
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
    border-radius: 1.625rem;
    font-size: 0.75rem;
    display: flex;
    align-items: center;
    text-align: center;
    color: #787878;
    margin-top: 0.75rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .greendot {
    margin-left: 0.1rem;
    margin-right: 0.2rem;
    height: 6px !important;
    width: 6px !important;
    background: #15ac5b;
    border-radius: 50%;
  }

  span {
    padding-top: 1.5rem;
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
      font-size: 1rem;
      color: #292929;
    }
  }
`;

export enum HeaderValues {
  HypeFarming = "Hype Farming",
  HypePool = "+ Hype Pool",
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
    status: "connected" | "notConnected" | "unavailable";
    onConnect: () => void;
    account?: string | null;
  }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [selected, setSelected] = React.useState<HeaderValues>(
      HeaderValues.None
    );

    const onSelect = (e: HeaderValues) => {
      setSelected(e);
    };

    const headerEntries: HeaderValues[] = headerElements || [
      HeaderValues.HypeFarming,
      HeaderValues.HypePool,
      HeaderValues.Redeem,
    ];
    return (
      <StyledHeader variant={variant || isMobile ? "mobile" : "desktop"}>
        <div className="headerLeft">
          <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
            <HypeIconSmall />
          </div>
        </div>

        <div className="headerRight">
          {variant === "mobile" ? (
            status === "connected" ? (
              <>
                {" "}
                <div className="account">
                  <p className="greendot" />
                  {account}
                </div>
                <p style={{ top: "calc(50% - 10px)" }}>
                  <HamburgerMenuIcon />
                </p>
              </>
            ) : (
              <p style={{ top: "calc(50% - 10px)" }}>
                <HamburgerMenuIcon />
              </p>
            )
          ) : (
            <>
              {headerEntries.map((e) =>
                e === selected ? (
                  <span className="selected" key={e}>
                    {e}
                    <p className="underline" />
                  </span>
                ) : (
                  <span onClick={() => onSelect(e)} key={e}>
                    {e}
                  </span>
                )
              )}
              {status === "notConnected" ? (
                <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  <Button size="regular" onClick={onConnect}>
                    Connect Wallet
                  </Button>
                </div>
              ) : status === "connected" ? (
                <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  <div className="account">
                    <p className="greendot" />
                    {account}
                  </div>
                </div>
              ) : (
                <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
                  <div className="account">Metamask is not available.</div>
                </div>
              )}
            </>
          )}
        </div>
        {children}
      </StyledHeader>
    );
  }
);

export default Header;
