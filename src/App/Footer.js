import React from 'react'

const Footer = () =>
  <div>
    <div className="footer">
      <div className="footer-container">
        <h3>StaticGen is hosted and maintained by <a href="https://www.netlify.com">Netlify</a>, the perfect way to deploy your JAMstack sites and apps.</h3>
      </div>
      <div className="postscript">
        © Netlify {new Date().getFullYear()}
      </div>
    </div>
  </div>

export default Footer
