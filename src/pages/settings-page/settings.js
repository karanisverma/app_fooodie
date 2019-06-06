import React from 'react'
import { View, ScrollView, TouchableOpacity, Platform} from 'react-native'
import { StackNavigator } from "react-navigation";
import { Container, Thumbnail, Content, Item, Input, Icon, Text, ListItem, Left, Right, Body, List, Button} from 'native-base'
import {connect} from 'react-redux'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

class SettingsPage extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  componentWillMount() {
    Amplitude.logEvent('page_settings');
  }
  
  render() {
    return (
      
      <Container>
        <View style={styles.userIcon}>
          <Thumbnail square size={120} source={require('../../assets/img/userIcon.png')} />
        </View>

        <View style={styles.accountInfo}>
          <Text style={styles.accountContent}>ACCOUNT INFORMATION</Text>
        </View>

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <Item disabled>
            <Icon name='ios-mail-outline' />
              {this.props.userInfo.email ? <Input disabled placeholder={this.props.userInfo.email} />
              : <Input disabled placeholder='User Email' />}
            
          </Item>
        </View>

        <View style={{ width: '90%', alignSelf: 'center' }}>
          <Item disabled>
            <Icon name='ios-phone-portrait-outline' />
              {this.props.userInfo.phone ? <Input disabled placeholder={this.props.userInfo.phone} />
              : <Input disabled placeholder='User Phone Number' />}
          </Item>
        </View>

        <View style={styles.accountInfo}>
          <Text style={styles.accountContent}>SAVED PLACES</Text>
        </View>

          <Content>
            <ScrollView>
          {this.props.userInfo.address.length > 0 ? this.props.userInfo.address.map(list =><ListItem icon key={list.id} style={styles.addressList}>
              <Left style={{ alignSelf: "flex-start", height: 65 }}>
              <Button style={{ backgroundColor: "#1ecded" }}>
                <Icon active name="md-pin" />
              </Button>
            </Left>
            <Body style={styles.addressList}>
              <Text style={styles.alignLeft}>{list.flat_number}</Text>
              <Text style={styles.alignLeft}>{list.street}, {list.landmark}</Text>
              <Text style={styles.alignLeft}>{list.area}</Text>
              <Text style={styles.alignLeft}>{list.street}</Text>
              <Text style={styles.alignLeft}>{list.city}, {list.zipcode}</Text>
            </Body>
          </ListItem>
          )
          : <View>
            <Text style={{textAlign: 'center', marginBottom: 10, color: 'red'}}> You have not added any address yet! </Text>
          <TouchableOpacity style={styles.Button} 
            onPress={
              () => this.props.navigation.navigate("AddressSelector", { title: "Delivery Address Details" })
            }
            >
              <Text>
                ADD ADDRESS
              </Text>
            </TouchableOpacity>
            </View>}
            </ScrollView>
            </Content>          
      </Container>
      
    )
  }
}
const styles = {
  wrapper: {
    backgroundColor: 'white',
    flex: 1
  },
  userIcon: {
    padding: 30,
    alignSelf: 'center'
  },
  accountInfo: {
    backgroundColor: '#ccc',
    marginBottom: 10,
    marginTop: 5
  },
  accountContent: {
    color: 'black',
    fontSize: 16,
    padding: 15
  },
  addressContainer: {
    padding: 15
  },
  addressWrapper: {
    fontSize: 16,
    lineHeight: 22
  },
  addressList: {
    height: 130
  },
  alignLeft: {
    textAlign: 'left'
  },
  Button: {
    bottom: 0,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 12,
    paddingTop: 12,
    marginBottom: 20,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#7a7a7a'
  }
}

const mapStateToProps = state => ({
  userInfo: state.user.info
})

export default connect(mapStateToProps)(SettingsPage)