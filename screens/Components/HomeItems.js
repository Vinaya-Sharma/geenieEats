import React from 'react';
import { View, Text, Image, ScrollView} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import InfiniteScroll from 'react-native-infinite-looping-scroll';

const HomeItems = () => {

    const icons = [{
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/shopping-bag.png"),
        text: "Pick-up",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/chinese.png"),
        text: "Chinese",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/indian.png"),
        text: "Indian",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/mexican.png"),
        text: "Mexican",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/fast-food.png"),
        text: "Fast Food",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/desserts.png"),
        text: "Desserts",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/pizza.png"),
        text: "Pizza",
      },
      ,
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/drink.png"),
        text: "Drinks",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/pasta.jpeg"),
        text: "Pasta",
      },
      {
        image: require("/Users/vinayasharma/Desktop/krish/screens/assets/snacks.png"),
        text: "snacks",
      },
      {
          image: require("/Users/vinayasharma/Desktop/krish/screens/assets/deals.png"),
          text: "Deals",
        },
    ];

  return (
      <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginTop:20, marginLeft:10}} >
       {icons.map((icon, index) => (
        <View style = {{alignItems:"center", marginRight: 30}} key = {index}>
          <Image style={{
                width: 50,
                height: 40,
                resizeMode: "contain",}}
              source={icon.image}/>
            <Text>{icon.text}</Text>
          </View>
      ))}
       </ScrollView>
      </View>
  );
};

export default HomeItems;
