import * as React from "react"

export default function Hero({ children }) {
    return (
        <section className="hero has-background-black">
            <div className="hero-body is-flex is-align-items-center">
                <div className="container has-text-centered">
                    {children}
                </div>
            </div>
        </section>
    )
};
