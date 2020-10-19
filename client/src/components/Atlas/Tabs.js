// import React, { Component } from 'react';
// import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
// import classnames from 'classnames';
// import FindDistance from "./FindDistance.js";
// import FindPlaces from "./FindPlaces"
//
// export default class Example extends Component {
//     render() {
//         const { activeTab, toggle } = this.props;
//
//         return (
//             <div>
//                 <h1> Build A Trip </h1>
//                 <Nav tabs>
//                     <NavItem>
//                         <NavLink
//                             className={classnames({ active: activeTab === '1' })}
//                             onClick={() => { toggle('1'); }}>
//                             Add Locations
//                         </NavLink>
//                     </NavItem>
//                     <NavItem>
//                         <NavLink
//                             className={classnames({ active:activeTab === '2' })}
//                             onClick={() => { toggle('2'); }}>
//                             Search Places
//                         </NavLink>
//                     </NavItem>
//                 </Nav>
//                 <TabContent activeTab={activeTab}>
//                     <TabPane tabId="1">
//                         { activeTab == 1 ? <h4> Add Locations </h4> : null }
//                         <FindDistance/>
//                     </TabPane>
//                     <TabPane tabId="2">
//                         { activeTab == 2 ? <h4> Search Places </h4> : null }
//                         <FindPlaces>  </FindPlaces>
//                     </TabPane>
//                 </TabContent>
//             </div>
//         );
//     }
// }