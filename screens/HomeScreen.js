import React from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  UIManager,
  LayoutAnimation,
  Dimensions,
  TextInput,
  Alert,
  ActivityIndicator
} from "react-native";
import { Constants } from "expo";
import * as firebase from "firebase";
import IngredientSection from "../components/IngredientSection";
import SelectedIngredientsSection from "../components/SelectedIngredientsSection";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  });

  state = {
    data: [
      "biber",
      "maydanoz",
      "peynir",
      "yag",
      "elma",
      "armut",
      "domates",
      "havuç",
      "ananas",
      "deneme",
      "elma",
      "armut",
      "domates",
      "havuç",
      "ananas",
      "deneme",
      "elma",
      "armut",
      "domates",
      "havuç",
      "ananas",
      "deneme",
      "elma",
      "armut",
      "domates",
      "havuç",
      "ananas",
      "deneme",
      "elma",
      "armut",
      "domates",
      "havuç",
      "ananas",
      "deneme",
      "elma",
      "armut",
      "domates",
      "havuç"
    ],
    selectedIngredients: [],
    searching: false
  };

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TextInput
            style={styles.searchBar}
            placeholder="Malzemeleri Ara"
            placeholderTextColor="#27AE60"
          />
          <IngredientSection
            color="#27AE60"
            title="Meyve & Sebze"
            data={this.state.data}
            addIngredient={this.addIngredient}
          />
          <IngredientSection
            color="#9B51E0"
            title="Et & Balık"
            data={this.state.data}
            addIngredient={this.addIngredient}
          />

          <IngredientSection
            color="#EB5757"
            title="Süt Ürünleri & Kahvaltılıklar"
            data={this.state.data}
            addIngredient={this.addIngredient}
          />
          <IngredientSection
            color="#F2994A"
            title="Gıda & Şekerleme"
            data={this.state.data}
            addIngredient={this.addIngredient}
          />
          <SelectedIngredientsSection
            color="#F2994A"
            title="Seçili Malzemeler"
            data={this.state.selectedIngredients}
            deleteIngredient={this.deleteIngredient}
          />
          <TouchableOpacity disabled={this.state.searching} onPress={this.searchWithIngredients}>
            {this.state.searching ? (
              <ActivityIndicator size="small" color="#EB5757" />
            ) : (
              <Text style={styles.searchButtonText}>Yemekleri Ara</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  addIngredient = ingredient => {
    const { selectedIngredients } = this.state;
    if (!selectedIngredients.includes(ingredient)) {
      selectedIngredients.push(ingredient);
      this.setState({ selectedIngredients });
    }
  };

  deleteIngredient = ingredient => {
    const { selectedIngredients } = this.state;
    if (selectedIngredients.includes(ingredient)) {
      for (let i = 0; i < selectedIngredients.length; i++) {
        const element = selectedIngredients[i];
        if (element === ingredient) {
          selectedIngredients.splice(i, 1);
          this.setState({ selectedIngredients });
          break;
        }
      }
    }
  };

  searchWithIngredients = () => {
    const { selectedIngredients } = this.state;
    const foodList = [];
    if (selectedIngredients.length !== 0) {
      this.setState({ searching: true });
      firebase
        .database()
        .ref("foodList")
        .once("value")
        .then(foods => {
          const foodsData = Object.values(foods.val());
          for (let i = 0; i < foodsData.length; i++) {
            const food = foodsData[i];
            const { Malzeme } = food;
            let matchedIngredients = 0;
            for (let j = 0; j < Malzeme.length; j++) {
              const ingredient = Malzeme[j];
              if (selectedIngredients.includes(ingredient)) {
                matchedIngredients++;
              }
            }

            if (matchedIngredients === Malzeme.length) {
              foodList.push(food);
            }
          }
          setTimeout(() => {
            this.setState({ searching: false });
          }, 500);
          return foodList;
        })
        .then(foodList => {
          setTimeout(() => {
            this.setState({ searching: false });
          }, 500);
          if (foodList.length !== 0)
            this.props.navigation.navigate("FoodList", { foodList });
          else
            Alert.alert(
              "Üzgünüm ama bu malzemelerle olmaz...",
              "Bence birkaç malzeme daha eklemelisin. Malesef seçtiklerinle hiçbir yemek yapamadım."
            );
        });
    } else {
      Alert.alert(
        "Tencere boş görünüyor!",
        "Malzeme seçersen daha iyi olabilir."
      );
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2"
  },
  contentContainer: {
    paddingTop: 20 + Constants.statusBarHeight,
    paddingBottom: 20
  },
  searchBar: {
    borderColor: "#27AE60",
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: SCREEN_WIDTH - 40,
    fontFamily: "raleway-bold",
    fontSize: 12,
    color: "#27AE60"
  },
  searchButtonText: {
    fontFamily: "raleway-bold",
    fontSize: 13,
    borderColor: "#EB5757",
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 12,
    width: SCREEN_WIDTH - 40,
    color: "#EB5757",
    textAlign: "center"
  }
});
