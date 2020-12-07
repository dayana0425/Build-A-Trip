import React, { Component } from "react";
import { List, arrayMove, arrayRemove } from "react-movable";
import Tooltip from '@material-ui/core/Tooltip';
import {RemovableIcon, HandleIcon, buttonStyles} from "../../utils/constants";

/* Source Code for removable button Credit - https://github.com/tajo/react-movable/blob/master/examples/Removable.tsx */
/* Source Code for scrollable container Credit - https://github.com/tajo/react-movable/blob/master/examples/ScrollingContainer.tsx */
/* Handle Icon Credit - https://github.com/tajo/react-movable/blob/master/examples/Handle.tsx */

export default class ClearButton extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
        <div>
                <List
                    values={this.props.places}
                    onChange={({ oldIndex, newIndex }) =>
                        this.props.updateItineraryAndMapByArray(arrayMove(this.props.places, oldIndex, newIndex))
                    }

                    renderList={({ children, props, isDragged }) => (
                        <ul
                            {...props}
                            style={{
                                padding: '1em',
                                cursor: isDragged ? 'grabbing' : undefined,
                                height: 350,
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                                border: '2px solid #CCC',
                                borderRadius: '5px'
                            }}>
                            {children}
                        </ul>
                    )}
                    renderItem={({ value, props, index, isDragged, isSelected }) => (
                        <li
                            {...props}
                            style={{
                                ...props.style,
                                padding: '1em',
                                margin: '0.1em 0em',
                                listStyleType: 'none',
                                cursor: isDragged ? 'grabbing' : 'grab',
                                border: '1.5px solid #CCC',
                                boxShadow: '2px 2px #AAA',
                                color: '#333',
                                borderRadius: '5px',
                                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'}}>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'left',
                                    justifyContent: 'space-between'}}>
                                <Tooltip title="Drag to Reorder Places">
                                    <button
                                        data-movable-handle
                                        style={{
                                            ...buttonStyles,
                                            cursor: isDragged ? 'grabbing' : 'grab',
                                            marginRight: '2em'}}
                                        tabIndex={-1}>
                                        <HandleIcon/>
                                    </button>
                                </Tooltip>
                                <div>
                                    <h5> {(index === 0) ? 'Begin' + ': ' + value.name : ""} </h5>
                                    <h5> {(index !== 0 && index !== this.props.places.length-1) ? 'Place ' + (index + 1) + ': ' + value.name : ""} </h5>
                                    <h5> {(index !== 0 && index === this.props.places.length-1) ? 'End' + ': ' + value.name : ""} </h5>
                                    <h5> {(index !== 0 && this.props.showDistance) ? "Distance: " + this.props.distances[index - 1] : ""} </h5>
                                </div>{' '}
                                <Tooltip title="Remove Place from Trip">
                                <button onClick={() => {(typeof index !== 'undefined') ? this.props.updateItineraryAndMapByArray(arrayRemove(this.props.places, index)) : this.props.updateItineraryAndMapByArray(this.props.places)}} style={buttonStyles}>
                                    <RemovableIcon/>
                                </button>
                                </Tooltip>
                            </div>
                        </li>
                    )}/>
            </div>
        );
    }
}
