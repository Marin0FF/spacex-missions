import * as React from "react"
import Hero from "./hero"
import VerticalTimeline from 'react-vertical-timeline-component'
import "./layout.scss"

const Layout = ({ children }) => {

  return (
    <>
      <Hero>
        <p className="title is-1 has-text-white">History of SpaceX <br /> missions</p>
        <button className="button is-white is-medium is-outlined">Launch</button>
      </Hero>
      {children}
    </>
  )
}

export default Layout
