import { StyleSheet, View } from 'react-native';

const imgSource = require('../../assets/images/mlg_logo.png');


export default function Record() {
    const today = new Date();
    const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    const time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const time_in = '07:30 AM';
    const time_out = '12:00 PM';
    let isDisabled = false;
    let inDisabled = false;
    
    if(time !== time_out) {
        isDisabled = true;
    }
    
    if(time == time_out) {
        inDisabled = true;
    }
    

    return (
        <View style={{ height: '100%', backgroundColor: '#fff' }}>
            
        </View>
    );
};


const styles = StyleSheet.create({


})

