import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";

import styled from "styled-components";
import HamburgerMenuIcon from "../../assets/icons/HambugerMenu";
import HypeIcon from "../../assets/icons/HypeIcon";
import Button from "../button/Button";
import MediatedParagraph from "../mediatedParagraph/MediatedParagraph";

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
    flex: 1 0 auto;
    display: flex;
    align-items: left;
  }

  .headerRight {
    flex: 0 1 auto;
    padding-right: 2rem;
    display: flex;
    align-items: right;
    justify-content: space-evenly;
  }

  .margin-right {
    margin-right: 2rem;
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

  span {
    padding-top: 1rem;
    font-weight: 400;
    font-size: 1rem;
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

interface SidebarProps extends React.HTMLProps<HTMLDivElement> {
  show?: boolean;
}

const SidebarHover = styled.div<SidebarProps>`
  ${(props) => !props.show && `visibility: hidden;`}
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(45, 45, 45, 0.4);
`;

const Sidebar = styled.div<SidebarProps>`
  transition: all 0.5s ease;
  position: absolute;
  left: ${(props) => (props.show ? "calc(100% - 20.375rem)" : "100%")};
  box-sizing: border-box;
  top: 0;
  height: 100vh;
  width: 20.375rem;
  background-color: #ffffff;
`;

const SidebarHeader = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6.25rem;
`;

const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin-bottom: 9.375rem;
`;

interface SidebarMenuLinkProps extends React.HTMLProps<HTMLLIElement> {
  selected?: boolean;
}

const SidebarMenuLink = styled.li<SidebarMenuLinkProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 1.25rem 3rem;
  font-weight: ${(props) => (props.selected ? "700" : "400")};
  color: ${(props) => (props.selected ? "#292929" : "#adadad")};

  ::before {
    position: absolute;
    left: 0;
    display: block;
    content: ${(props) => (props.selected ? `""` : "none")};
    width: 1rem;
    height: 1.5rem;
    background-color: #dda25d;
  }
`;

const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

const Account = styled.div`
  background: #f7f7f7;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: #787878;
  padding: 0.375rem 1.5rem;
`;

const GreenDot = styled.div`
  margin-left: 0.1rem;
  margin-right: 0.2rem;
  height: 0.375rem !important;
  width: 0.375rem !important;
  background: #15ac5b;
  border-radius: 50%;
`;

export enum HeaderValues {
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
    status: "connected" | "notConnected" | "unavailable";
    onConnect: () => void;
    account?: string | null;
  }) => {
    const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [selected, setSelected] = React.useState<HeaderValues>(
      HeaderValues.None
    );

    const onSelect = (e: HeaderValues) => {
      setSelected(e);
    };

    const onMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
      setMenuOpen(!menuOpen);
    };

    const onSidebarClick = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
    };

    const onHoverClick = (e: React.MouseEvent<HTMLElement>) => {
      setMenuOpen(false);
    };

    const headerEntries: HeaderValues[] = headerElements || [
      HeaderValues.HypeFarming,
      HeaderValues.HypePool,
      HeaderValues.Redeem,
    ];
    return (
      <>
        {(variant === "mobile" || isMobile) && (
          <SidebarHover onClick={onHoverClick} show={menuOpen}>
            <Sidebar onClick={onSidebarClick} show={menuOpen}>
              <SidebarHeader>
                <MenuButton onClick={onMenuOpen}>
                  <HamburgerMenuIcon />
                </MenuButton>
                {status !== "notConnected" && (
                  <Account>
                    {status === "connected" && (
                      <>
                        <GreenDot />
                        {account}
                      </>
                    )}
                    {status === "unavailable" && "Metamask is not available."}
                  </Account>
                )}
              </SidebarHeader>
              <SidebarMenu>
                {headerEntries.map((e) => (
                  <SidebarMenuLink
                    selected={e === selected}
                    onClick={() => onSelect(e)}
                  >
                    {e}
                  </SidebarMenuLink>
                ))}
              </SidebarMenu>
              <SidebarFooter>
                {status === "notConnected" && (
                  <Button size="regular" onClick={onConnect}>
                    Connect Wallet
                  </Button>
                )}
              </SidebarFooter>
            </Sidebar>
          </SidebarHover>
        )}
        <StyledHeader variant={variant || isMobile ? "mobile" : "desktop"}>
          <div className="headerLeft">
            <HypeIcon />
          </div>

          <div className="headerRight">
            {variant === "mobile" ? (
              status === "connected" ? (
                <>
                  {" "}
                  <Account className="margin-right">
                    <GreenDot />
                    {account}
                  </Account>
                  <MenuButton onClick={onMenuOpen}>
                    <HamburgerMenuIcon />
                  </MenuButton>
                </>
              ) : (
                <MenuButton onClick={onMenuOpen}>
                  <HamburgerMenuIcon />
                </MenuButton>
              )
            ) : (
              <>
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
                {status === "notConnected" ? (
                  <Button size="regular" onClick={onConnect}>
                    Connect Wallet
                  </Button>
                ) : status === "connected" ? (
                  <Account>
                    <GreenDot />
                    {account}
                  </Account>
                ) : (
                  <Account>Metamask is not available.</Account>
                )}
              </>
            )}
          </div>
          {children}
        </StyledHeader>
      </>
    );
  }
);

export default Header;
