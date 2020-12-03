import React, { Component } from "react";
import { List, arrayMove, arrayRemove } from "react-movable";

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
                        this.props.addPlacesToItineraryByArray(arrayMove(this.props.places, oldIndex, newIndex))
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
                                <button
                                    data-movable-handle
                                    style={{
                                        ...buttonStyles,
                                        cursor: isDragged ? 'grabbing' : 'grab',
                                        marginRight: '2em'}}
                                    tabIndex={-1}>
                                    <HandleIcon/>
                                </button>
                                <div>
                                    <h5> {(index === 0) ? 'Begin' + ': ' + value.name : ""} </h5>
                                    <h5> {(index !== 0 && index !== this.props.places.length-1) ? 'Place ' + (index + 1) + ': ' + value.name : ""} </h5>
                                    <h5> {(index !== 0 && index === this.props.places.length-1) ? 'End' + ': ' + value.name : ""} </h5>
                                    <h5> {(index !== 0 && this.props.showDistance) ? "Distance: " + this.props.distances[index - 1] : ""} </h5>
                                </div>{' '}
                                <button onClick={() => {(typeof index !== 'undefined') ? this.props.addPlacesToItineraryByArray(arrayRemove(this.props.places, index)) : this.addPlacesToItineraryByArray(this.props.places)}} style={buttonStyles}>
                                    <RemovableIcon/>
                                </button>
                            </div>
                        </li>
                    )}/>
            </div>
        );
    }
}

export const RemovableIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14.59 8L12 10.59 9.41 8 8 9.41 10.59 12 8 14.59 9.41 16 12 13.41 14.59 16 16 14.59 13.41 12 16 9.41 14.59 8zM12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
);

export const HandleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 15h18v-2H3v2zm0 4h18v-2H3v2zm0-8h18V9H3v2zm0-6v2h18V5H3z"/></svg>
);

const buttonStyles = {
    border: 'none',
    margin: 0,
    padding: 0,
    width: 'auto',
    overflow: 'visible',
    cursor: 'pointer',
    background: 'transparent'
};