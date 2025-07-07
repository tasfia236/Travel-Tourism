import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import Overview from './OverView/Overview'
import Packages from './Packages/Packages'
import MeetGuides from './MeetGuides/MeetGuides'

const Tourism = () => {
  return (
    <div className='bg-white mx-auto p-5 text-center'>
      <Tabs>
        <TabList className='font-bold text-orange-500'>
          <Tab>Overview</Tab>
          <Tab>Our Packages</Tab>
          <Tab>Meet Our Tour Guides</Tab>
        </TabList>

        <TabPanel>
          <Overview></Overview>
        </TabPanel>
        <TabPanel>
          <Packages></Packages>
        </TabPanel>
        <TabPanel>
          <MeetGuides></MeetGuides>
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default Tourism
