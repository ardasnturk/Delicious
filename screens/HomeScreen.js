import React, { Component } from "react";
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
    searchText: "",
    data: [
      "Ananas",
      "Armut",
      "Avokado",
      "Ayva",
      "Yaban Mersini",
      "Hindistan Cevizi",
      "Ceviz",
      "Çilek",
      "Kivi",
      "Elma",
      "Erik",
      "Nar",
      "Hurma",
      "Limon",
      "Mandalina",
      "Mango",
      "Şeftali",
      "Kayısı",
      "Karpuz",
      "Kavun",
      "Muz",
      "İncir",
      "Portakal",
      "Kuru Kayısı",
      "Kuru Üzüm",
      "Kuru İncir",
      "Pancar",
      "Brokoli",
      "Biber",
      "Dereotu",
      "Domates",
      "Fasulye",
      "Fesleğen",
      "Soğan",
      "Havuç",
      "Salatalık",
      "Mısır",
      "Ispanak",
      "Kabak",
      "Lahana",
      "Karnabahar",
      "Kekik",
      "Kereviz",
      "Turp",
      "Marul",
      "Mantar",
      "Maydanoz",
      "Pırasa",
      "Patates",
      "Nane",
      "Patlıcan",
      "Roka",
      "Sarımsak",
      "Semizotu",
      "Zencefil",
      "Hurma",
      "Kuru Dut",
      "Brüksel Lahanası",
      "Razaki Üzüm",
      "Kuru Mürdüm Eriği",
      "Ispanak",
      "Bezelye",
      "Balkabağı",
      "Pazı",
      "Kuzukulağı",
      "Enginar",
      "Gelincik",
      "Radika",
      "Isırgan",
      "Kişniş",
      "Arapsaçı",
      "Kuş Üzümü",
      "Biberiye",
      "Ahududu",
      "Defne",
      "Asma Yaprağı",
      "Bamya",
      "Tarhun",
      "Bakla",
      "Taze Soğan",
      "Börülce",
      "Kabak Çiçeği",
      "Zerdeçal",
      "Kiraz",
      "Dana",
      "Kuzu",
      "Tavuk",
      "Hindi",
      "Balık",
      "Ahtapot",
      "Kalamar",
      "Karides",
      "Köfte",
      "Salam",
      "Sosis",
      "Sucuk",
      "Pastırma",
      "Kavurma",
      "Jambon",
      "Dana Kıyma",
      "Kuzu Kıyma",
      "Deniz Tarağı",
      "Ciğer",
      "Tavuk Ciğeri",
      "Kuzu Ciğeri",
      "Dana Ciğeri",
      "Kaz Ciğeri",
      "Somon",
      "Süt",
      "Peynir",
      "Yumurta",
      "Tereyağ",
      "Zeytin",
      "Margarin",
      "Yoğurt",
      "Kaymak",
      "Krema",
      "Yufka",
      "Ekmek",
      "Bal",
      "Reçel",
      "Tahin",
      "Pekmez",
      "Sos",
      "Lor Peyniri",
      "Yeşil Zeytin",
      "Kaşar Peyniri",
      "Parmesan Peyniri",
      "Labne Peyniri",
      "Haşhaş Peyniri",
      "Makarna",
      "Bulgur",
      "Pirinç",
      "Kuru Fasülye",
      "Mercimek",
      "Buğday",
      "Barbunya",
      "Nohut",
      "Bisküvi",
      "Cips",
      "Kek",
      "Kuru Meyve",
      "Kuru Yemiş",
      "Çikolata",
      "Gofret",
      "Sakız",
      "Şekerleme",
      "Bulyon",
      "Çorba",
      "Dondurulmuş Gıda",
      "Meze",
      "Konserve",
      "Salça",
      "Sirke",
      "Turşu",
      "Kurabiye",
      "Un",
      "Ayçiçek Yağı",
      "Zeytin Yağı",
      "Soya",
      "Baharat",
      "Tuz",
      "Şeker",
      "Keten Tohumu",
      "Badem",
      "Trüf Yağı",
      "Yulaf Ezmesi",
      "Hindiba",
      "Teff Unu",
      "Yulaf Unu",
      "Keçiboybuzu Unu",
      "Karabiber",
      "Ruşeym",
      "Kabartma Tozu",
      "İç Badem",
      "Çam Fıstığı",
      "İrmik",
      "Milföy Hamuru",
      "Vanilya",
      "Yulaf",
      "Kremşanti",
      "Karbonat",
      "Üzüm Pekmezi",
      "Fındık",
      "Fındık Yağı",
      "Fıstık",
      "Lavaş",
      "Tart Jölesi",
      "Kapari",
      "Kakao",
      "Nişasta",
      "Pudra Şekeri",
      "Sumak",
      "Vişne",
      "Yaş Maya",
      "Kuru Maya",
      "Biberiye",
      "Rezene",
      "Krema",
      "Dondurma",
      "Ançüez",
      "Karanfil",
      "Susam Yağı",
      "Et Suyu",
      "Vanilin",
      "Mısır Unu",
      "Hardal",
      "Damla Sakızı",
      "Tarhana",
      "Kedi Dili",
      "Arpa Şehriye",
      "Tel Şehriye",
      "Sıvı Yağ",
      "Yenibahar"
    ],
    foundInSearch: [],
    fruitsVegetables: [
      "Ananas",
      "Armut",
      "Avokado",
      "Ayva",
      "Yaban Mersini",
      "Hindistan Cevizi",
      "Ceviz",
      "Çilek",
      "Kivi",
      "Elma",
      "Erik",
      "Nar",
      "Hurma",
      "Limon",
      "Mandalina",
      "Mango",
      "Şeftali",
      "Kayısı",
      "Karpuz",
      "Kavun",
      "Muz",
      "İncir",
      "Portakal",
      "Kuru Kayısı",
      "Kuru Üzüm",
      "Kuru İncir",
      "Pancar",
      "Brokoli",
      "Biber",
      "Dereotu",
      "Domates",
      "Fasulye",
      "Fesleğen",
      "Soğan",
      "Havuç",
      "Salatalık",
      "Mısır",
      "Ispanak",
      "Kabak",
      "Lahana",
      "Karnabahar",
      "Kekik",
      "Kereviz",
      "Turp",
      "Marul",
      "Mantar",
      "Maydanoz",
      "Pırasa",
      "Patates",
      "Nane",
      "Patlıcan",
      "Roka",
      "Sarımsak",
      "Semizotu",
      "Zencefil",
      "Hurma",
      "Kuru Dut",
      "Brüksel Lahanası",
      "Razaki Üzüm",
      "Kuru Mürdüm Eriği",
      "Ispanak",
      "Bezelye",
      "Balkabağı",
      "Pazı",
      "Kuzukulağı",
      "Enginar",
      "Gelincik",
      "Radika",
      "Isırgan",
      "Kişniş",
      "Arapsaçı",
      "Kuş Üzümü",
      "Biberiye",
      "Ahududu",
      "Defne",
      "Asma Yaprağı",
      "Bamya",
      "Tarhun",
      "Bakla",
      "Taze Soğan",
      "Börülce",
      "Kabak Çiçeği",
      "Zerdeçal",
      "Kiraz"
    ],
    meatFish: [
      "Dana",
      "Kuzu",
      "Tavuk",
      "Hindi",
      "Balık",
      "Ahtapot",
      "Kalamar",
      "Karides",
      "Köfte",
      "Salam",
      "Sosis",
      "Sucuk",
      "Pastırma",
      "Kavurma",
      "Jambon",
      "Dana Kıyma",
      "Kuzu Kıyma",
      "Deniz Tarağı",
      "Ciğer",
      "Tavuk Ciğeri",
      "Kuzu Ciğeri",
      "Dana Ciğeri",
      "Kaz Ciğeri",
      "Somon"
    ],
    milkBreakfast: [
      "Süt",
      "Peynir",
      "Yumurta",
      "Tereyağ",
      "Zeytin",
      "Margarin",
      "Yoğurt",
      "Kaymak",
      "Krema",
      "Yufka",
      "Ekmek",
      "Bal",
      "Reçel",
      "Tahin",
      "Pekmez",
      "Sos",
      "Lor Peyniri",
      "Yeşil Zeytin",
      "Kaşar Peyniri",
      "Parmesan Peyniri",
      "Labne Peyniri",
      "Haşhaş Peyniri"
    ],
    candy: [
      "Makarna",
      "Bulgur",
      "Pirinç",
      "Kuru Fasülye",
      "Mercimek",
      "Buğday",
      "Barbunya",
      "Nohut",
      "Bisküvi",
      "Cips",
      "Kek",
      "Kuru Meyve",
      "Kuru Yemiş",
      "Çikolata",
      "Gofret",
      "Sakız",
      "Şekerleme",
      "Bulyon",
      "Çorba",
      "Dondurulmuş Gıda",
      "Meze",
      "Konserve",
      "Salça",
      "Sirke",
      "Turşu",
      "Kurabiye",
      "Un",
      "Ayçiçek Yağı",
      "Zeytin Yağı",
      "Soya",
      "Baharat",
      "Tuz",
      "Şeker",
      "Keten Tohumu",
      "Badem",
      "Trüf Yağı",
      "Yulaf Ezmesi",
      "Hindiba",
      "Teff Unu",
      "Yulaf Unu",
      "Keçiboybuzu Unu",
      "Karabiber",
      "Ruşeym",
      "Kabartma Tozu",
      "İç Badem",
      "Çam Fıstığı",
      "İrmik",
      "Milföy Hamuru",
      "Vanilya",
      "Yulaf",
      "Kremşanti",
      "Karbonat",
      "Üzüm Pekmezi",
      "Fındık",
      "Fındık Yağı",
      "Fıstık",
      "Lavaş",
      "Tart Jölesi",
      "Kapari",
      "Kakao",
      "Nişasta",
      "Pudra Şekeri",
      "Sumak",
      "Vişne",
      "Yaş Maya",
      "Kuru Maya",
      "Biberiye",
      "Rezene",
      "Krema",
      "Dondurma",
      "Ançüez",
      "Karanfil",
      "Susam Yağı",
      "Et Suyu",
      "Vanilin",
      "Mısır Unu",
      "Hardal",
      "Damla Sakızı",
      "Tarhana",
      "Kedi Dili",
      "Arpa Şehriye",
      "Tel Şehriye",
      "Sıvı Yağ",
      "Yenibahar"
    ],
    selectedIngredients: [],
    searching: false,
    listOpen: false
  };

  componentWillUpdate() {
    UIManager.setLayoutAnimationEnabledExperimental &&
      UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.easeInEaseOut();
  }

  handleSearch = () => {
    if (this.state.searchText !== "") {
      let foundSomeFood = false;
      const foundInSearch = [];
      for (let i = 0; i < this.state.data.length; i++) {
        const element = this.state.data[i];
        if (
          element.toLowerCase().includes(this.state.searchText.toLowerCase())
        ) {
          foundInSearch.push(element);
          foundSomeFood = true;
        }
      }
      this.setState({ foundInSearch, searchText: "", listOpen: foundSomeFood });
    } else {
      this.setState({ foundInSearch: [], listOpen: false });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
        scrollEnabled={!this.state.listOpen}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <TextInput
            autoCapitalize="words"
            style={styles.searchBar}
            placeholder="Malzemeleri Ara"
            placeholderTextColor="#27AE60"
            value={this.state.searchText}
            onChangeText={searchText => this.setState({ searchText })}
            onSubmitEditing={this.handleSearch}
          />
          <View
          maxHeight={SCREEN_HEIGHT * 0.6}
            style={[
              styles.searchList,
              {
                marginTop:
                  10,
                opacity: this.state.listOpen ? 1 : 0,
                height: this.state.listOpen ? null : 0,
              }
            ]}
          >
            <ScrollView contentContainerStyle={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {this.state.foundInSearch.map((item, index) => (
              <IngredientItem
                key={index.toString()}
                index={index}
                animate={this.state.animate}
                ingredient={item}
                color="#27AE60"
                addIngredient={this.addIngredient}
              />
            ))}
            </ScrollView>
          </View>
          <IngredientSection
            color="#27AE60"
            title="Meyve & Sebze"
            data={this.state.fruitsVegetables}
            addIngredient={this.addIngredient}
          />
          <IngredientSection
            color="#9B51E0"
            title="Et & Balık"
            data={this.state.meatFish}
            addIngredient={this.addIngredient}
          />

          <IngredientSection
            color="#EB5757"
            title="Süt Ürünleri & Kahvaltılıklar"
            data={this.state.milkBreakfast}
            addIngredient={this.addIngredient}
          />
          <IngredientSection
            color="#F2994A"
            title="Gıda & Şekerleme"
            data={this.state.candy}
            addIngredient={this.addIngredient}
          />
          <SelectedIngredientsSection
            color="#F2994A"
            title="Seçili Malzemeler"
            data={this.state.selectedIngredients}
            deleteIngredient={this.deleteIngredient}
          />
          <TouchableOpacity
            disabled={this.state.searching}
            onPress={this.searchWithIngredients}
          >
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
      selectedIngredients.push(ingredient.toLowerCase());
      this.setState({ selectedIngredients });
    }
    this.setState({ foundInSearch: [], searchText: "", listOpen: false });
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
  searchList: {
    borderColor: "#27AE60",
    borderWidth: 1,
    marginLeft: 20,
    borderRadius: 5,
    padding: 5,
    width: SCREEN_WIDTH - 40,
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#f2f2f2",
    zIndex: 10,
    overflow: 'hidden'
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
