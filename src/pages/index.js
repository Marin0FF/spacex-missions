import React,{ useEffect, useState } from 'react'
import SEO from "../components/seo";
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import Icon from "@mdi/react";
import { mdiChevronUp } from '@mdi/js'
import { graphql } from 'gatsby'
import moment from 'moment'
import Layout from '../components/layout'
import TimelineOverview from '../components/timelineOverview'
import TimelineEntry from '../components/timelineEntry'

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

export const query = graphql`
  query {
    spacexapi {
      launchesPast(sort: "launch_date_local", order: "ASC") {
        id
        mission_name
        launch_success
        launch_date_local
        links {
          video_link
          mission_patch
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
  const [sucessfulLaunches, setSucessfulLaunches] = useState(0);
  const [failedLaunches, setFailedLaunches] = useState(0);
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
  }, [currentYear]);

  useEffect(() => {
    const allLaunches = launchData !== 0 ?
      [...data.spacexapi.launchesPast, ...launchData] : data.spacexapi.launchesPast;
    let iterableSucessful = 0;
    let iterableFailed = 0;
    allLaunches.map((launch) => {
      if(launch.launch_success === true) {
        iterableSucessful = iterableSucessful + 1;
      } else {
        iterableFailed = iterableFailed + 1;
      }
    })
    setSucessfulLaunches(iterableSucessful);
    setFailedLaunches(iterableFailed);
  }, [launchData])

  return (
    // Render Layout
    <Layout>
      <SEO title="Launches" />
      <TimelineOverview
        total={sucessfulLaunches + failedLaunches}
        successful={sucessfulLaunches}
        failed={failedLaunches}
      />
      <VerticalTimeline className="custom-line">
        {data.spacexapi.launchesPast.map((launch) => {
          if (launch.launch_year !== currentYear) {
            return (
              <TimelineEntry
                launchSuccess={launch.launch_success}
                launchDate={launch.launch_date_local}
                missionPatch={launch.links.mission_patch}
                missionName={launch.mission_name}
                rocketName={launch.rocket.rocket_name}
                details={launch.details}
                key={launch.id}
              />
            )
          }
          return null;
        })}
        {launchData && launchData.map((launch) => {
          return (
            <TimelineEntry
              launchSuccess={launch.launch_success}
              launchDate={launch.launch_date_local}
              missionPatch={launch.links.mission_patch}
              missionName={launch.mission_name}
              rocketName={launch.rocket.rocket_name}
              details={launch.details}
              key={launch.id}
            />
          );
        })}
        <VerticalTimelineElement
          iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          icon={<Icon path={ mdiChevronUp }
            onClick={() => window.scrollTo({
              top: 0,
              behavior: 'smooth',
            })}
            size={1}
            color="#ffffff"
          />}
        />
      </VerticalTimeline>
    </Layout>
  )
};

export default IndexPage
