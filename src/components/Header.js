import React from "react";
import styled from "styled-components";
import { Pill } from "@components";
import { Account } from "@archetypes";
import { ReactComponent as LogoFull } from "@logo/yflink-full.svg";
import { ReactComponent as Logo } from "@logo/yflink.svg";

const StyledLink = styled(({ href, children, className, ...props }) => (
  <a href={href} className={`header-link ${className}`} {...props}>
    {children}
  </a>
))`
  font-size: var(--theme--header--link--font-size, 18px);
  text-transform: uppercase;
  vertical-align: baseline;
  ${({ disabled }) =>
    !!disabled &&
    `
			//pointer-events: none;
			opacity: 0.5;
			cursor: not-allowed;
			position: relative;

			>.pill{
				position: absolute;
				left: calc(100% + 0.5em);
				top: 50%;
				transform: translateY(-50%);
			}
		`}
`;

export default styled(({ className }) => (
  <header className={className}>
    <StyledLink href="https://yflink.io" className="brand">
      <LogoFull className="logo" defaultcolor="true" />
    </StyledLink>
    <span className="links">
      <StyledLink href="https://yflink.io/#/vote" target="_blank">
        Vote
      </StyledLink>
      <StyledLink
        href="https://linkswap.app/#/swap?outputCurrency=0x28cb7e841ee97947a86b06fa4090c8451f64c0be"
        target="_blank"
      >
        Buy YFL
      </StyledLink>
      <StyledLink href="https://linkswap.app" target="_blank">
        Link
        <Logo style={{ height: "0.8em" }} />
        wap
      </StyledLink>
    </span>
    <span className="account">
      <Account.Balance />
      <Account.Button />
    </span>
  </header>
))`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4rem 3rem 0 3rem;

  > .brand {
    width: 20%;
    text-align: left;
    .logo {
      width: 16.5rem;
      height: 3.048rem;
    }
  }

  > .links {
    width: 60%;
    text-align: center;
    //display: flex;
  }

  > .account {
    width: 20%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .account-balance {
      font-size: 10px;
      margin-right: 1em;
      text-align: right;
      opacity: 0.75;
    }
  }

  .header-link {
    display: inline-block;
    margin: 0 2.1rem;
  }
`;
