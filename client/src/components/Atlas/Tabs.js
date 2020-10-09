import React from 'react';
import { TabContent, TabPane, } from 'reactstrap';
import {Tabs, Tab, AppBar} from "@material-ui/core";
import FindDistance from "./FindDistance.js";
import WhereIs from "./WhereIs"
import FindPlaces from "./FindPlaces"


const NavTabs = () =>  {
   const [selectedTab, setSelectedTab] = React.useState(0);

    const handleChange = (event,newTabValue) => {
        setSelectedTab(newTabValue);
    };

    return (
       <>
        < Tabs value = {selectedTab} onChange = {handleChange}>
            <Tab label = "Find Distance"/>
            <Tab label = "Where Is?"/>
            <Tab label = "Find Places"/>
        </Tabs>
        {selectedTab === 0 && <FindDistance/>}
        {selectedTab === 1 && <WhereIs/>}
        {selectedTab === 2 && <FindPlaces/>}
        </>
        );
     }



















        {/*<div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggleTab('1'); }}
                    >
                        Find Distance
                    </NavLink>
                </NavItem>

                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggleTab('2'); }}
                    >
                        Where Is?
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggleTab('3'); }}
                    >
                        Find Places
                    </NavLink>
                </NavItem>

            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId='1'>
                        <h5> Find Distance </h5>
                        <FindDistance/>
                </TabPane>
             </TabContent>
             <TabContent activeTab={activeTab}>
                <TabPane tabId="2">
                        <h5> Where is? </h5>
                        <WhereIs/>
                </TabPane>
                 </TabContent>
                 <TabContent activeTab={activeTab}>
                <TabPane tabId="3">
                        <h5> Find Places </h5>
                        <FindPlaces/>
                </TabPane>
                <TabPane tabId="4">
                       <h5> test </h5>
                        <FindDistance/>
                </TabPane>
            </TabContent>
        </div>
    );

};*/}

export default NavTabs;

