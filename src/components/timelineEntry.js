import React from 'react'
import { VerticalTimelineElement } from 'react-vertical-timeline-component'
import Icon from "@mdi/react";
import { mdiRocketOutline } from '@mdi/js'
import moment from 'moment'

export default function TimelineEntry({
    launchSuccess,
    launchDate,
    missionPatch,
    missionName,
    rocketName,
    details
}) {
    return (
        <VerticalTimelineElement
            className="vertical-timeline-element"
            contentStyle={{ background: launchSuccess === true ? 'rgb(33, 150, 243)' : 'rgb(244, 91, 105)', color: '#fff' }}
            contentArrowStyle={{ borderRight: launchSuccess === true ? '7px solid rgb(33, 150, 243)' : '7px solid rgb(244, 91, 105)' }}
            date={moment(launchDate).format('DD MMMM YYYY')}
            iconStyle={{ background: 'rgb(5, 47, 95)', color: '#fff' }}
            icon={missionPatch !== null ? <img src={missionPatch}></img> : <Icon path={mdiRocketOutline} size={1} color="#ffffff" />}
        >
            <h3 className="vertical-timeline-element-title"><strong className="has-text-white">Mission</strong> {missionName}</h3>
            <h4 className="vertical-timeline-element-subtitle"><strong className="has-text-white">Rocket type</strong> {rocketName}</h4>
            <p>{details}</p>
        </VerticalTimelineElement>
    );
}