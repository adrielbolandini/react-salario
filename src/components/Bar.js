import React, { Component } from 'react'
import '../styles.css';

export default class Bar extends Component {

    render() {
        const{percent,color}=this.props;
        return (
            <div style={{
                backgroundColor: color,
                width: percent+"%",
                maxWidth: "100%",
                height: "25px",
                margin: 0,
            }}>
            </div>
        )
    }
}
