import React from 'react';
import { StyleSheet, Text, View, Image, CheckBox, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput } from 'react-native';
import WallListItem from '../../components/WallListItem'
import i from '../../common/i'
import LottieScreen from '../../components/Lottie';
import api from "../../service/api";
import Header from '../../components/Header';
import { images } from '../../common/images';
import { colors } from '../../common/colors';
import Cache from "../../utils/cache";
import { MaterialCommunityIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { Actions } from 'react-native-router-flux';
import UtilService from '../../utils/utils';

const width = Dimensions.get('window').width

class MyAccount extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      isWaiting: false,
      accounts:null,
      checked:false,
      modal:false,
      pri_email:''
    }
  }

  componentDidMount() {
    this.setState({ isWaiting: true })
    api.getMyAccount((err, res) => {
      if (err == null) {
        console.log('********************* res ************************', res.posts)
        this.setState({accounts: res.posts})
      }
    })
    this.setState({ isWaiting: false })
  }

  onChangeCheck() {
    this.setState({ checked: !this.state.checked})
  }

  renderIndicator() {
    const { pri_email } = this.state
    return (
      <Modal
        visible={this.state.modal}
        transparent={true}
        onRequestClose={() => { }}
      >
        <View style={styles.indicatorContainer}>
          <View style={styles.indicator}>
            <Text style={styles.text}>Update Primary Email</Text>
            <TextInput
              style={styles.input}
              underlineColorAndroid='transparent'
              placeholder="Enter Email"
              onChangeText={pri_email => this.setState({ pri_email })}
              value={pri_email}
            />
            <View style={{ flexDirection: 'row', marginVertical: 12, justifyContent: 'space-around', width:'80%' }}>
              <TouchableOpacity style={{borderRadius:22, paddingHorizontal:20, backgroundColor:colors.RED, padding:3}} onPress={() => this.setState({ modal: false })}>
                <Text style={{color:'#fff'}}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{borderRadius:22, paddingHorizontal:20, backgroundColor:colors.GREEN, padding:3}} onPress={() => this.setState({ modal: false })}>
                <Text style={{color:'#fff'}}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  render() {
    const { isWaiting, posts } = this.state
    return (
      <View style={i.container}>
        <Header />

        <ScrollView style={{ flex: 1, padding:12}}>
          <Image source={{uri:UtilService.getImg(Cache.currentUser.profile_picture)}} style={{width:60, height:60, borderRadius:30, marginLeft:12}}/>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>Name</Text>
             <Text style={{fontSize:17}}>{Cache.currentUser.first_name}</Text>
          </View>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>University</Text>
             <Text style={{fontSize:17}}>{UtilService.getUniversity(Cache.currentUser.university_id)}</Text>
          </View>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>College</Text>
             <Text style={{fontSize:17}}>{Cache.currentUser.college_id}</Text>
          </View>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>Email</Text>
             <Text style={{fontSize:17}}>{Cache.currentUser.email}</Text>
          </View>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>Gender</Text>
             <Text style={{fontSize:17}}>{Cache.currentUser.gender}</Text>
          </View>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>Mobile</Text>
             <Text style={{fontSize:17}}>{Cache.currentUser.phone}</Text>
          </View>
          <View style={styles.row}>
             <Text style={{color:colors.SKY, fontSize:20}}>Primary Email</Text>
             <Text style={{fontSize:17}}>{Cache.currentUser.email}</Text>
          </View>
          <View style={[styles.row, {alignItems:'flex-start', paddingRight:30}]}>
             <CheckBox 
                value={this.state.checked}
                onChange={() => this.onChangeCheck()}
             />
             <Text style={{fontSize:14, color:colors.GREEN,}}>Want to receive system notifications on primary email?</Text>
          </View>
          <View style={[styles.row, {alignItems:'center', justifyContent:'flex-start'}]}>
             <MaterialCommunityIcons name="timer" size={24} color={colors.SKY2} style={{marginLeft:3}}/>
             <Text style={{fontSize:14, color:colors.SKY2, marginLeft:6}}>Data Joined {Cache.currentUser.created_at }</Text>
          </View>

          <TouchableOpacity onPress={()=>Actions.updateprofile()} style={[styles.signupBtn, {marginLeft:22}]} >
            <Text style={{color:'#fff'}}>Edit Profile</Text>
          </TouchableOpacity>

          <View style={[styles.row, {alignItems:'center', justifyContent:'flex-start', marginTop: 10,}]}>
             <MaterialCommunityIcons name="bell" size={24} color={colors.SKY2} style={{marginLeft:3}}/>
             <View style={{flexDirection:'row'}}>
               <Text style={{fontSize:14, color:colors.SKY2, marginLeft:6}}>Update Primary Email</Text>
               <TouchableOpacity onPress={()=>this.setState({modal:true})}>
                 <Text style={{fontSize:14, color:colors.GREEN, marginLeft:12}}>Update Email</Text>
               </TouchableOpacity>
             </View>
          </View>

          <View style={[styles.row, {alignItems:'center', justifyContent:'flex-start'}]}>
             <MaterialCommunityIcons name="mailbox" size={24} color={colors.SKY2} style={{marginLeft:3}}/>
             <View style={{backgroundColor:colors.PINK, borderRadius:20, padding:2, paddingHorizontal:12, marginLeft:6}}>
               <Text style={{color:'#fff'}}>0</Text>
             </View>
             <Text style={{fontSize:14, color:colors.GREY1, marginLeft:5}}>Messages</Text>
          </View>

          <View style={[styles.row, {alignItems:'center', justifyContent:'flex-start'}]}>
             <FontAwesome name="users" size={24} color={colors.SKY2} style={{marginLeft:3}}/>
             <View style={{backgroundColor:colors.SKY2, borderRadius:20, padding:2, paddingHorizontal:12, marginLeft:6}}>
               <Text style={{color:'#fff'}}>0</Text>
             </View>
             <Text style={{fontSize:14, color:colors.GREY1, marginLeft:5}}>Group Invite</Text>
          </View>
          
          <View style={{justifyContent:'center', alignItems:'center'}}>
            <Ionicons name="ios-alarm" size={70} color={colors.SKY2} style={{marginTop: 12,}}/>
            <View style={[styles.signupBtn, { width:80, paddingVertical:3, borderRadius:6}]} >
              <Text style={{color:'#fff'}}>1 Days</Text>
            </View>
            <Text style={{fontSize:18, color:colors.SKY2, marginBottom:20}}>Test event from calendar page</Text>
          </View>

        </ScrollView>
        {isWaiting &&  <LottieScreen />}
        {this.renderIndicator()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    height: 5,
    backgroundColor: 'rgba(0, 0, 0, .08)',
  },
  row:{
    flexDirection:'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal:12,
    paddingVertical:3
  },
  signupBtn: {
    backgroundColor: colors.ORANGE,
    borderRadius: 50,
    paddingVertical: 8,
    paddingHorizontal: 16,
    width:100
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
    width:width/1.4
  },
  indicatorContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  indicator: {
    width: width / 1.2,
    height: width/3,
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

export default MyAccount;