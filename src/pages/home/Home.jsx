import React from 'react'
import { Greeting, Widget } from '../../components'
import './home.scss'

export const HomePage = () => {
  return (
    <div className="main">
      <div className="container">
        <div className="content">
          <div className="welcome">

            {/* heading */}
            <Greeting />
          </div>
          {/* overview cards */}
          <div className="widgets">
            <Widget type="properties" />
            <Widget type="tenant" />
            <Widget type="earning" />
            <Widget type="arrears" />

          </div>
        </div>
      </div>
    </div>
  )
}
