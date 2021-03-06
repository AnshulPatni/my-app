import React, { PureComponent } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props)
    console.log('[Apps.js] inside constructor');
    this.state = {
      persons: [
        { id: 'wadaj1', name: 'Max', age: 28 },
        { id: 'ewfas1', name: 'Manu', age: 27 },
        { id: 'erger1', name: 'Stephanie', age: 25 }
      ],
      otherState: 'some other value',
      showPersons: false,
      toggleClicked: 0,
      authenticated: false
    }
  }

  componentWillMount() {
    console.log('[Apps.js] inside componentWillMount()');
  }

  componentDidMount() {
    console.log('[Apps.js] inside componentDidMount()');
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[UPDATE Persons.js]  inside shouldComponentUpdate()');
  //   return nextState.persons !== this.state.persons ||
  //       nextState.showPersons !== this.state.showPersons;
  //   // return true;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log(
      '[UPDATE App.js]  inside componentWillUpdate()',
      nextProps, 
      nextState
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(
      '[UPDATE App.js]  inside getDerivedStateFromProps()',
      nextProps, 
      prevState
    );
    return prevState;
  }

  getSnapshotBeforeUpdate() {
    console.log(
      '[UPDATE App.js]  inside getSnapshotBeforeUpdate()'
    );
  }

  componentDidUpdate() {
    console.log('[UPDATE APP.js]  inside componentDidUpdate()');
  }


  // state = {
  //   persons: [
  //     { id: 'wadaj1', name: 'Max', age: 28 },
  //     { id: 'ewfas1', name: 'Manu', age: 27 },
  //     { id: 'erger1', name: 'Stephanie', age: 25 }
  //   ],
  //   otherState:'some other value',
  //   showPersons: false
  // }

  switchNameHandler = (newName) => {
    //console.log("I just switched the names");
    this.setState({
      persons: [
        { name: newName },
        { name: 'Manu', age: 27 },
        { name: 'Stephanie', age: 32 }
      ]
    });
  }

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }

  deletePersonHandler = (personIndex) => {
    //const new_persons = this.state.persons.slice();
    const new_persons = [...this.state.persons];
    new_persons.splice(personIndex, 1);
    this.setState({ persons: new_persons })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState( (prevState, props) => {
      return {
        showPersons: !doesShow,
        toggleClicked: prevState.toggleClicked + 1
      }
    });
  }

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    console.log('[App.js] inside render()');

    let persons = null;

    if (this.state.showPersons) {
      persons = <Persons
        persons={this.state.persons}
        clicked={this.deletePersonHandler}
        changed={this.nameChangedHandler} />
    }

    return (
      <Aux>
        <button onClick={() => { this.setState({ showPersons: true }) }}>Show Persons</button>
        <Cockpit
          appTitle={this.props.title}
          showPersons={this.state.showPersons}
          persons={this.state.persons}
          clicked={this.togglePersonsHandler}
          login={this.loginHandler}
           />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, classes.App);