import { StyleSheet, View } from 'react-native';
import QREventScanner from '../components/QREventScanner';


export default function EventScanner() {
    return (
        <View style={styles.container}>
            <QREventScanner />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

