import React, { Component } from 'react'
import { TouchableWithoutFeedback, LayoutAnimation } from 'react-native'
import { View, Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem } from 'native-base';
import { connect } from 'react-redux'
import * as actions from '../../actions/helpSupportAction'


class ListItem extends Component {

  componentWillUpdate() {
    // LayoutAnimation.spring();
    // LayoutAnimation.linear();
    LayoutAnimation.easeInEaseOut();
  }

  renderDescription() {
    if (this.props.expanded) {
      // if (this.props.alLibraryList.id === this.props.selectedLibraryId) {
      return (
        <CardItem style={styles.cardItemStyle}>
          <Text style={styles.expandedText}>{this.props.alLibraryList.description}</Text>
        </CardItem>
      )
    }
  }

  render() {
    // console.log('hello props', this.props)
    return <TouchableWithoutFeedback
      onPress={() => this.props.selectLibrary(this.props.alLibraryList.id)}>
      <View>
        <Card style={styles.cardStyles}>
          <Text style={styles.textStyle}>
            {this.props.alLibraryList.title}
          </Text>
        </Card>
        {this.renderDescription()}
      </View>
    </TouchableWithoutFeedback>
  }
}

// mapStateToProps will call every click and reeneder the component
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.alLibraryList.id;
  return { expanded }
}

const styles = {
  textStyle: {
    fontSize: 16,
    paddingLeft: 15,
    paddingTop: 12,
    fontWeight: 'bold',
    paddingBottom: 12
  },
  expandedText: {
    fontSize: 14,
    color: 'black',
    paddingLeft: 16,
    paddingRight: 16,
    lineHeight: 22
  },
  cardStyles: {
    marginTop: 0,
    marginBottom: 0
  },
  cardItemStyle: {
    backgroundColor: '#f0f0f0',
    padding: 5
  }
}

export default connect(mapStateToProps, actions)(ListItem)