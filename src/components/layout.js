import * as React from "react"
import Hero from "./hero"
import Footer from "./footer"
import scrollTo from 'gatsby-plugin-smoothscroll';
import "./layout.scss"

const Layout = ({ children }) => {

  return (
    <>
      <Hero>
        <p className="title is-1 has-text-white">History of SpaceX <br /> missions</p>
        <button onClick={() => scrollTo('.launches-overview')} className="button is-white is-medium cta-btn">Launch</button>
      </Hero>
      {children}
      <Footer />
    </>
  )
}

export default Layout
