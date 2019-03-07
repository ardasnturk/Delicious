import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableWithoutFeedback,
  UIManager,
  LayoutAnimation
} from "react-native";
import { Constants } from "expo";
import ImageFrame from "../components/ImageFrame";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

export default class ListFoods extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    data: []
  };

  componentWillMount() {
    this.setState({ data: this.props.navigation.getParam("foodList") });
  }

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          contentContainerStyle={styles.contentContainer}
          style={{ width: SCREEN_WIDTH }}
          renderItem={({ item }) => (
            <FoodListItem food={item} navigation={this.props.navigation} />
          )}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center"
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
                Bunları Yapabilirsin
              </Text>
            </View>
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

class FoodListItem extends Component {
  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }
  
  renderIngredients = () =>
    this.props.food.Malzeme.map((ingredient, index) => (
      <Text key={index.toString()} style={styles.ingredients}>
        {ingredient.toUpperCase()}
        {index !== this.props.food.Malzeme.length - 1 ? ", " : ""}
      </Text>
    ));

    

  render() {
    return (
      <View style={styles.foodListItemArea}>
        <TouchableWithoutFeedback
          onPress={() =>
            this.props.navigation.navigate("FoodScreen", {
              food: this.props.food
            })
          }
        >
          <View style={styles.foodListItemContainer}>
            <ImageFrame image={this.props.food.image} />
            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>{this.props.food.FoodName}</Text>
              <Text />
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                  left: 0,
                  width: "70%"
                }}
              >
                {this.renderIngredients()}
              </View>
              <Text style={styles.category}>FASTFOOD</Text>
              <Text style={styles.hardness}>KOLAY</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2"
  },
  contentContainer: {
    paddingTop: 20 + Constants.statusBarHeight
  },
  foodListItemArea: {
    marginLeft: 20,
    width: CARD_WIDTH,
    marginVertical: 30
  },
  foodListItemContainer: {
    width: CARD_WIDTH
  },
  title: {
    fontFamily: "fingerpaint",
    color: "#EB5757",
    fontSize: 20,
    width: "70%"
  },
  ingredients: {
    color: "#3338",
    fontFamily: "raleway-bold",
    fontSize: 12
  },
  category: {
    fontFamily: "raleway-thin",
    color: "#333",
    fontSize: 15,
    position: "absolute",
    right: 0,
    top: 5
  },
  hardness: {
    fontFamily: "raleway-light",
    color: "#333",
    fontSize: 15,
    position: "absolute",
    right: 0,
    top: 23
  },
  time: {
    color: "#F2994A",
    fontFamily: "fingerpaint"
  }
});
