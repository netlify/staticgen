import React from 'react'
import { Router, Link } from 'react-static'
import styled, { injectGlobal } from 'styled-components'
import { hot } from 'react-hot-loader'
import Routes from 'react-static-routes'
import Header from './Header'
import Footer from './Footer'

/**
 * Note: the styles on this page are a horrendous misuse of styled-components.
 * These styles were ported over and should be updated and migrated to a
 * proper styled-components implementation.
 */
injectGlobal`
  * {
    box-sizing: border-box;
    text-size-adjust: none;
  }

  body {
    margin: 0;
    font-family: 'Roboto', 'sans-serif';
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    background: #fbfbfb;
  }
`

const AppStyles = styled.div`
  .notification {
    background: #5f90ff;
    box-sizing: border-box;
    color: white;
    padding: 16px 24px;
    position: relative;
    text-align: center;
    width: 100%;

    em {
      font-style: normal;
      color: rgba(255,255,255,0.2);
      padding: 0 8px;
    }

    .text-link {
      color: #313D3E;
      font-weight: bold;
      text-decoration: underline;
    }
  }

  * {
    -webkit-box-sizing: border-box;
       -moz-box-sizing: border-box;
        -ms-box-sizing: border-box;
            box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', 'sans-serif';
    font-size: 16px;
    line-height: 1.6;
    color: #444;
    margin: 0 0;
    background: #fbfbfb;
  }
  h3 {
    font-size: 20px;
    line-height: 1.2;
  }
  h4 { font-size: 31px; }
  h5 { font-size: 29px; }
  h7 {
    font-size: 14px;
    font-weight: bold;
  }

  small { font-size: 66.67%; }

  dl {
    overflow: hidden;
    margin: 6px 0 0;
    padding: 0;
  }
  dl dt, dl dd { margin: 0; }
  dl dt {
    clear: left;
  }

  h2 a, h2 a:link, h2 a:visited, h2 a:active, h2 a:hover {
  /*  color: #66666f;*/
    text-decoration: none;
  }
  a:visited {
    outline: none;
  }
  h2 a:hover {
    text-decoration: underline;
  }

  pre {
    background: #122b3b;
    padding: 10px 20px;
    border: 1px solid #000;
  }

  .logo {
    font-family: 'Roboto Slab', 'serif';
  }

  .hero {
    background: linear-gradient(45deg, #4d9abf, #00c7b7);
    text-align: center;
    padding: 29px 0;
  }
  .hero h1 {
    margin: 31px 0 0;
  }
  .hero h1 img {
    height: auto;
    width: 400px;
    max-width: 80%;
    margin: 0 auto;
  }
  .hero h2 {
    margin: 0 auto 40px auto;
    color: #313D3E;
    max-width: 660px;
    line-height: 36px;
    font-weight: 100;
    font-size: 24px;
  }
  .hero a.logo, .hero a.logo:link, .hero a.logo:active, .hero a.logo:hover {
    color: #fff;
    text-decoration: none;
  }

  .staticgen-promo a,
  .text a {
    color: #5f90ff;
    text-decoration: none;

    &:link,
    &:active,
    &:hover {
      color: #5f90ff;
      text-decoration: none;
    }
  }

  .staticgen-promo a {
    display: block;
  }

  .navbar {
    height: 45px;
    background: #313D3E;
    overflow: hidden;
    z-index: 100;
  }

  .menu.right {
    text-align: right;
  }

  .menu > ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .menu > ul > li {
    display: inline-block;
    line-height: 45px;
    height: 45px;
  }

  .menu > ul > li > a {
    display: inline-block;
    line-height: 45px;
    height: 45px;
    color: #fff;
    text-decoration: none;
    font-weight: normal;
    margin-left: 16px;
  }

  .menu > ul > li > a:hover {
    color: #5f90ff;
  }

  .main, .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .main {
    margin-top: 47px;
  }

  .main:after {
    content: ' ';
    width: 100%;
    display: table;
  }

  .sheet {
    padding: 12px 47px 47px;
  }
  .sheet h1 {
      margin: 0 0 20px;
      border-bottom: 1px solid #444;
  }
  .links a {
      text-decoration: none;
      color: #666;
  }
  .links a:hover {
      color: #222;
  }
  .sheet p {
      margin: 0 0 16px;
  }
  .separator {
      margin: 0 9px;
      color: #999;
      font-weight: 100;
  }
  .sheet .links .fa {
      margin-right: 4px;
  }
  .sheet h3 {
    margin: 18px 0 0;
  }
  .sheet h4 {
    margin: 12px 0 0;
    line-height: 1.2;
  }
  .sheet ol, .sheet ul {
    padding: 0 0 0 20px;
  }
  .sheet ol ol, .sheet ol ul, .sheet ul ol, .sheet ul ul {
    margin-top: 12px;
    padding-left: 20px;
  }
  .sheet li {
    margin-bottom: 0;
  }
  .sheet h3 + ul { margin-top: 0; }
  .sheet img {
    margin: 18px 0;
    width: 100%;
    border: none;
    box-shadow: 0 0 7px rgba(0,0,0,.2);
  }

  .projects, .stats, .trends {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .projects {
    margin-right: -24px;
  }

  .photos-inside {
    margin-bottom: -4px;
    float: right;
  }

  .cards-header {
    display: none;
  }
  .show-headers .cards-header {
    display: block;
    width: 100%;
    padding: 24px 0;
    font-size: 36px;
    clear: both;
  }
  .show-headers .cards-header:after {
    clear: both;
    content: "";
    display: block;
  }
  .card {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    color: #313D3E;
    display: block;
    font-size: 14px;
    margin: 0 0 18px;
    padding: 18px;
    text-decoration: none;

    ul {
      padding: 10px 0 8px 20px;
    }

    .type {
      display: inline;

      + h7 {
        display: block;
        margin-top: 8px;
      }
    }

    &:visited,
    &:active,
    &:hover {
      color: #313D3E;
      text-decoration: none;
    }

    .url {
      font-size: 12px;
      font-style: italic;
      font-weight: normal;
      color: #999;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .card .title {
    margin: 0 -18px 0px;
    padding: 0 18px 6px;
    font-weight: normal;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hidden {
    display: none;
  }

  .tag {
    background: #5f90ff;
    border-radius: 3px;
    color: white;
    display: inline-block;
    font-size: 10px;
    font-weight: 500;
    letter-spacing: 1px;
    line-height: 12px;
    margin: 0 auto;
    padding: 6px 5px 4px 7px;
    text-transform: uppercase;

    &.proprietary {
      background: #fff;
    }
  }

  .card .description {
    margin-top: 16px;
    margin-bottom: 10px;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;

    &.too-long {
      max-height: 66px;
      overflow: hidden;
      position: relative;
      text-align: justify;

      &:before {
        background: white;
        bottom: 0;
        content: '...';
        position: absolute;
        right: 0;
      }
    }
  }

  .stats {
    overflow: hidden;
    margin: 16px -18px;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .stat, .trend {
    display: block;
  }
  .stat {
    font-size: 18px;
    margin: 2px 0 1px;
    -webkit-font-smoothing: antialiased;
  }
  .trend.up {
    color: #31BB47;
  }
  .trend.down {
    color: #C91B1B;
  }
  .stats li, .trends li {
    float: left;
    width: 33.33333333%;
    text-align: center;
    margin: 0;
    padding: 6px;
    line-height: 1.4;
  }

  .projects-sort-filter-toolbar {
    margin-bottom: 47px;
  }

  .projects-sort-filter-toolbar:after {
    clear: both;
    content: "";
    display: block;
  }

  .projects-filters {
    float: left;
  }

  .projects-sort {
    float: right;
  }

  .landing .staticgen-promo {
    margin: 0;
  }

  .landing .staticgen-promo h3 {
    font-size: 24px;
    line-height: 30px;
    margin: 26px 0 16px 0;
  }

  .landing .staticgen-promo p {
    font-size: 14px;
  }

  .deploy-to-netlify {
    margin: 64px 0;
  }

  .deploy-to-netlify hr {
    color: #fefefe;
    border-top: 1px solid #fefefe;
    margin-bottom: 30px;
  }

  .deploy-to-netlify h3,
  .deploy-to-netlify p {
    margin-bottom: 24px;
  }

  .deploy-to-netlify em {
    color: grey;
    display: block;
    font-style: italic;
    font-size: 12px;
    margin-bottom: 10px;
  }

  .primary-btn {
    background: #5f90ff;
    border-radius: 4px;
    border: none;
    color: white;
    font-weight: regular;
    padding: 16px 24px;
  }

  .deploy {
    display: block;
    margin: 22px 0 0 0;
  }

  a.deploy-btn {
    min-height: 43px;
    width: 100%;
  }

  a.deploy-btn img {
    width: 100%;
  }

  a.deploy-btn-interior img {
    margin: -4px 0 0 0;
    box-shadow: none;
    width: auto;
  }

  .sheet:after {
    content: "";
    display: table;
    clear: both;
  }

  .footer {
    background: #B6B6B6;
    margin: 46px 0 0;
    padding: 46px 46px 23px;
  }

  .footer-container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .postscript {
    color: #eee;
    font-size: 12px;
    text-align: center;
    margin-top: 46px;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
  }
  .postscript a, .postscript a:visited, .postscript a:link, .postscript a:active, .postscript a:hover {
    color: #fff;
    font-weight: bold;
  }
  .postscript a:hover {
    text-decoration: underline;
  }

  .footer h3 {
    color: white;
    font-weight: 100;
    font-size: 29px;
    text-align: center;
  }
  .footer h3 a, .footer h3 a:visited, .footer h3 a:active, .footer h3 a:hover {
    font-weight: normal;
    color: white;
    text-decoration: none;
  }
  .footer h3 a:hover {
    text-decoration: underline;
  }

  /* Awesome dropdown design from this Codepen: http://codepen.io/Thibaut/pen/Jasci */

  .dropdown {
    display: inline-block;
    position: relative;
    overflow: hidden;
    height: 32px;
    width: 150px;
    background: #f2f2f2;
    border: 1px solid;
    border-color: white #f7f7f7 whitesmoke;
    border-radius: 3px;

    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .navbar .dropdown {
    margin-top: 6px;
    margin-right: 12px;
  }

  .dropdown:before, .dropdown:after {
    content: '';
    position: absolute;
    z-index: 2;
    top: 9px;
    right: 10px;
    width: 0;
    height: 0;
    border: 4px dashed;
    border-color: #888888 transparent;
    pointer-events: none;
  }

  .dropdown:before {
    border-bottom-style: solid;
    border-top: none;
  }

  .dropdown:after {
    margin-top: 7px;
    border-top-style: solid;
    border-bottom: none;
  }

  .dropdown-select {
    position: relative;
    width: 130%;
    margin: 0;
    padding: 8px 8px 8px 10px;
    height: 32px;
    line-height: 1.2;
    font-size: 14px;
    color: #62717a;
    background: #f2f2f2; /* Fallback for IE 8 */
    background: rgba(0, 0, 0, 0) !important; /* "transparent" doesn't work with Opera */
    border: 0;
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    text-indent: 0.01px; /* Fix select appearance on Firefox https://gist.github.com/joaocunha/6273016/ */
    text-overflow: '';
  }

  .dropdown-select:focus {
    z-index: 3;
    width: 100%;
    color: #394349;
    outline: none;
  }

  .dropdown-select > option {
    margin: 3px;
    padding: 6px 8px;
    text-shadow: none;
    background: #f2f2f2;
    border-radius: 3px;
    cursor: pointer;
  }

  /* Fix for IE 8 putting the arrows behind the select element. */

  .lt-ie9 .dropdown {
    z-index: 1;
  }

  .lt-ie9 .dropdown-select {
    z-index: -1;
  }

  .lt-ie9 .dropdown-select:focus {
    z-index: 3;
  }

  /* Dirty fix for Firefox adding padding where it shouldn't. */

  @-moz-document url-prefix() {
    .dropdown-select {
      padding-left: 6px;
    }
  }

  .dropdown-dark {
    background: #444;
    border-color: #111111 #0a0a0a black;
    background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
    background-image: -moz-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
    background-image: -o-linear-gradient(top, transparent, rgba(0, 0, 0, 0.4));
    background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.4));
    -webkit-box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
    box-shadow: inset 0 1px rgba(255, 255, 255, 0.1), 0 1px 1px rgba(0, 0, 0, 0.2);
  }

  .dropdown-dark:before {
    border-bottom-color: #aaa;
  }

  .dropdown-dark:after {
    border-top-color: #aaa;
  }

  .dropdown-dark .dropdown-select {
    color: #aaa;
    text-shadow: 0 1px black;
    background: #444;  /* Fallback for IE 8 */
  }

  .dropdown-dark .dropdown-select:focus {
    color: #ccc;
  }

  .dropdown-dark .dropdown-select > option {
    background: #444;
    text-shadow: 0 1px rgba(0, 0, 0, 0.4);
  }

  @media all and (max-width: 499px) {
    .main, .container {
      margin: 0;
    }

    .navbar {
      height: initial;
    }
    .menu > ul > li {
      display: block;
      text-align: center;
    }
    .navbar .menu a { margin-left: 0; }
  }

  @media all and (min-width: 500px) {
    .project {
      float: left;
      width: 50%;
      padding-right: 24px;
    }
    .project:nth-of-type(n) { clear: none; }
    .project:nth-of-type(2n+1) { clear: both; }
  }

  @media all and (max-width: 700px) {
    .projects-sort-filter-toolbar {
      padding: 0 24px;
      margin-top: 36px;
      margin-bottom: 36px;
    }
    .projects-sort {
      float: none;
    }
    .projects-filters {
      float: none;
    }
    .projects-sort-filter-toolbar .dropdown {
      display: block;
      margin: 10px 0;
      width: 100%;
      height: 48px;
    }
    .projects-sort-filter-toolbar .dropdown:before, .dropdown:after {
      top: 19px;
    }
    .projects-sort-filter-toolbar .dropdown .dropdown-select {
      font-size: 16px;
      height: 48px;
      line-height: 2;
    }
    .project {
      display: block;
      width: 100%;
      padding: 20px 20px 0;

      &:last-of-type {
        padding-right: 0;
      }
    }
    .projects {
      margin-right: 0;
    }

    .show-headers .cards-header {
      padding: 0 20px;
    }
  }

  @media all and (max-width: 800px) {
    .navbar .container {
      padding: 0 12px;
    }
  }

  @media all and (min-width: 700px) {
    .main {
      padding: 0 20px;
    }
  }

  @media all and (min-width: 800px) {
    .project {
      float: left;
      width: 33.333333333%;
      padding-right: 24px;
    }
    .project:nth-of-type(n) { clear: none; }
    .project:nth-of-type(3n+1) { clear: both; }
  }

  @media all and (min-width: 1200px) {
    .project {
      float: left;
      width: 25%;
      padding-right: 24px;
    }
    .project:nth-of-type(n) { clear: none; }
    .project:nth-of-type(4n+1) { clear: both; }
  }
`

const App = () => (
  <Router>
    <AppStyles>
      <Header/>
      <div className="content">
        <Routes />
      </div>
      <Footer/>
    </AppStyles>
  </Router>
)

export default hot(module)(App)
