import React from 'react'
import { Image } from 'react-native'
import { Container, ListItem, Text, Left, Thumbnail, Right, View } from 'native-base';
import QuantityButton from '../quantity-button'

const MenuItem = (props) => {
  // render () {
    return (
      <ListItem style={styles.listItem}>
        <Left style={styles.leftContainer}>
          {/* <Thumbnail square small source={require('../image by default')}  */}
          <Thumbnail square small source={{uri : props.itemImage}} 
            style={styles.img}
          />
        </Left>
        <Right style={styles.rightContainer}>
          <View style={styles.itemNamePrice}>
            <Text style={{fontWeight: '600'}}>{props.menuTitle}</Text>
            <View>
              {
                props.offerPrice > 0 ? 
                <Text style={{ textDecorationLine: 'line-through', fontSize: 16}}>₹{props.menuPrice}</Text> 
                : <Text>₹{props.menuPrice}</Text>
              }
              {
                props.offerPrice > 0 ?
                  <Text>₹{props.offerPrice}</Text>
                  : null
              }
            </View>
            
          </View>
          <View style={{ top: 28, left: 18, position: 'absolute'}}>
            <View style={styles.itemInform}>
              <View style={styles.imageContainer}>
                <Image source={require('../../assets/img/icons/meeting.png')} style={styles.imageMeeting} ></Image>
              </View>
              <View style={{ paddingLeft: 2 , paddingRight: 15}}>
                <Text style={{color: '#979797'}}>{props.sufficientFor}</Text>
              </View>
              <View style={styles.imageContainer}>
              {
                props.menuType === "veg" ? <Image source={require('../../assets/img/icons/leaf.png')} style={styles.imageMeeting}></Image>
                  : <Image source={require('../../assets/img/icons/chicken.png')} style={styles.imageMeeting} ></Image>
              }                
              </View>
            </View>
          </View>
          <View style={styles.buttonPosition}>
            <QuantityButton quantity = {props.itemQuantity} productId = {props.id} productStatus = {props.itemStatus}/>
          </View>
        </Right>
      </ListItem>
    )
  // }
}

const styles = {
  img: {
    width: '100%',
    height: '100%'
  },
  listItem: {
    marginRight: 10, 
    paddingRight: 0
    
  },
  leftContainer: {
    flex: 2,
    height: 100
  },
  rightContainer: {
    flex: 4,
    paddingLeft: 15,
    alignItems: 'flex-start',
    height: 90,
    position: 'relative'
    // justifyContent: 'flex-start'
  },
  itemNamePrice: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  buttonPosition: {
    position: 'absolute',
    right: 0,
    bottom: 0
  },
  imageContainer: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#979797',
    paddingLeft: 3,
    paddingRight: 3,
    paddingTop: 4,
    width: 20,
    height: 20
  },
  imageMeeting: {
    width: 12,
    height: 12
    
  },
  itemInform: {
    flexDirection: 'row'
  }
}

export {MenuItem}