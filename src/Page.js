import React from 'react'
import { RouteData } from 'react-static'

const Page = () =>
  <RouteData render={({ content }) =>
    <div className="main">
      <div className="sheet text" dangerouslySetInnerHTML={{ __html: content }}></div>
    </div>
  }/>

export default Page
