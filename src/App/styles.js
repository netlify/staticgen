import { injectGlobal } from 'styled-components'

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
