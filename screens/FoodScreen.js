import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ScrollView
} from "react-native";
import { Constants } from "expo";
import ImageFrame from "../components/ImageFrame";
import Header from "../components/Header";
import Subtitle from "../components/Subtitle";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH - 40;

export default class FoodScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    ingredients: []
  };

  randomColor = color => {
    switch (color) {
      case 0:
        return "#EB5757";
      case 1:
        return "#F2994A";
      case 2:
        return "#27AE60";
      case 3:
        return "#2D9CDB";
      case 4:
        return "#9B51E0";
      default:
        return "#EB5757";
    }
  };

  renderIngredients = () =>
    this.props.navigation.getParam("food").Malzeme.map((ingredient, index) => (
      <Text
        key={index.toString()}
        style={{
          fontFamily: "raleway-bold",
          fontSize: 15,
          color: this.randomColor(index % 5),
          marginVertical: 3
        }}
      >
        {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
      </Text>
    ));

  render() {
    const {
      image,
      FoodName: foodName,
      KacKisi: portion,
      HazirlikSure: prepateTime,
      PisirmeSure: cookTime,
      Hazirlanisi: howToCook
    } = this.props.navigation.getParam("food");
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <Header title={foodName} navigation={this.props.navigation} />
          <View style={{ marginTop: 30 }} />
          <ImageFrame image={image} />
          <View style={styles.infosView}>
            <View style={styles.singleInfo}>
              <View style={styles.singleInfo}>
                <Text style={styles.infoText}>{portion}</Text>
                <Text
                  style={[
                    styles.infoText,
                    { fontFamily: "raleway-bold", fontSize: 14, marginTop: 5 }
                  ]}
                >
                  Kişilik
                </Text>
              </View>
            </View>
            <View style={styles.singleInfo}>
              <View style={styles.singleInfo}>
                <Text style={styles.infoText}>{prepateTime}</Text>
                <Text
                  style={[
                    styles.infoText,
                    { fontFamily: "raleway-bold", fontSize: 14, marginTop: 5 }
                  ]}
                >
                  Hazırlık
                </Text>
              </View>
            </View>
            <View style={styles.singleInfo}>
              <View style={styles.singleInfo}>
                <Text style={styles.infoText}>{cookTime}</Text>
                <Text
                  style={[
                    styles.infoText,
                    { fontFamily: "raleway-bold", fontSize: 14, marginTop: 5 }
                  ]}
                >
                  Pişirme
                </Text>
              </View>
            </View>
          </View>
          <Subtitle title="Malzemeler" color="#EB5757" />
          <View
            style={{
              width: SCREEN_WIDTH - 60,
              marginLeft: 30,
              marginTop: 15,
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            {this.renderIngredients()}
          </View>
          <Subtitle title="Nasıl Yapılır?" color="#EB5757" />
          <Text style={styles.howToCook}>{howToCook}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  contentContainer: {
    paddingTop: 20 + Constants.statusBarHeight,
    paddingBottom: 20,
    alignItems: "center"
  },
  infosView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25
  },
  singleInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  infoText: {
    color: "#EB5757",
    fontFamily: "raleway-thin",
    fontSize: 35,
    marginHorizontal: 20
  },
  howToCook: {
    fontFamily: "raleway",
    fontSize: 15,
    width: "80%",
    marginTop: 18,
    lineHeight: 22,
    color: "#333b"
  }
});
