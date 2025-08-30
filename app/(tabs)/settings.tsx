import { StyleSheet, View } from 'react-native';
import ImgViewer from '../../components/ImageViewer';

const imgSource = require('../../assets/images/mlg_logo.png');


export default function Setting({ accentColor = '#3498db', logo = imgSource }) {

    return (
        <View style={{ height: '100%', backgroundColor: '#f1f1f1' }}>
            <View style={{ backgroundColor: accentColor, paddingTop: 40, height: '20%', borderBottomLeftRadius: 40, borderBottomRightRadius: 40 }}>
                <View style={styles.logo}>
                    { logo && <ImgViewer imgSource={logo }/>}
                </View>
            </View>

            <View style={{ paddingHorizontal: 15, paddingTop: 25 }}>
                <View style={styles.body}>
                    <View>

                    </View>
                </View>
            </View>

        </View>
    );
};


const styles = StyleSheet.create({
    logo: {
        width: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
    },

    body: {
        backgroundColor: '#fff',
        width: '100%',
        height: '85%',
        borderRadius: 10
    }

})

