import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Platform} from 'react-native'
import { StackNavigator } from "react-navigation";
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

class HowItWorks extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerStyle: {
      backgroundColor: '#fff'
    },
  })


  componentWillMount() {
    Amplitude.logEvent('page_how_it_works');
  }

  render() {
    return (
      <ScrollView>
        <View style= {styles.wrapper}>
          <View>
            <Text style={styles.step1}>STEP 1</Text>
            <View style={{ width: '100%', height: 150 }}>
            <Image source={require('../../assets/img/how-it-works/how-it-works-1.png')} style={{ width: '90%', height: 150 }} resizeMode="contain" />
            </View>
            <Text style={styles.content}>Order using this App or visit fooodie.store.</Text>
          </View>

          <View>
            <Text style={styles.step2}>STEP 2</Text>
            <View style={{ width: '100%', height: 150 }}>
              <Image source={require('../../assets/img/how-it-works/how-it-works-2.png')} style={{ width: '90%', height: 150 }} resizeMode="contain"/>
            </View>
            <Text style={styles.content}>Select favourite dish.</Text>
          </View>

          <View>
            <Text style={styles.step3}>STEP 3</Text>
            <View style={{ width: '100%', height: 150 }}>
            <Image source={require('../../assets/img/how-it-works/how-it-works-3.png')} style={{ width: '90%', height: 150 }} resizeMode="contain" />
            </View>
            <Text style={styles.content}>Add items to cart.</Text>
          </View>

          <View>
            <Text style={styles.step4}>STEP 4</Text>
            <View style={{ width: '100%', height: 150 }}>
            <Image source={require('../../assets/img/how-it-works/how-it-works-4.png')} style={{ width: '90%', height: 150 }} resizeMode="contain" />
            </View>
            <Text style={styles.content}>Place order online & you can pay by COD or Paytm at time of delivery.</Text>
          </View>

          <View>
            <Text style={styles.step5}>STEP 5</Text>
            <View style={{ width: '100%', height: 150 }}>
            <Image source={require('../../assets/img/how-it-works/how-it-works-5.png')} style={{ width: '90%', height: 150 }} resizeMode="contain" />
            </View>
            <Text style={styles.content}>Food preparation and delivered in under an hour.</Text>
          </View>

        </View>
      </ScrollView>
    )
  }
}
// const win = Dimensions.get('window');

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#f1eddf'
  },
  step1: {
    textAlign: 'left',
    borderColor: '#043849',
    width: '90%',
    padding: 10,
    backgroundColor: '#033948',
    fontWeight: 'bold',
    fontSize: 18, 
    color: 'white',
    letterSpacing: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0
  },
  step2: {
    textAlign: 'left',
    borderColor: '#043849',
    width: '90%',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#597c2e'
  }, 
  step3: {
    textAlign: 'left',
    borderColor: '#043849',
    width: '90%',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#df223f'
  }, 
  step4: {
    textAlign: 'left',
    borderColor: '#043849',
    width: '90%',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#feb800'
  }, 
  step5: {
    textAlign: 'left',
    borderColor: '#043849',
    width: '90%',
    padding: 10,
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    letterSpacing: 1,
    marginTop: 30,
    marginBottom: 30,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#cf4946'
  }, 
  content: {
    color: 'black',
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    fontWeight: 'bold',
    lineHeight: 22
  },
  image: {
    flex: 1,
    alignSelf: 'stretch'
  }
});

export default HowItWorks