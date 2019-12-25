import React, { PureComponent } from 'react'
import Payment from './screens/Profile/payment'
import SignIn from './screens/Login/signIn'
import SignUp from './screens/Login/signup'
import Forgot from './screens/Login/forgot'

import { KeyboardAvoidingView, Platform } from 'react-native'
import { Actions, Scene, Router, Drawer } from 'react-native-router-flux'
import { Font } from 'expo'

import SideMenu from './SideMenu';
import Wall from './screens/Dashboard/wall';
import MyAccount from './screens/Dashboard/myAccount';
import UpdateProfile from './screens/Dashboard/updateProfile';
import MyGPA from './screens/Dashboard/myGPA';

export default class App extends PureComponent {

  state = {
    fontLoaded: false,
  };

  async componentDidMount() {
    await this._loadAssets();
  }

  async _loadAssets() {
    await Font.loadAsync({
      'Muli-Bold': require('../assets/fonts/Muli-Bold.ttf'),
      'Muli-SemiBold': require('../assets/fonts/Muli-SemiBold.ttf'),
      'Muli': require('../assets/fonts/Muli.ttf'),
      'Princess': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'evilicons': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'foundation': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'material-community': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'material': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'entypo': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'ionicons': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'simple-line-icons': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'FontAwesome': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'feather': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'AvenirNext-Medium': require('../assets/fonts/PrincessSofia-Regular.ttf'),
      'rockwell': require('../assets/fonts/Muli.ttf'),


    });
    console.log('fonts loaded!');
    this.setState({ fontLoaded: true });
  }
  render() {

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{ flex: 1 }}>
        {this.state.fontLoaded == true ?

          <Router>
            <Scene>
              <Scene key="signin" component={SignIn} hideNavBar/>
              <Scene key="signup" component={SignUp} hideNavBar/>
              <Scene key="forgot" component={Forgot} hideNavBar/>

              <Drawer
                hideNavBar
                  
                key="drawerMenu"
                contentComponent={SideMenu}
                drawerWidth={250}
                drawerPosition="left"
              >

                <Scene key="wall" component={Wall} hideNavBar/>

                <Scene key="gpa" component={MyGPA} hideNavBar/>

                <Scene key="myaccount" component={MyAccount} hideNavBar/>

                <Scene key="updateprofile" component={UpdateProfile} hideNavBar/>

              </Drawer>
            </Scene>
          </Router>
          : null}
      </KeyboardAvoidingView>
    );
  }
}
