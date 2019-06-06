import React from 'react'
import {Svg} from 'expo';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text, Card, CardItem, View, ListItem} from 'native-base';
import { StyleSheet, ScrollView, Image, Platform } from 'react-native'
import { connect } from "react-redux";
import { fetchAllProducts } from '../../actions/productAction'
import { fetchFeatureProducts } from '../../actions/homepageAction'
import { MenuItem } from '../../components/menu-item'
import { API_HOST } from '../../env'
import * as userAction from '../../actions/userAction'
import { getUser } from '../../auth'
import SvgAnimatedLinearGradient from 'react-native-svg-animated-linear-gradient'
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';
class Homepage extends React.Component {
  componentWillMount() {
    // Sentry.captureException(new Error('home page fat gya!'))
    Amplitude.logEvent('page_homepage');
    Amplitude.setUserId((this.props.userInfo.phone || '') + '');
    Amplitude.setUserProperties({
      email: this.props.userInfo.email,
      phone: this.props.userInfo.phone,
    });
    this.loadUserInfo();
  }
  async loadUserInfo() {
    await getUser().then(userData => {
      if (userData) {
        this.props.dispatch(userAction.userLogin(JSON.parse(userData)));
      } 
      // else {
      //   console.log('user is not loggedin')
      // }
    })
  }

  componentDidMount() {
    this.props.dispatch(fetchAllProducts());
    this.props.dispatch(fetchFeatureProducts());
  }
  // hiding default header of react navigation
  static navigationOptions = {
    header: null
  }
  render() {
    const { error, loading, offerProducts } = this.props;
    if (error) {
      return <Text>Error! {error.message}</Text>;
    }
    return (
      <Container>
        <Header style={styles.appContainer}>
          <Body>
            <Title>Fooodie</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <ScrollView style={styles.container}
            directionalLockEnabled={false}
            horizontal={true}
            showsHorizontalScrollIndicator = {false}
          >
          <Content padder contentContainerStyle={styles.mainContent}>
              {offerProducts.map((product, index) => 
                <Card transparent style={styles.card} key={index}>
                  <CardItem style={styles.cardItem}>
                    <Body>
                      <View style={{width: 216}}>
                        {/* {product.banner_image} */}
                        <Image source={{uri: product.banner_image}} style={{height: 216}}/>
                      </View>
                    </Body>
                  </CardItem>
                </Card>
              )}
          </Content>
          </ScrollView>
          
          <ListItem style={{ marginRight: 15 }}>
            <Text>Offer Products</Text>
          </ListItem>

          <View style={{ backgroundColor: "white"}}>
          {this.props.loading ?
          <View style={{ alignItems: "center", justifyContent: "center"}}>
              <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>
                <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>
                <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>
                <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>  
            </View>
            :
            null
            }

            {this.props.products ? this.props.products.map((product, index) =>
              (product.offer_price > 0 ?
                <MenuItem
                  id={product.product_id}
                  key={product.product_id}
                  menuTitle={product.name}
                  menuPrice={product.price}
                  itemImage={`${API_HOST}${product.image}`}
                  itemQuantity={product.quantity}
                  menuType={product.type}
                  sufficientFor={product.sufficient_for}
                  offerPrice={product.offer_price}
                  itemStatus = {product.status}
                />
                : null)
            ) : null}
          </View>
          <ListItem style={{ marginRight: 15 }}>
            <Text>Featured Products</Text>
          </ListItem>
          <View style={{ backgroundColor: "white" }}>
          {this.props.loading ?
          <View style={{ alignItems: "center", justifyContent: "center"}}>
              <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>
                <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>
                <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>
                <SvgAnimatedLinearGradient
                  primaryColor="#f3f3f3"
                  secondaryColor="#ecebeb"
                  speed={3}
                  height={145}
                  width={400}
                >
                  <Svg.Rect x="129" y="28" rx="4" ry="4" width="220" height="13" /> 
                  <Svg.Rect x="132" y="52" rx="4" ry="4" width="50" height="8" /> 
                  <Svg.Rect x="19" y="23.05" rx="5" ry="5" width="88" height="88" /> 
                  <Svg.Rect x="260" y="76.05" rx="0" ry="0" width="86" height="34" />
                </SvgAnimatedLinearGradient>  
            </View>
            :
            null
            }          
            {this.props.products ? this.props.products.map((product, index) =>
              (product.is_featured === true ?
                <MenuItem
                  id={product.product_id}
                  key={product.product_id}
                  menuTitle={product.name}
                  menuPrice={product.price}
                  itemImage={`${API_HOST}${product.image}`}
                  itemQuantity={product.quantity}
                  menuType={product.type} 
                  offerPrice={product.offer_price}
                  itemStatus = {product.status}
                  sufficientFor={product.sufficient_for}
                />
                : null)
            ) : null}
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create ({
  container: {
    backgroundColor: 'white'
  },
  mainContent: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    flexDirection: 'row',
    overflow: 'visible'
    // paddingBottom: 0
    // position: 'relative',
    // flexWrap: 'wrap'
  },
  card: {
    width: 216,
    height: 216,
    borderColor: '#fff'
  },
  cardItem: {
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 4,
    marginRight: 4
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#808080',
    paddingLeft: 20,
    borderBottomWidth: 4,
    borderBottomColor: 'red',
    paddingBottom: 10,
    paddingTop: 10
  },
  appContainer: {
    ...Platform.select({
      ios: {
        paddingTop: 15,
        paddingLeft: 125
      },
      android: {
        paddingTop: 25,
        paddingBottom: 25,
        paddingLeft: 20
      }
    })
  }

})

const mapStateToProps = state => ({
  offerProducts: state.homePageInfo.items,
  products: state.productInfo.products,
  loading: state.productInfo.loading,
  userInfo: state.user.info
  // error: state.homePageInfo.error
});

export default connect(mapStateToProps)(Homepage)