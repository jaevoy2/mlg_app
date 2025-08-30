import { Ionicons } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Easing, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ParseQrUrl from '../components/ParseQrUrl';


const { width, height } = Dimensions.get('screen');
const FRAME_SIZE = width * 0.65;
const HEADER_HEIGHT = 80;

const frameLeft = (width - FRAME_SIZE) / 2;
const usableHeight = height - HEADER_HEIGHT;
const frameTop = (usableHeight - FRAME_SIZE) / 4;


export default function QRvalidator() {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const [cameraType, setCameraType] = useState<CameraType>('back');


    useEffect(() => {
        const breathe = ()  => {
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.04,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.inOut(Easing.ease),
                    useNativeDriver: true,
                }),
            ]).start(breathe);
        }

        breathe();
    }, []);

    useFocusEffect(
        useCallback(() => {
            setIsActive(true);
            setScanned(false);
            setCameraType('back')

            return () => {
                setIsActive(false);
            };
        }, [])
    );

    if(!permission) {
        return <View />;
    }

    if(!permission.granted) {
        return (
        <SafeAreaView style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
                We access to your camera to scan QR codes.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
        </SafeAreaView>
        )
    };

    const handleScan = (result: BarcodeScanningResult) => {
        if(!isActive || scanned) return;
        if (scanned) return;
    
        const code = result.data;
        const points = result.cornerPoints;
    
        if(!points || points.length < 4) return;
        
        const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
        const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

        const frameRight = frameLeft + FRAME_SIZE;
        const frameButtom = frameTop + FRAME_SIZE;

        const isInFrame = centerX >= frameLeft &&
                          centerX <= frameRight &&
                          centerY >= frameTop &&
                          centerY <= frameButtom;

        if (isInFrame) {
            setScanned(true);
            playBeep();
            const parse = ParseQrUrl(code);
            Alert.alert('QR Code Scanned', `${parse.id}`, [
                {text: 'Scan Again', onPress: () => setScanned(false)}, //set scanner back
            ])
        }
    } 

    function toggleCameraType() {
        setCameraType(current => (current === 'back' ? 'front' : 'back'));
    }

    async function playBeep() {
        try {
            const { sound } = await Audio.Sound.createAsync(
                require('../assets/sounds/beep.mp3')
            );
            await sound.playAsync();
            sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
                if('islaod' in status && status.isLoaded && !status.isPlaying) {
                    sound.unloadAsync();
                }
            });
        }catch(error){
            Alert.alert('Error', 'Error playing beep.')
        }
    }

     return (
    <View style={styles.container}>
        {isActive ? (
            <>
            <CameraView
              style={StyleSheet.absoluteFill}
              facing={cameraType}
              onBarcodeScanned={handleScan}
              barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
            />
      
              <View style={styles.overlay}>
                  <View style={[styles.mask, { top: 0, height: frameTop }]} />
                  <View style={[styles.mask, { top: frameTop + FRAME_SIZE, height: height - (frameTop + FRAME_SIZE) }]} />
                  <View style={[styles.mask, { top: frameTop, height: FRAME_SIZE, left: 0, width: frameLeft }]} />
                  <View style={[styles.mask, { top: frameTop, height: FRAME_SIZE, left: frameLeft + FRAME_SIZE, width: frameLeft }]} />
      
                  <Animated.View style={[styles.cutout, { transform: [{ scale: scaleAnim }] }]}>
                  <View style={[styles.corner, styles.topLeft]} />
                  <View style={[styles.corner, styles.topRight]} />
                  <View style={[styles.corner, styles.bottomLeft]} />
                  <View style={[styles.corner, styles.bottomRight]} />
                  </Animated.View>
              </View>
      
            <Text style={styles.scanLabel}>Align the QR code within the frame to validate.</Text>
            
            <TouchableOpacity style={{ position: 'absolute', right: 15, top: 15 }} onPress={toggleCameraType} >
                <Ionicons name='camera-reverse-outline' size={35} color={cameraType === 'back' ? '#fff' : '#3498db'} />
            </TouchableOpacity>
            </>
        ): null}
    </View>
  );

}




const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
    },
    mask: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.32)',
        width,
    },
    cutout: {
        top: frameTop,
        width: FRAME_SIZE,
        height: FRAME_SIZE,
    },
    scanLabel: {
        position: 'absolute',
        top: frameTop + height / 3,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 30
    },
    flipButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: '#222',
        padding: 12,
        borderRadius: 30,
    },
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111',
        padding: 20,
    },
    permissionText: {
        color: '#ccc',
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    permissionButton: {
        backgroundColor: '#3498db',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 8,
    },
    permissionButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },

    corner: {
        position: 'absolute',
        width: 50,
        height: 50,
        borderColor: '#3498db',
    },

    topLeft: {
        top: 0,
        left: 0,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderRadius: 4,
    },

    topRight: {
        top: 0,
        right: 0,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderRadius: 4,
    },

    bottomLeft: {
        bottom: 0,
        left: 0,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderRadius: 4,
    },

    bottomRight: {
        bottom: 0,
        right: 0,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderRadius: 4,
    },
});
