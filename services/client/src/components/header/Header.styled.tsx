import styled from 'styled-components';
import {
  AddressContainerProps,
  CustomStyledProps,
  SidebarMenuLinkProps,
  SidebarProps,
} from './Header.effects';

export const Logo = styled.div`
  font-size: 3rem;
  display: flex;
  align-items: center;
`;

export const StyledHeader = styled.header<CustomStyledProps>`
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.white};
  height: 4.5rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;

  > div {
    flex: 1 0 auto;
    display: flex;
    max-width: ${({ theme }) => theme.breakpoints.lg};

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      margin: 2rem 1rem;
    }
  }

  .header-left {
    flex: 1 0 auto;
    display: flex;
    align-items: left;
  }

  .header-right {
    flex: 0 1 auto;
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
    color: ${({ theme }) => theme.colors.greys[6]};
    cursor: pointer;
  }

  .underline {
    background: ${({ theme }) => theme.colors.primary};
    min-height: 8px;
    width: 100%;
    margin: 0;
    margin-bottom: -25px;
    margin-top: 10px;
  }

  span {
    padding-top: 0.3rem;
    font-weight: 400;
    font-size: 1rem;
    display: flex;
    align-content: center;
    gap: 8px;
    flex-direction: column;
    cursor: pointer;
    text-align: center;
    color: #adadad;

    :active {
      font-weight: 700;
      font-size: 1rem;
      color: ${({ theme }) => theme.colors.greys[6]};
    }
  }
`;

export const SidebarHover = styled.div<SidebarProps>`
  display: none;
  ${(props) => !props.show && `visibility: hidden;`}
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 999;
  background-color: rgba(45, 45, 45, 0.4);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

export const Sidebar = styled.div<SidebarProps>`
  transition: all 0.5s ease;
  position: absolute;
  left: ${(props) => (props.show ? 'calc(100% - 20.375rem)' : '100%')};
  box-sizing: border-box;
  top: 0;
  height: 100%;
  width: 20.375rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const SidebarHeader = styled.div`
  display: flex;
  padding: 1.5rem 3rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6.25rem;
`;

export const SidebarMenu = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin-bottom: 9.375rem;
`;

export const SidebarMenuLink = styled.li<SidebarMenuLinkProps>`
  display: flex;
  cursor: pointer;
  align-items: center;
  padding: 1.25rem 3rem;
  font-weight: ${(props) => (props.selected ? '700' : '400')};
  color: ${(props) => (props.selected ? '#292929' : '#adadad')};

  ::before {
    position: absolute;
    left: 0;
    display: block;
    content: ${(props) => (props.selected ? `""` : 'none')};
    width: 1rem;
    height: 1.5rem;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const SidebarFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  > * {
    width: 100%;
    margin: 1.5rem;
  }
`;

export const MenuButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
`;

export const AccountContainer = styled.div`
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.greys[11]};
  padding: 0.375rem 1.5rem;
`;

export const Account = styled.div`
  background: #f7f7f7;
  border-radius: 1.625rem;
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.greys[11]};
  padding: 0.375rem 1.5rem;
`;

export const GreenDot = styled.div`
  margin-left: 0.1rem;
  margin-right: 0.5rem;
  height: 0.375rem !important;
  width: 0.375rem !important;
  background: #15ac5b;
  border-radius: 50%;
  display: inline-block;
`;

export const AddressContainer = styled.div<AddressContainerProps>`
  ::before {
    content: '${(props) => props.address}';

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      content: '${(props) => props.shortAddress}';
    }
  }
`;
