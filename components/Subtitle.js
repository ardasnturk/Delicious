import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default class Subtitle extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title, { color: this.props.color }]}>
          {this.props.title}
        </Text>
        <View
          style={[styles.line, { backgroundColor: this.props.color + "89" }]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH - 40,
    justifyContent: "center",
    alignItems: "flex-start",
    marginTop: 30
  },
  title: {
    fontFamily: "raleway",
    fontSize: 30,
    marginLeft: 10
  },
  line: {
    height: 1,
    width: "100%",
    marginTop: 5
  }
});
