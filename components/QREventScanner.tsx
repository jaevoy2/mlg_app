import { Ionicons } from '@expo/vector-icons';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { BarcodeScanningResult, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Easing, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImgViewer from '../components/ImageViewer';
const logo = require("../assets/images/logo.png");
// import { fetchStudents } from '../api/studentsApi';
// ActivityIndicator

const { width, height } = Dimensions.get('screen');
const FRAME_SIZE = width * 0.65;

const frameLeft = (width - FRAME_SIZE) / 2;
const frameTop = (height - FRAME_SIZE) / 2;

export default function QRScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [cameraType, setCameraType] = useState<CameraType>('back');

  useEffect(() => {
    const breathe = () => {
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
    };

    breathe();
}, []);

    function toggleCameraType() {
        setCameraType(current => (current === 'back' ? 'front' : 'back'));
    }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
        <SafeAreaView style={styles.permissionContainer}>
            <Text style={styles.permissionText}>
                We need access to your camera to scan QR codes.
            </Text>
            <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
                <Text style={styles.permissionButtonText}>Grant Permission</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
  }


    const handleScan = (result: BarcodeScanningResult) => {
        if (scanned) return;

        const code = result.data;
        const points = result.cornerPoints;

        if (!points || points.length < 4) return;

        // Compute the average position (center) of the QR code
        const centerX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
        const centerY = points.reduce((sum, p) => sum + p.y, 0) / points.length;

        const frameLeft = (width - FRAME_SIZE) / 2;
        const frameRight = frameLeft + FRAME_SIZE;
        const frameTop = (height - FRAME_SIZE) / 2;
        const frameBottom = frameTop + FRAME_SIZE;

        const isInFrame = centerX >= frameLeft &&
                            centerX <= frameRight &&
                            centerY >= frameTop &&
                            centerY <= frameBottom;

        if (isInFrame) {
            setScanned(true);
            playBeep();
            Alert.alert('QR Code Scanned', code, [
            { text: 'Scan Again', onPress: () => setScanned(false) },
            ]);
        }
    };

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
        <CameraView
            style={StyleSheet.absoluteFill}
            facing={cameraType}
            onBarcodeScanned={handleScan}
            barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
        />
        <TouchableOpacity style={{ position: 'absolute', right: 15, top: 130, zIndex: 5 }} onPress={toggleCameraType} >
            <Ionicons name='camera-reverse-outline' size={35} color={cameraType === 'back' ? '#fff' : '#3498db'} />
        </TouchableOpacity>

        {/* Overlay with cutout */}
        <View style={styles.overlay}>
            <View  style={{ position: 'absolute', left: 0, width: '100%', height: 120, backgroundColor: '#fff', zIndex: 5, paddingHorizontal: 8, paddingTop: 20}}>
                <View style={styles.headerRight}>
                    <View style={{ width: 40 }}>
                        <ImgViewer imgSource={logo} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 9, fontWeight: 'bold' }}>MLG COLLEGE OF LEARNING, INC.</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 14 }}>ATTENDANCE CHECKER</Text>
                    </View>
                </View>
            </View>

            <View style={[styles.mask, { top: 0, height: frameTop }]} />
            {/* Bottom */}
            <View style={[styles.mask, { top: frameTop + FRAME_SIZE, height: height - (frameTop + FRAME_SIZE) }]} />
            {/* Left */}
            <View style={[styles.mask, { top: frameTop, height: FRAME_SIZE, left: 0, width: frameLeft }]} />
            {/* Right */}
            <View style={[styles.mask, { top: frameTop, height: FRAME_SIZE, left: frameLeft + FRAME_SIZE, width: frameLeft }]} />

            <Animated.View style={[styles.cutout, { transform: [{ scale: scaleAnim }] }]}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
            </Animated.View>
        </View>

        <Text style={styles.scanLabel}>Align the QR code within the frame to scan.</Text>

        <View style={styles.bottomContainer}>
            <View style={{ width: '95%', backgroundColor: '#fff', minHeight: 70, borderRadius: 10, gap: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
                <View>
                    <Text style={{ fontSize: 10, color: '#000' }}>Last Scan:</Text>
                    <Text>Boyet Dedal BSIT</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 10, color: '#000' }}>Scanned Time:</Text>
                    <Text>10:32 AM</Text>
                </View>
            </View>
            <TouchableOpacity onPress={ () => router.back()} style={styles.backBtn} >
                <Text style={{ fontSize: 15, color: '#fff', fontWeight: 'bold' }}>Go Back</Text>
            </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },
    mask: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.26)',
        width,
    },
    cutout: {
        top: frameTop,
        width: FRAME_SIZE,
        height: FRAME_SIZE,
    },
    bottomContainer: {
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        bottom: 0,
        height: 180,
        paddingVertical: 20,
        width: '100%',
        alignSelf: 'center',
        textAlign: 'center',
    },
    scanLabel: {
        position: 'absolute',
        top: frameTop + height / 3,
        alignSelf: 'center',
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 0
    },
    backBtn: {
        flexDirection: 'row',
        backgroundColor: '#3498db',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 12,
        textAlign: 'center',
        height: 50,
        width: '95%',
        borderRadius: 30,
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