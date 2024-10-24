import { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity, Button } from 'react-native';
import { useRouter, useLocalSearchParams } from "expo-router";
import GradientCanvas from './gradientCanvas';
import { useSharedValue } from 'react-native-reanimated';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

export default function PlayScreen() {
  const [leftC, setLeftC] = useState("#833b72");
  const [leftR, setLeftR] = useState("#dbce3b");
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);

  const router = useRouter();
  const { id } = useLocalSearchParams();

  const { width, height } = useWindowDimensions();
  const leftColor = useSharedValue(leftC);
  const rightColor = useSharedValue(leftR);

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    leftColor.value = (leftC);
    rightColor.value = (leftR);
  }, [leftC, leftR]);

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

  async function playSound() {
    console.log('Loading Sound');
    try {
        const { sound: newSound } = await Audio.Sound.createAsync(require('../assets/testSound.mp3'));
        setSound(newSound);
    
        console.log('Playing Sound!!!');
        await newSound.playAsync();
      } catch (error) {
        console.error("Error loading sound: ", error);
    }
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const handlePressPlay = () => {
    playSound();
    // <AntDesign name="pausecircle" size={58} color="white" style={{ marginRight: 10 }} />
  };
  const handlePressSkipBack = () => {

  };
  const handlePressSkipNext = () => {

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
            <TouchableOpacity style={styles.backButton} onPress={() => router.push('/')}>
                <Ionicons name="arrow-back-outline" size={30} color="white" />
            </TouchableOpacity>
            <View style={styles.playerContainer}>
                <Image style={styles.image} 
                    source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/The_Sounds_of_Earth_-_GPN-2000-001976.jpg/260px-The_Sounds_of_Earth_-_GPN-2000-001976.jpg" }}
                />
                <Text style={styles.song}>Song Title</Text>
                <Text style={styles.artist}>Artist Name</Text>
                <View style={styles.icons}>
                    <TouchableOpacity onPress={() => handlePressSkipBack()}>
                        <MaterialIcons name="skip-previous" size={50} color="white" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePressPlay()}>
                        <AntDesign name="play" size={58} color="white" style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handlePressSkipNext()}>
                        <MaterialIcons name="skip-next" size={50} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    flexDirection: 'column',
  },
  backButton: {
    height: 90,
  },
  playerContainer: {
    alignItems: 'center',
    aspectRatio: 1,
  },
  image: {
    width: '99%', 
    height: '99%',
  },
  song: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    paddingTop: 50,
    fontFamily: 'Rubik',
  },
  artist: {
    fontSize: 20,
    color: 'white',
    paddingTop: 8,
    fontFamily: 'Rubik',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
  },
});
