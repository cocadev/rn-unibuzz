import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions, FlatList } from 'react-native';
import WallListItem from '../../components/WallListItem'
import i from '../../common/i'
import LottieScreen from '../../components/Lottie';
import api from "../../service/api";
import Header from '../../components/Header';
import { images } from '../../common/images';
import { colors } from '../../common/colors';
import Cache from "../../utils/cache";
import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import { PROFILE_PIC } from '../../common/staticdata';
import UtilService from '../../utils/utils';

const width = Dimensions.get('window').width

class UpdateProfile extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
      first_name: Cache.currentUser.first_name,
      last_name: Cache.currentUser.last_name,
      password: '',
      re_password: '',
      mobile: Cache.currentUser.phone,
      birth: Cache.currentUser.date_of_birth,
      modal: false,
      userImg: UtilService.getImg(Cache.currentUser.profile_picture)
    }
  }

  _renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>this.setState({userImg:UtilService.getImg(item.id), modal:false})}>
      <Image source={{ uri: item.image }} style={{ width: width / 4, height: width / 4 }} />
    </TouchableOpacity>
  );

  _ItemSeparator = () => <View style={styles.separator} />;

  renderIndicator() {
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator}>
            <FlatList
              data={PROFILE_PIC}
              keyExtractor={(item, i) => String(i)}
              renderItem={this._renderItem}
              numColumns={3}
            />
            <View style={{ flexDirection: 'row', marginVertical: 12, justifyContent: 'space-around', width:'80%' }}>
              <TouchableOpacity style={{borderRadius:22, paddingHorizontal:20, backgroundColor:colors.ORANGE, padding:3}} onPress={() => this.setState({ modal: false })}>
                <Text style={{color:'#fff'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { last_name, first_name, password, re_password, mobile, birth } = this.state
    return (
      <View style={i.container}>
        <Header />

        <ScrollView style={{ flex: 1, padding: 6 }}>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <EvilIcons name="user" size={50} color={'#2cc0f0'} />
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Update Profile</Text>
          </View>

          <View style={{ height: 1, backgroundColor: colors.GREY2, marginHorizontal: 4, marginTop: 6 }}></View>

          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder="First Name"
            onChangeText={first_name => this.setState({ first_name })}
            value={first_name}
          />

          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder="Last Name"
            onChangeText={last_name => this.setState({ last_name })}
            value={last_name}
          />

          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={password}
          />

          <Text style={styles.text}>Re-Type Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            placeholder="Re-Type Password"
            onChangeText={re_password => this.setState({ re_password })}
            value={re_password}
          />

          <Text style={styles.text}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder="Birth"
            onChangeText={birth => this.setState({ birth })}
            value={birth}
          />

          <Text style={styles.text}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            underlineColorAndroid='transparent'
            placeholder="mobile"
            onChangeText={mobile => this.setState({ mobile })}
            value={mobile}
          />

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
            <Image source={{uri:this.state.userImg}} style={{ width: 160, height: 160 }} />
            <TouchableOpacity onPress={() => this.setState({ modal: true })}>
              <Text style={{ fontSize: 18, color: colors.ORANGE }}>Choose Avatar</Text>
            </TouchableOpacity>
          </View>

          <View style={[{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }]}>

            <TouchableOpacity style={styles.signupBtn} >
              <Text style={styles.signinBtnTxt}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupBtn} onPress={() => Actions.pop()}>
              <Text style={styles.signinBtnTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {this.renderIndicator()}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  signupBtn: {
    backgroundColor: colors.ORANGE,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  signinBtnTxt: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center'
  },
  input: {
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    fontSize: 16,
    padding: 5,
    height: 36,
    borderColor: colors.GREY2,
    borderWidth: 1,
  },
  text: {
    fontSize: 16,
    marginLeft: 12,
    marginTop: 12
  },
  indicatorContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    width: width / 1.2,
    height: width,
    paddingTop:12,
    borderRadius: 5,
    shadowColor: "black",
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    backgroundColor: "white"
  },
});

export default UpdateProfile;