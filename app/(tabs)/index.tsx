import React, { useState } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

const App = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleButton = () => {
    console.log("get started");
  };

  const images: string[] = [
    "https://i.postimg.cc/FsJFVsV2/Screenshot-56.png",
    "https://i.postimg.cc/FsJFVsV2/Screenshot-56.png",
    "https://i.postimg.cc/FsJFVsV2/Screenshot-56.png"
  ];

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPostion = event.nativeEvent.contentOffset.x; //get horizontal scroll position
    const index = Math.round(scrollPostion / width);  //calculate which slide is showing
    setActiveIndex(index);
  };

  const renderImg = ({ item }: { item: string }) => (
    <View>
      <Image source={{ uri: item }} style={styles.image} />
    </View>
  );

  const Scrolling = () => {
    return (
      <View style={styles.dotContainer}>
        <View style={styles.dots}>
          {images.map((item, index) => (
            <View
              key={index}
              style={[styles.createDot, {
                width: activeIndex === index ? 16 : 4, //make a dot wider
                opacity: activeIndex === index ? 1 : 0.2 //make inactive dot faded
              }]}
            ></View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FlatList
            data={images}
            renderItem={renderImg}
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.title}>Join now and launch your sales quickly</Text>
          <Text style={styles.subTitle}>With just a few steps, you can reach new customers and begin selling almost immediately</Text>
        </View>

        <Scrolling />

        <TouchableOpacity onPress={handleButton} style={styles.button}>
          <Text style={styles.buttonText}>Get started</Text>
        </TouchableOpacity>

        <Text style={styles.skipButton}>Skip</Text>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor : "white",
    padding : 10
  },
  contentContainer : {
    flex : 1,
    alignItems : "center",
    paddingHorizontal : 20,
    justifyContent : "space-between"
  },
  imageContainer : {
    justifyContent : "center",
    height : 400
  },
  image: {
    paddingTop : 20,
    marginLeft : 10,
    marginTop : 30,
    height: 350,
    width: 300,
    resizeMode: "contain", 
  },
  dots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 4,
    marginBottom : 20,
    marginTop : -30
  },
  dotContainer : {
    alignItems: 'center',
    marginTop : 20
  },
  createDot : {
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ff7733',
    marginHorizontal: 2
  },
  textContainer : {
    marginTop : 5
  },
  title : {
    fontSize : 24,
    fontWeight :700,
    textAlign : "center",
    marginBottom : 12
  },
  subTitle : {
    fontSize : 13,
    textAlign : "center",
    marginBottom : 32,
    lineHeight : 18,
  },
  button : {
    backgroundColor : "#ff7733",
    color : "white",
    borderRadius : 25,
    padding : 16,
    alignItems : "center",
    marginBottom : 20
  },
  buttonText : {
    color : "#ffffff",
    fontSize : 16,
    fontWeight : 400,
    textAlign : "center"
  },
  skipButton : {
    fontSize : 16,
    fontWeight : 400,
    textAlign : "center"
  }
});

export default App;
