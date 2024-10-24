import { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity, useWindowDimensions } from 'react-native';
import { Image } from 'expo-image';
import { musicList } from '../constants/music';
import { useRouter } from "expo-router";
import GradientCanvas from './gradientCanvas';
import { useSharedValue } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRandomColor } from '../constants/utils';

export default function Index() {
  const [leftC, setLeftC] = useState("#833b72");
  const [leftR, setLeftR] = useState("#dbce3b");
  const router = useRouter();
  const { width, height } = useWindowDimensions();

  const leftColor = useSharedValue(leftC);
  const rightColor = useSharedValue(leftR);

  const [music, setMusic] = useState(musicList);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    leftColor.value = (leftC);
    rightColor.value = (leftR);
  }, [leftC, leftR]);

  const handlePressItem = (id: string) => {
    const newLeftColor = getRandomColor();
    const newRightColor = getRandomColor();

    setLeftC(newLeftColor);
    setLeftR(newRightColor);

    storeData(newLeftColor, newRightColor);

    router.push(`/play?id=${id}`);
  };

  const getData = async () => {
    try {
      const left = await AsyncStorage.getItem('valueL');
      const right = await AsyncStorage.getItem('valueR');

      if (left) setLeftC(left);
      if (right) setLeftR(right);
    } catch (e) {
      console.log("Error: " + e + ". Error reading data.");
    }
  };

  const storeData = async (left: string, right: string) => {
    try {
      await AsyncStorage.setItem('valueL', left);
      await AsyncStorage.setItem('valueR', right);
    } catch (e) {
      console.log("Error: " + e + ". Error storing data.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <GradientCanvas 
        width={width} 
        height={height} 
        leftColor={leftColor} 
        rightColor={rightColor} 
      />
    <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Listen to your favorite music!</Text>
        </View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={music}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.itemContainer}
              onPress={() => handlePressItem(item.id)}
              >
                <Image style={styles.itemImage} 
                      source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/The_Sounds_of_Earth_-_GPN-2000-001976.jpg/260px-The_Sounds_of_Earth_-_GPN-2000-001976.jpg" }}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.itemSong}>{item.song}</Text>
                  <Text style={styles.itemArtist}>{item.artist}</Text>
                </View>
            </TouchableOpacity>
          )}
        />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flex: 1, 
    backgroundColor: 'transparent',
  },
  titleContainer: {
    marginTop: 20,
    marginStart: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Bungee',
    color: 'white',
  },
  itemContainer: {
    borderRadius: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    padding: 15,
    marginTop: 8,
    flexDirection: 'row',
  },
  textContainer: {
    flexDirection: 'column', 
    flex: 1,
    justifyContent: 'center'
  },
  itemSong: {
    fontSize: 16,
    fontFamily: 'Rubik',
    color: 'white',
    fontWeight: 'bold',
  },
  itemArtist: {
    fontSize: 16,
    fontFamily: 'Rubik',
    color: 'white',
  },
  itemImage: {
    width: 70, 
    height: 70,
    marginRight: 10,
  }
});