import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  FlatList,
  UIManager,
  LayoutAnimation,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback
} from "react-native";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default class IngredientSection extends Component {
  state = {
    animate: false
  };
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.handleTitlePress}>
        <View style={styles.container}>
          <View style={styles.area}>
            <Text style={[styles.title, { color: this.props.color }]}>
              {this.props.title}
            </Text>
            <View
              style={[
                styles.line,
                { backgroundColor: this.props.color + "89" }
              ]}
            />
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                flexWrap: "wrap",
                overflow: "hidden",
                height: this.state.animate ? null : 0,
                marginTop: 10
              }}
            >
              {this.props.data.map((item, index) => (
                <IngredientItem
                  key={index.toString()}
                  index={index}
                  animate={this.state.animate}
                  ingredient={item}
                  color={this.props.color}
                  addIngredient={this.props.addIngredient}
                />
              ))}
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
  handleTitlePress = () => this.setState({ animate: !this.state.animate });
}

class IngredientItem extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.addIngredient(this.props.ingredient)}
        style={[styles.ingredientContainer]}
      >
        <Text
          style={[
            styles.ingredientText,
            { color: this.props.color, borderColor: this.props.color }
          ]}
        >
          {this.props.ingredient}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    backgroundColor: "transparent",
    marginVertical: 15,
    justifyContent: "center"
  },
  area: {
    width: SCREEN_WIDTH - 40,
    flexDirection: "column"
  },
  title: {
    fontFamily: "raleway-light",
    fontSize: 30,
    marginLeft: 10
  },
  line: {
    height: 1,
    width: "100%",
    marginTop: 5
  },
  ingredientText: {
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderWidth: 1,
    fontFamily: "raleway"
  },
  ingredientContainer: {
    margin: 5
  }
});
