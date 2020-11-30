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
                                height: 600,
                                overflowY: 'scroll',
                                overflowX: 'hidden',
                                borderTop: '5px solid #AAA',
                                borderBottom: '5px solid #AAA'
                            }}
                        >
                            {children}
                        </ul>
                    )}
                    renderItem={({ value, props, index, isDragged, isSelected }) => (
                        <li
                            {...props}
                            style={{
                                ...props.style,
                                padding: '1.5em',
                                margin: '0.5em 0em',
                                listStyleType: 'none',
                                cursor: isDragged ? 'grabbing' : 'grab',
                                border: '2px solid #CCC',
                                boxShadow: '3px 3px #AAA',
                                color: '#333',
                                borderRadius: '5px',
                                fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
                                backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF'
                            }}>

                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}
                            >
                                <button
                                    data-movable-handle
                                    style={{
                                        ...buttonStyles,
                                        cursor: isDragged ? 'grabbing' : 'grab',
                                        marginRight: '2em'
                                    }}
                                    tabIndex={-1}
                                >
                                    <HandleIcon />
                                </button>
                                <div> <h4> {'Place ' + (index + 1) + ': ' + value.name} </h4>
                                      <h5> { (index != 0 && this.props.showDistance) ? "Distance: " + this.props.distances[index - 1] : ""} </h5>
                                </div>{' '}

                                <button onClick={() => { (typeof index !== 'undefined') ? this.props.addPlacesToItineraryByArray(arrayRemove(this.props.places, index)) : this.addPlacesToItineraryByArray(this.props.places) }} style={buttonStyles}>
                                    <RemovableIcon />
                                </button>
                            </div>
                        </li>
                    )}
                />
            </div>
        );
    }
}

export const RemovableIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-x-circle"
    >
        <title>Remove</title>
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export const HandleIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#555"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-move"
    >
        <polyline points="5 9 2 12 5 15" />
        <polyline points="9 5 12 2 15 5" />
        <polyline points="15 19 12 22 9 19" />
        <polyline points="19 9 22 12 19 15" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <line x1="12" y1="2" x2="12" y2="22" />
    </svg>
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