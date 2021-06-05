import React,{ useEffect, useState } from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import { graphql } from 'gatsby'
import moment from 'moment'

import Layout from "../components/layout"


export const query = graphql`
  query {
    spacexapi {
      launchesPast(sort: "launch_date_local", order: "DESC") {
        id
        mission_name
        launch_success
        launch_date_local
        links {
          video_link
          mission_patch
          mission_patch_small
        }
        rocket {
          rocket_name
        }
        mission_name
        details
      }
    }
  }
`;

const IndexPage = ({data}) => {

  const [launchData, setLaunchData] = useState(0);
  const currentYear = moment().format('YYYY');

  useEffect(() => {
    const  requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

    fetch(`https://api.spacexdata.com/v3/launches/past?launch_year=${currentYear}?order=desc`, requestOptions)
    .then(response => response.json())
    .then(result => setLaunchData(result))
    .catch(error => console.log('error', error));
  }, []);

  return (
    // Render Layout
    <Layout>
      <VerticalTimeline name="timeline" className="custom-line">
        {data.spacexapi.launchesPast.map((launch) => {
          if (launch.launch_year !== currentYear) {
            return (
              <VerticalTimelineElement
                className="vertical-timeline-element--work"
                contentStyle={{ background: launch.launch_success === true ? 'rgb(33, 150, 243)' : 'rgb(244, 91, 105)', color: '#fff' }}
                contentArrowStyle={{ borderRight: launch.launch_success === true ? '7px solid rgb(33, 150, 243)' : '7px solid rgb(244, 91, 105)' }}
                date={moment(launch.launch_date_local).format('DD MMMM YYYY')}
                iconStyle={{ background: 'rgb(5, 47, 95)', color: '#fff' }}
                icon={<img src={launch.links.mission_patch}></img>}
                key={launch.id}
              >
                <h3 className="vertical-timeline-element-title"><strong className="has-text-white">Mission</strong> {launch.mission_name}</h3>
                <h4 className="vertical-timeline-element-subtitle"><strong className="has-text-white">Rocket type</strong> {launch.rocket_name}</h4>
                <p>{launch.details} </p>
              </VerticalTimelineElement>
            )
          }
          return null;
        })}
        {launchData && launchData.map((launch) => (
          <VerticalTimelineElement
            className="vertical-timeline-element--work"
            contentStyle={{ background: launch.launch_success === true ? 'rgb(33, 150, 243)' : 'rgb(244, 91, 105)', color: '#fff' }}
            contentArrowStyle={{ borderRight: launch.launch_success === true ? '7px solid rgb(33, 150, 243)' : '7px solid rgb(244, 91, 105)' }}
            date={moment(launch.launch_date_local).format('DD MMMM YYYY')}
            iconStyle={{ background: 'rgb(5, 47, 95)', color: '#fff' }}
            icon={<img src={launch.links.mission_patch}></img>}
          >
            <h3 className="vertical-timeline-element-title"><strong className="has-text-white">Mission</strong>{launch.mission_name}</h3>
            <h4 className="vertical-timeline-element-subtitle"><strong className="has-text-white">Rocket type</strong>{launch.rocket.rocket_name}</h4>
            <p>{launch.details} </p>
          </VerticalTimelineElement>
        ))}
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          //icon={<StarIcon />}
        />
      </VerticalTimeline>
    </Layout>
  )
};

export default IndexPage
