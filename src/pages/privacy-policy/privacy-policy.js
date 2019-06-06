import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet, Platform, Link} from 'react-native'
import { StackNavigator } from "react-navigation";
import { Amplitude } from 'expo';
import Sentry from 'sentry-expo';

class PrivacyPolicy extends React.Component {
  static navigationOptions = ({navigation}) => ({
    title: `${navigation.state.params.title}`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerForceInset: Platform.OS === 'android' ? { top: 'never', bottom: 'never' } : null,
    headerStyle: {
      backgroundColor: '#fff'
    },
  })


  componentWillMount() {
    Amplitude.logEvent('Privacy Page');
  }

  render() {
    return (
  <ScrollView>
    <View style= {styles.wrapper}>
      <View>
        <View style= {styles.sectionContent}>
          <Text>Effective date: September 22, 2018</Text>
          <Text>fooodie.store ("us", "we", or "our") operates the https://fooodie.store website and the Fooodie  mobile application (hereinafter referred to as the "Service").</Text>
          <Text>This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.</Text>
          <Text>We use your data to provide and improve the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions.</Text>
        </View>
        
        <Text style= {styles.sectionHeading}>Information Collection And Use</Text>
        <View style={styles.sectionContent}>
          <Text>We collect several different types of information for various purposes to provide and improve our Service to you.</Text>
          <Text style={styles.sectionSubHeading}>Types of Data Collected</Text>
          <Text style= {styles.sectionSubHeading}>1. Personal Data</Text>
          <Text style= {styles.sectionSubHeading}>2. Email address</Text>
          <Text style= {styles.sectionSubHeading}>3. Phone number</Text>
          <Text style= {styles.sectionSubHeading}>4. Address, State, Province, ZIP/Postal code, City</Text>
          <Text style= {styles.sectionSubHeading}>5. Cookies and Usage Data</Text>
          <Text>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). Personally identifiable information may include, but is not limited to:</Text>
          <Text style= {styles.sectionSubHeading}>Usage Data</Text>
          <View>
            <Text>We may also collect information that your browser sends whenever you visit our Service or when you access the Service by or through a mobile device ("Usage Data").</Text>
            <Text>Depending on the Services that you use, and your app settings or device permissions, we may collect your real time information, or approximate location information as determined through data such as GPS, IP address</Text>
            <Text>We collect information as to how you interact with our Services, preferences expressed and settings chosen. fooodie Platform includes the fooodie advertising services (“Ad Services”), which may collect user activity and browsing history within the fooodie Platform and across third-party sites and online services, including those sites and services that include our ad pixels (“Pixels”), widgets, plug-ins, buttons, or related services or through the use of cookies. Our Ad Services collect browsing information including without limitation your Internet protocol (IP) address and location, your login information, browser type and version, date and time stamp, user agent, fooodie cookie ID (if applicable), time zone setting, browser plug-in types and versions, operating system and platform, and other information about user activities on the fooodie Platform, as well as on third party sites and services that have embedded our Pixels, widgets, plug-ins, buttons, or related services</Text>
            <Text>We may collect information about the devices you use to access our Services, including the hardware models, operating systems and versions, software, file names and versions, preferred languages, unique device identifiers, advertising identifiers, serial numbers, device motion information and mobile network information. Analytics companies may use mobile device IDs to track your usage of the fooodie Platform;</Text>
            <Text>fooodie mobile application (fooodie app) may also access metadata and other information associated with other files stored on your mobile device. This may include, for example, photographs, audio and video clips, personal contacts and address book information. If you permit the fooodie app to access the address book on your device, we may collect names and contact information from your address book to facilitate social interactions through our services and for other purposes described in this Policy or at the time of consent or collection. If you permit the fooodie app to access the calendar on your device, we collect calendar information such as event title and description, your response (Yes, No, Maybe), date and time, location and number of attendees.</Text>
            <Text>This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.</Text>
            <Text>When you access the Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.</Text>
          </View>

          <Text style= {styles.sectionSubHeading}>Tracking & Cookies Data</Text>
          <View>
            <Text>We use cookies and similar tracking technologies to track the activity on our Service and hold certain information.</Text>
            <Text>Cookies are files with small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Tracking technologies also used are beacons, tags, and scripts to collect and track information and to improve and analyze our Service.</Text>
            <Text>You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.</Text>
            <Text>Examples of Cookies we use:</Text>
            <View>
                <Text>Session Cookies: We use Session Cookies to operate our Service.</Text>
                <Text>Preference Cookies: We use Preference Cookies to remember your preferences and various settings.</Text>
                <Text>Security Cookies: We use Security Cookies for security purposes.</Text>
            </View>
          </View>
        </View>
        <Text style= {styles.sectionHeading}>Use of Data</Text>
        <View style= {styles.sectionContent}> 
          <Text>fooodie.store uses the collected data for various purposes:</Text>    
          <View>
              <Text>To provide and maintain the Service</Text>
              <Text>To notify you about changes to our Service</Text>
              <Text>To allow you to participate in interactive features of our Service when you choose to do so</Text>
              <Text>To provide customer care and support</Text>
              <Text>To provide analysis or valuable information so that we can improve the Service</Text>
              <Text>To monitor the usage of the Service</Text>
              <Text>To detect, prevent and address technical issues</Text>
          </View>
        </View>

        <Text style= {styles.sectionHeading}>Transfer Of Data</Text>
        <View style= {styles.sectionContent}> 
          <Text>Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ than those from your jurisdiction.</Text>
          <Text>If you are located outside India and choose to provide information to us, please note that we transfer the data, including Personal Data, to India and process it there.</Text>
          <Text>Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.</Text>
          <Text>fooodie.store will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organization or a country unless there are adequate controls in place including the security of your data and other personal information.</Text>
        </View>

        <Text style= {styles.sectionHeading}>Disclosure Of Data</Text>
        <View style= {styles.sectionContent}> 
          <Text style={styles.sectionSubHeading}>Legal Requirements</Text>
          <Text>fooodie.store may disclose your Personal Data in the good faith belief that such action is necessary to:</Text>
          <View style= {styles.sectionContent}>
              <Text>1. To comply with a legal obligation</Text>
              <Text>2. To protect and defend the rights or property of fooodie.store</Text>
              <Text>3. To prevent or investigate possible wrongdoing in connection with the Service</Text>
              <Text>4. To protect the personal safety of users of the Service or the public</Text>
              <Text>5. To protect against legal liability</Text>
          </View>
        </View>

        <Text style= {styles.sectionHeading}>Security Of Data</Text>
        <View style= {styles.sectionContent}> 
          <Text>The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.</Text>
          <Text>Further, please note that the fooodie Platform stores your data with the cloud platform of Amazon Web Services provided by Amazon Web Services, Inc., which may store this data on their servers located outside of India. Amazon Web Services has security measures in place to protect the loss, misuse and alteration of the information, details of which are available at  https://aws.amazon.com/. The privacy policy adopted by Amazon Web Services are detailed in https://aws.amazon.com/privacy. In the event you have questions or concerns about the security measures adopted by Amazon Web Services, you can contact their data protection / privacy team / legal team or designated the grievance officer at these organisations, whose contact details are available in its privacy policy, or can also write to our Grievance Officer at the address provided above.</Text>
        </View>

        <Text style= {styles.sectionHeading}>Service Providers</Text>
        <View style= {styles.sectionContent}> 
          <Text>We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.</Text>
          <Text>These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.</Text>
          <Text style={styles.sectionSubHeading}>Analytics</Text>
          <Text>We may use third-party Service Providers to monitor and analyze the use of our Service.</Text>    
          <View>
            <Text>Google Analytics</Text>
            <Text>Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to conTextualize and personalize the ads of its own advertising network.</Text>
          </View>
        </View>


        <Text style= {styles.sectionHeading}>Links To Other Sites</Text>
        <View style= {styles.sectionContent}> 
          <Text>Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.</Text>
          <Text>We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.</Text>
        </View>

        <Text style= {styles.sectionHeading}>Children's Privacy</Text>
        <View style= {styles.sectionContent}> 
          <Text>Our Service does not address anyone under the age of 18 ("Children").</Text>
          <Text>We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Children has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.</Text>
        </View>

        <Text style= {styles.sectionHeading}>Changes To This Privacy Policy</Text>
        <View style= {styles.sectionContent}> 
          <Text>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</Text>
          <Text>We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update the "effective date" at the top of this Privacy Policy.</Text>
          <Text>You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.</Text>
        </View>

        <Text style= {styles.sectionHeading}>Opt-out</Text>
        <View style= {styles.sectionContent}> 
          <Text>When you sign up for an accountyou are opting in to receive emails and sms from Fooodie. You can opt out by sending email to support@foodie.store but note that you cannot opt out of receiving certain administrative notices, service notices, or legal notices from Fooodie.</Text>
        </View>

        <Text style= {styles.sectionHeading}>Contact Us</Text>
        <View style= {styles.sectionContent}> 
          <Text>If you have any questions about this Privacy Policy, please contact us:</Text>
          <View>
            <Text>By email: support@fooodie.store</Text>
          </View> 
        </View>                               
  </View>
</View>
      </ScrollView>
    )
  }
}
// const win = Dimensions.get('window');

const styles = StyleSheet.create({
  sectionContent:{
    paddingLeft:20
  },
  sectionHeading:{
    fontWeight: 'bold',
    fontSize:18,
    paddingLeft:15,
    marginTop:25,
    marginBottom:5
  },
  sectionSubHeading:{
    fontWeight: 'bold',
    fontSize:14
  },
  wrapper: {
    backgroundColor: 'white'
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

export default PrivacyPolicy