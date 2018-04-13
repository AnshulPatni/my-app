import React from 'react';
import './Person.css';
//import Radium from 'radium';

const person = (props) =>   {
    // const style = {
    //     '@media (min-width: 500px)': {
    //         width: '450px'
    //     }
    // }
    return (
        <div className="Person">
            <p onClick={props.click}>
                I'm {props.name} and I am {props.age} years old. {props.children}
            </p>
            <p>
                <input type="text" onChange={props.changed} value={props.name}/>
            </p>
        </div>
    )
};

export default person;

//export default Radium(person);