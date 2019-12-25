import * as React from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { colors } from '../../common/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as actions from "../../store/common/actions";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Actions } from 'react-native-router-flux';
import LottieScreen from '../../components/Lottie';
import i from '../../common/i'

class Forgot extends React.Component {

    state = {
        email:'',
        isWaiting: false
    }

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

        const {email} = this.state;

        if(this.props.loading){
            return <LottieScreen />
        }

        return (
            <View style={[i.container, {backgroundColor:colors.SKY}]}>

                <TouchableOpacity style={{marginTop:30}} onPress={()=>Actions.pop()}>
                    <MaterialCommunityIcons name="arrow-left" size={30} style={{padding:12}}/>
                </TouchableOpacity>
            
                <Text style={[styles.titleText, { marginTop: 20, fontSize: 22, color:'#fff', textAlign:'center', marginVertical:40 }]}>Reset Password</Text>
                
                <TextInput
                    style={styles.input}
                    underlineColorAndroid='transparent'
                    placeholder="Email Address"
                    Password={true}
                    onChangeText={email => this.setState({ email })}
                    value={email}
                />

                <View style={[styles.formGroup, {alignItems: 'flex-end', marginTop:5, marginRight: 20,}]}>

                    <TouchableOpacity style={styles.signupBtn} >
                      <Text style={styles.signinBtnTxt}>SEND PASSWORD RESET LINK</Text>
                    </TouchableOpacity>

                </View>
             
                {this.renderIndicator()}

            </View>
        )
    }
}

export default connect(
    state => ({
        user:state.common.user,
    }),
    dispatch => ({
        actions: bindActionCreators(actions, dispatch)
    })
)(Forgot);

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