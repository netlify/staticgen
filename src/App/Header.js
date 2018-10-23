import React from "react";
import { SiteData } from "react-static";
import styled from "styled-components";
import Hero from "./Hero";
import Nav from "./Nav";
import NavLink, { NavAnchor } from "./NavLink";

// swyx: temporary insert jamstack conf banner
const JamstackConfBanner = ({ className }) => (
  <div className={className}>
    <p>
      Learn more about the JAMstack at{" "}
      <a href="https://jamstackconf.com">JAMstack Conf</a>, San Francisco —
      29–30 October, 2018
    </p>
  </div>
);
const JamstackConfBannerStyled = styled(JamstackConfBanner)`
  background-color: #000;
  color: #fff;
  display: block;
  text-align: center;
  z-index: 200;
  position: fixed;
  margin: 0;
  padding: 0;
  width: 100%;
  p {
    margin: 0;
    padding-top: 0.6em;
    padding-bottom: 0.6em;
  }
`;
// swyx: temporary insert jamstack conf banner

const Header = () => (
  <SiteData
    render={({ title, subtitle, shareButtons, repo, pages, navLinks }) => (
      <div>
        {/* swyx: temporary insert jamstack conf banner */}
        <JamstackConfBannerStyled />
        {/* swyx: temporary insert jamstack conf banner */}
        <Hero
          title={title}
          subheading={subtitle}
          shareButtons={shareButtons}
          repoLink={repo}
        />
        <Nav>
          {pages.map(({ path, name }) => (
            <NavLink key={path} to={path}>
              {name}
            </NavLink>
          ))}
          {navLinks.map(({ url, text }) => (
            <NavAnchor key={url} href={url} target="_blank">
              {text}
            </NavAnchor>
          ))}
        </Nav>
      </div>
    )}
  />
);

export default Header;
