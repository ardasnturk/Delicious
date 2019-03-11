import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          width: '100%'
        }}
      >
        <Text
          onPress={() => this.props.navigation.goBack()}
          style={{
            position: "absolute",
            left: 5,
            fontSize: 30,
            padding: 10,
            color: "#EB5757",
            fontFamily: "fingerpaint"
          }}
        >
          &lt;-
        </Text>
        <Text
          style={{
            marginLeft: 18,
            fontSize: 25,
            color: "#EB5757",
            fontFamily: "fingerpaint"
          }}
        >
          {this.props.title}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9"
  }
});
