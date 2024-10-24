import { TouchableOpacity, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Canvas, LinearGradient, Rect, vec } from '@shopify/react-native-skia';
import { useDerivedValue, withTiming } from 'react-native-reanimated';
import { getRandomColor } from '../constants/utils';

interface GradientCanvasProps {
    width: number;
    height: number;
    leftColor: any; 
    rightColor: any;
}
  
const GradientCanvas: React.FC<GradientCanvasProps> = ({ width, height, leftColor, rightColor }) => {
    const colors = useDerivedValue(() => {
        return [leftColor.value, rightColor.value];
    }, [leftColor, rightColor]);  

    return (
        <>
        <Canvas style={styles.canvas}>
            <Rect x={0} y={0} width={width} height={height}>
            <LinearGradient start={vec(0, 0)} end={vec(width, height)} colors={colors} />
            </Rect>
        </Canvas>
        </>
    );
};

const styles = StyleSheet.create({
  canvas: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  testButton: {
    position: 'absolute',
    bottom: 45,
    right: 35,
    height: 50,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    borderRadius: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
  },
});

export default GradientCanvas;
