import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/Header';

import i from '../../common/i';

export default class Payment extends React.Component {
  render() {
    return (
      <View
        style={i.container}>
        <Header />
        <Text>Hi Payment</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});