import React, { Component } from 'react';

import { StyleSheet, Platform, View, Text, Image, TouchableOpacity, YellowBox } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default class SideMenu extends Component {
    constructor(props) {
        super(props);

    };

    render() {
        return (
            <View style={styles.container}>
              
              <TouchableOpacity onPress={()=>Actions.wall()}>
                 <Text style={{color:'#fff', fontSize:20}}>Wall</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>Actions.myaccount()}>
                 <Text style={{color:'#fff', fontSize:20}}>My Account</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>Actions.gpa()}>
                 <Text style={{color:'#fff', fontSize:20}}>My GPA</Text>
              </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        padding: 20,
        flexDirection: 'column',
        backgroundColor: '#222',
    },

});