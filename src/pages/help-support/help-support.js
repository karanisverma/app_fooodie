// import React, { Component} from 'react'
import React from 'react'
import { ListView, Platform } from 'react-native'
import { connect } from 'react-redux'
import ListItem from './list-item'
import {stackNavigator} from 'react-navigation'
import { Amplitude } from 'expo'; 
import Sentry from 'sentry-expo';
// used Connect to connect component to store 

class LibraryList extends React.Component {

  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  })
  componentWillMount() {
    Amplitude.logEvent('page_help_support');
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(this.props.librariesList)
  }
  renderRow(library) {
    return <ListItem alLibraryList={library} />
  }
  render() {
    // console.log('state in render==>', this.props.libraries)
    const libraryList = this.props.librariesList
    return <ListView
      dataSource={this.dataSource}
      renderRow={this.renderRow}
    />
  }
}

const mapStateToProps = state => {
  // console.log('state=====>', state)
  return { librariesList: state.libraries }

}

export default connect(mapStateToProps)(LibraryList)
// Once connect called, it will call the connect function with LibraryList function