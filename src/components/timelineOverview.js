import React from 'react'
import Icon from "@mdi/react";
import { mdiRocketLaunchOutline, mdiRocketOutline, mdiFire } from '@mdi/js'
import CountUp from 'react-countup';
import ScrollTrigger from 'react-scroll-trigger';

export default function TimelineOverview({total = 0, successful = 0, failed = 0}) {

    return (
        <div className="launches-overview columns my-0">
            <div className="column has-background-link py-5">
                <div className="icon is-large icon-centered">
                    <Icon path={mdiRocketLaunchOutline}
                    title="User Profile"
                    size={2}
                    color="#ffffff"
                    />
                </div>
                <h3 className="subtitle title has-text-centered has-text-white mb-2">Successful launches</h3>
                <CountUp end={0} redraw={true}>
                    {({ countUpRef, update }) => (
                        <div className="is-flex is-justify-content-center">
                            <ScrollTrigger onEnter={() => update(successful)}>
                                <span className="title has-text-centered has-text-white" ref={countUpRef} />
                            </ScrollTrigger>
                        </div>
                    )}
                </CountUp>
            </div>
            <div className="column has-background-light py-5">
                <div className="icon is-large icon-centered">
                    <Icon path={mdiRocketOutline}
                    title="User Profile"
                    size={2}
                    color="#363636"
                    />
                </div>
                <h3 className="subtitle title has-text-centered mb-2">Total launches</h3>
                <CountUp end={0} redraw={true}>
                    {({ countUpRef, update }) => (
                        <div className="is-flex is-justify-content-center">
                            <ScrollTrigger onEnter={() => update(total)}>
                                <span className="title has-text-centered" ref={countUpRef} />
                            </ScrollTrigger>
                        </div>
                    )}
                </CountUp>
            </div>
            <div className="column has-background-danger py-5">
                <div className="icon is-large icon-centered">
                    <Icon path={mdiFire}
                    title="User Profile"
                    size={2}
                    color="#ffffff"
                    />
                </div>
                <h3 className="subtitle title has-text-centered has-text-white mb-2">Failed launches</h3>
                <CountUp end={0} redraw={true}>
                    {({ countUpRef, update }) => (
                        <div className="is-flex is-justify-content-center">
                            <ScrollTrigger onEnter={() => update(failed)}>
                                <span className="title has-text-centered has-text-white" ref={countUpRef} />
                            </ScrollTrigger>
                        </div>
                    )}
                </CountUp>
            </div>
        </div>
    )
}