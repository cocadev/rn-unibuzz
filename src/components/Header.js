import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { images } from '../common/images';
import Popover, { Rect, Size } from 'react-native-popover-view';
import { colors } from '../common/colors'
import UtilService from '../utils/utils';
import Cache from "../utils/cache";

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isVisible1: false,
      isVisible2: false,
      isVisible3: false
    }
  }

  showPopover1() {
    this.setState({ isVisible1: true });
  }

  closePopover1() {
    this.setState({ isVisible1: false });
  }

  showPopover2() {
    this.setState({ isVisible2: true });
  }

  closePopover2() {
    this.setState({ isVisible2: false });
  }

  showPopover3() {
    this.setState({ isVisible3: true });
  }

  closePopover3() {
    this.setState({ isVisible3: false });
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={{ backgroundColor: '#111', flexDirection: 'row', alignItems: "center" }}>

          <TouchableOpacity onPress={() => Actions.drawerOpen()}>
            <MaterialCommunityIcons size={26} color={'#fff'} name='menu' />
          </TouchableOpacity>

          <Image source={images.logo} style={{ marginLeft: 10 }} />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', flex:1, alignItems:'flex-end'}}>

            <TouchableHighlight ref={ref => this.touchable1 = ref} onPress={() => this.showPopover1()}>
              <MaterialCommunityIcons name='email-outline' size={30} color={colors.ORANGE} />
            </TouchableHighlight>

            <Popover
              isVisible={this.state.isVisible1}
              fromView={this.touchable1}
              placement={'bottom'}
              onClose={() => this.closePopover1()}>
              <Text style={{ color: colors.SKY, padding: 12, borderRadius: 12 }}>You Have 0 Messages</Text>
            </Popover>

            <TouchableHighlight ref={ref => this.touchable2 = ref} onPress={() => this.showPopover2()}>
              <MaterialCommunityIcons name='bell' size={30} color={colors.GREEN} style={{ marginHorizontal: 5 }} />
            </TouchableHighlight>

            <Popover
              isVisible={this.state.isVisible2}
              fromView={this.touchable2}
              placement={'bottom'}
              onClose={() => this.closePopover2()}>
              <Text style={{ color: colors.SKY, padding: 12, borderRadius: 12 }}>You Have 0 Notifications</Text>
            </Popover>

            <TouchableHighlight ref={ref => this.touchable3 = ref} onPress={() => this.showPopover3()}>
              <Image source={{uri:UtilService.getImg(Cache.currentUser.profile_picture)}} style={{ width: 34, height: 34, borderRadius: 17 }} />
            </TouchableHighlight>

            <Popover
              isVisible={this.state.isVisible3}
              fromView={this.touchable3}
              placement={'bottom'}
              onClose={() => this.closePopover3()}>
              <TouchableOpacity onPress={()=>{Actions.pop();Actions.signin()}}>
                <Text style={{ color: colors.SKY, padding: 12, borderRadius: 12 }}>Log out</Text>
              </TouchableOpacity>
            </Popover>
          </View>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 70,
    alignItems: 'center',
    paddingTop:24,
    width: '100%',
    paddingHorizontal: 12,
    flexDirection: "row",
    backgroundColor: '#111',
    elevation: 3,
  },
});
