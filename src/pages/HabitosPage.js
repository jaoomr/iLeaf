import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import habitosJson from '../../habitos.json';
import HabitosList from '../components/HabitosList';

export default class HabitosPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      habitos: []
    };
  }

  componentDidMount(){
    this.setState({
      habitos: habitosJson
    })
  }

  render(){
    return (
    <ScrollView>
      <HabitosList habitos={this.state.habitos}/>
    </ScrollView>
  );
  }
}