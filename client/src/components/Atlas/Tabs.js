import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import FindDistance from "./FindDistance.js";
import WhereIs from "./WhereIs"
import FindPlaces from "./FindPlaces"

const Example = () => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    return (
        <div>
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        Find Distance
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        Where Is?
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '3' })}
                        onClick={() => { toggle('3'); }}
                    >
                        Find Places
                    </NavLink>
                </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                        <h5> Find Distance </h5>
                        <FindDistance> </FindDistance>
                </TabPane>
                <TabPane tabId="2">
                        <h5> Where is? </h5>
                        <WhereIs> </WhereIs>
                </TabPane>
                <TabPane tabId="3">
                        <h5> Find Places </h5>
                        <FindPlaces> </FindPlaces>
                </TabPane>
            </TabContent>
        </div>
    );
}

export default Example;