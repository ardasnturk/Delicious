import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

export default class ImageFrame extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.frame}>
          <View style={styles.imageHolder}>
            <Image style={styles.image} source={{ uri: this.props.image }} />
          </View>
        </View>
        <View
          style={[
            styles.frame,
            { zIndex: 1, transform: [{ rotateZ: "3deg" }], backgroundColor: '#EB5757' }
          ]}
        />
        <View
          style={[
            styles.frame,
            { zIndex: 2, transform: [{ rotateZ: "-3deg" }], backgroundColor: '#F2994A' }
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: (CARD_WIDTH * 2) / 3
  },
  frame: {
    position: "absolute",
    width: CARD_WIDTH,
    height: (CARD_WIDTH * 2) / 3,
    elevation: 4,
    overflow: "hidden",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    zIndex: 10,
    borderWidth: 1,
    borderColor: "#efefef"
  },
  imageHolder: {
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#efefef",
    width: "90%",
    height: "85%",
    borderRadius: 5
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
    borderRadius: 5
  }
});
