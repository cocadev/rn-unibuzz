import * as React from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Modal, ToastAndroid } from 'react-native';
import { colors } from '../../common/colors';
import { images } from '../../common/images';
import * as actions from "../../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import LottieScreen from '../../components/Lottie';
import api from "../../service/api";
import Cache from "../../utils/cache";
import i from '../../common/i'

class SignIn extends React.Component {

    state = {
        email: '',
        password: '',
        isWaiting: false,
    }

    componentDidMount() {
        this.props.actions.getRegions();
    }
 
    onSignIn = () => {
        if(!this.state.email){
            ToastAndroid.show('Email is empty', ToastAndroid.SHORT);
            return false
        }
        if(!this.state.password){
            ToastAndroid.show('Password is empty', ToastAndroid.SHORT);
            return false
        }
        this.setState({isWaiting:true})     
        setTimeout(()=>{this.setState({isWaiting: false})}, 10000); 
        api.login(this.state.email, this.state.password, (err,res)=>{
            // console.log('********************* res ************************', res)
            // console.log('********************* err ************************', err)

            if (err == null){
                Cache.currentUser = res.user
                // console.log('********************* currentUser ************************', Cache.currentUser)
                this.setState({isWaiting:false})
                if(!res.message){
                    Actions.drawerMenu()
                } else {
                    ToastAndroid.show('Wrong Password', ToastAndroid.SHORT);
                }
            } else {
                ToastAndroid.show('Wrong User', ToastAndroid.SHORT);
            }

            this.setState({isWaiting:false})
        })
    };

    renderIndicator() {
        return (
          <Modal
            visible={this.state.isWaiting}
            transparent={true}
            onRequestClose={() => {}}
          >
            <View style={i.indicatorContainer}>
              <View style={i.indicator}>
                <LottieScreen />
              </View>
            </View>
          </Modal>
        );
    }

    render() {

        const { email, password } = this.state;

        return (
            <View style={[i.container, {backgroundColor:colors.SKY}]}>

                <View style={{width:'100%', alignItems:'center', marginVertical:40}}>
                  <Image source={images.logo} />
                </View>

                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Email"
                    onChangeText={email => this.setState({ email })}
                    value={email}
                />

                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={password => this.setState({ password })}
                    value={password}
                />

                <View style={[styles.formGroup, {alignItems: 'flex-end', flexDirection:'row', justifyContent:'space-around', marginTop:40}]}>

                    <TouchableOpacity onPress={this.onSignIn} style={styles.signupBtn} >
                      <Text style={styles.signinBtnTxt}>SIGN IN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>Actions.signup()} style={styles.signupBtn} >
                       <Text style={styles.signinBtnTxt}>SIGN UP</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
                    <TouchableOpacity onPress={()=>Actions.forgot()}>
                       <Text style={[styles.signinBtnTxt, {marginRight:22, marginTop:10}]}>Forget Password?</Text>
                    </TouchableOpacity>
                </View>
             
                {this.renderIndicator()}

            </View>
        )
    }
}

export default connect(
    state => ({ user: state.common.user, }),
    dispatch => ({ 
        actions: bindActionCreators(actions, dispatch) 
    }))(SignIn);

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
        backgroundColor:colors.WHITE,
        borderRadius:5,
        marginHorizontal:15,
        marginVertical:10,
        fontSize:20,
        padding:5,
        height:50
    }
})