import React from 'react';
import { StyleSheet, Text, View, Picker, Image, TextInput, TouchableOpacity, ScrollView, Modal, Dimensions, FlatList, CheckBox, KeyboardAvoidingView, ToastAndroid } from 'react-native';
import i from '../../common/i'
import LottieScreen from '../../components/Lottie';
import api from "../../service/api";

import { colors } from '../../common/colors';
import { Actions } from 'react-native-router-flux';
import { PROFILE_PIC } from '../../common/staticdata';
import UtilService from '../../utils/utils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Message } from 'react-native-gifted-chat';

const width = Dimensions.get('window').width

class SignUp extends React.Component {

    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            isWaiting: false,
            first_name: '',
            last_name: '',
            password: null,
            re_password: null,
            checked1: true,
            checked2: false,
            university: '',
            university_id: '',
            modal: false,
            userImg: null,
            profile_picture:null,
            country: '',
            domain: '',
            email: ""
        }
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.setState({ userImg: UtilService.getImg(item.id), modal: false, profile_picture:item.id })}>
            <Image source={{ uri: item.image }} style={{ width: width / 4, height: width / 4 }} />
        </TouchableOpacity>
    );

    _ItemSeparator = () => <View style={styles.separator} />;

    onChangeCheck1() {
        this.setState({ checked1: !this.state.checked1, checked2: this.state.checked1 })
    }

    onChangeCheck2() {
        this.setState({ checked2: !this.state.checked2, checked1: this.state.checked2 })
    }

    onSignUp = () => {

        if (!this.state.password) {
            ToastAndroid.show('No Password', ToastAndroid.SHORT);
            return false
        }

        if (this.state.password !== this.state.re_password) {
            ToastAndroid.show('Wrong Matched Password', ToastAndroid.SHORT);
            return false
        }

        if (!this.state.userImg) {
            ToastAndroid.show('No Avatar', ToastAndroid.SHORT);
            return false
        }

        if (!this.state.email) {
            ToastAndroid.show('No Email', ToastAndroid.SHORT);
            return false
        }

        const fname = this.state.first_name;
        const lname = this.state.last_name;
        const country_id = this.state.country;
        const college_id = this.state.college;
        const email = this.state.email;
        const password = this.state.password;
        const gender = this.state.checked1?'male':'female';
        const profile_picture = this.state.profile_picture;
        const ip_address = "";
        const university_id = this.state.university_id;
        const username = this.state.first_name + this.state.last_name;

        api.signup(fname, lname, country_id, college_id, email, password, gender, profile_picture, ip_address, university_id, username, (err, res) => {
            console.log('********************* res ************************', res)
            console.log('********************* err ************************', err)

            if (err == null && res.message) {
                this.setState({ isWaiting: false })
                ToastAndroid.show('Success!', ToastAndroid.SHORT);
                Actions.pop();
            }

            this.setState({ isWaiting: false })
        })
    }

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
                        <View style={{ flexDirection: 'row', marginVertical: 12, justifyContent: 'space-around', width: '80%' }}>
                            <TouchableOpacity style={{ borderRadius: 22, paddingHorizontal: 20, backgroundColor: colors.ORANGE, padding: 3 }} onPress={() => this.setState({ modal: false })}>
                                <Text style={{ color: '#fff' }}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    showCountry(itemValue) { this.setState({ country: itemValue }); }
    showUniversity(itemValue) { this.setState({ university: itemValue }); }
    showCollege(itemValue) { this.setState({ college: itemValue }); }
    showDomain(itemValue) { this.setState({ domain: itemValue }); }

    render() {
        const { last_name, first_name, password, re_password, college, university, university_id, country, domain, email } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' enabled style={[i.container, { backgroundColor: colors.SKY }]}>
                <ScrollView >
                    <TouchableOpacity style={{ marginTop: 30 }} onPress={() => Actions.pop()}>
                        <MaterialCommunityIcons name="arrow-left" size={30} style={{ padding: 12 }} />
                    </TouchableOpacity>

                    <Text style={[styles.titleText, { marginTop: 20, fontSize: 22, color: '#fff', textAlign: 'center', marginVertical: 40 }]}>Company Sign Up</Text>

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

                    <Text style={styles.text}>Country</Text>
                    <Picker
                        selectedValue={this.state.country}
                        style={styles.inputPicker}
                        onValueChange={(itemValue, itemIndex) => this.showCountry(itemValue)}
                    >
                        <Picker.Item label="United Arab Emirates" value="1" />

                    </Picker>

                    <Text style={styles.text}>University*</Text>
                    <Picker
                        selectedValue={this.state.university}
                        style={styles.inputPicker}
                        onValueChange={(itemValue, itemIndex) => this.showUniversity(itemValue)}
                    >
                        <Picker.Item label="Select University" value="0" />
                        <Picker.Item label="American University of Sharjah" value="1" />
                        <Picker.Item label="University of Sharjah" value="2" />
                        <Picker.Item label="Rochester Institute of Technology" value="3" />
                    </Picker>

                    <Text style={styles.text}>College*</Text>
                    <Picker
                        selectedValue={this.state.college}
                        style={styles.inputPicker}
                        onValueChange={(itemValue, itemIndex) => this.showCollege(itemValue)}
                    >
                        <Picker.Item label="Select College" value="0" />

                    </Picker>

                    <Text style={styles.text}>University ID*</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="eg:g102387"
                        onChangeText={university_id => this.setState({ university_id })}
                        value={university_id}
                    />

                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        value={email}
                    />
                    {/* <Picker
                        selectedValue={this.state.domain}
                        style={styles.inputPicker}
                        onValueChange={(itemValue, itemIndex) => this.showDomain(itemValue)}
                    >
                        <Picker.Item label="gmail.com" value="gmail.com" />

                    </Picker> */}

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

                    <Text style={styles.text}>Gender</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 3 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <CheckBox value={this.state.checked1} onChange={() => this.onChangeCheck1()} />
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>Male</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 12 }}>
                            <CheckBox value={this.state.checked2} onChange={() => this.onChangeCheck2()} />
                            <Text style={{ fontWeight: 'bold', color: '#fff', fontSize: 16 }}>Female</Text>
                        </View>
                    </View>

                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        {this.state.userImg && <Image source={{ uri: this.state.userImg }} style={{ width: 160, height: 160 }} />}
                        <TouchableOpacity onPress={() => this.setState({ modal: true })}>
                            <Text style={{ fontSize: 18, color: colors.WHITE, fontWeight: 'bold' }}>Choose Avatar</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-around', marginVertical: 15 }]}>

                        <TouchableOpacity style={styles.signupBtn} onPress={this.onSignUp}>
                            <Text style={styles.signinBtnTxt}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>

                    {this.renderIndicator()}
                </ScrollView>
            </KeyboardAvoidingView>
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
        backgroundColor: '#fff',
        color: '#535353'
    },
    inputPicker: {
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 5,
        padding: 5,
        height: 36,
        backgroundColor: '#fff',
        color: '#535353'

    },
    text: {
        fontSize: 16,
        marginLeft: 12,
        marginTop: 12,
        color: '#fff',
        fontWeight: 'bold'
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
        paddingTop: 12,
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

export default SignUp;