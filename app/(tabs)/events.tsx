import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const imgSource = require('../../assets/images/mlg_logo.png');


export default function Events() {
    const today = new Date();
    const now = new Date();
    const date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`;
    // const time = today.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const event1 = 'MLGCL Intramurals 2025 (Morning)';
    const event2 = 'MLGCL Intramurals 2025 (Afternoon)';

    const time_in = '11:00 AM';
    const time_out = '2:00 PM';

    const [timeInHour, timeInMinute] = time_in.split(':');
    const [inMinute, inPeriod] = timeInMinute.split(' ');

    const [timeOutHour, timeOutMinute] = time_out.split(':');
    const [minute, period] = timeOutMinute.split(' ');

    let inHour = parseInt(timeInHour);
    const inMinuteNum = parseInt(inMinute);

    let hour = parseInt(timeOutHour);
    const minuteNum = parseInt(minute);

    if(inPeriod === 'PM' && inHour !== 12) inHour += 12;
    if(inPeriod == 'AM' && inHour === 12) inHour = 0;

    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    const setTimeInHour = new Date(now);
    setTimeInHour.setHours(inHour);
    setTimeInHour.setMinutes(inMinuteNum);
    setTimeInHour.setSeconds(0);

    const timeInExtension = new Date(setTimeInHour.getTime() + 30 * 60 * 1000);
    const startInScan = new Date(setTimeInHour.getTime() - 30 * 60 * 1000);

    const setTimeOutHour = new Date(now);
    setTimeOutHour.setHours(hour);
    setTimeOutHour.setMinutes(minuteNum);
    setTimeOutHour.setSeconds(0);

    const timeOutExtension = new Date(setTimeOutHour.getTime() + 30 * 60 * 1000);   
    const startOutScan = new Date(setTimeOutHour.getTime() - 30 * 60 * 1000);

    let outDisabled = false;
    let inDisabled = false;
    let inAvailable = false;
    let outAvailable = false;
    
    if(now >= startInScan && now <=  timeInExtension) {
        outDisabled = true;
        inAvailable = true;
    }
    
    if(now >= startOutScan && now <= timeOutExtension) {
        inDisabled = true;
        outAvailable = true;
    }

    if (now < startInScan || now > timeInExtension) {
        inDisabled = true;
        inAvailable = false;
    }

    if (now < startOutScan || now > timeOutExtension) {
        outDisabled = true;
        outAvailable = false;
    }
    

    return (
        <ImageBackground source={require("../../assets/images/school2.png")}
        resizeMode='cover'
        style={{ flex: 1 }}
        imageStyle={{ marginTop: 120 }}
        >
            <LinearGradient
            colors={['rgb(255, 255, 255)',
                'rgba(255, 255, 255, 0.96)',
                'rgba(255,255,255,0)']}
            locations={[0, 0.5, 1]}
            style={{ flex: 1, height: '100%' }}
            >
                <View style={{ padding: 12 }}>
                    <View style={styles.bodyContainer}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 8 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff' }}>DASHBOARD</Text>
                        </View>

                        <ScrollView style={{ flexGrow: 1, borderRadius: 15 }}>
                            <View>
                                <View style={styles.contentContainer}>
                                    <View>
                                        <View>
                                            <View style={styles.dateContainer}>
                                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>MORNING - 8:00 AM</Text>
                                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Date: {date} </Text>
                                            </View>
                                            <View style={{ width: '100%', backgroundColor: '#d5d8dc', marginTop: 3, height: 1 }}></View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10 }}>Event Name:</Text>
                                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: -10 }}>Intramurals 2025</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                                        <View style={styles.buttonContainer}>
                                            <Pressable style={[styles.button, {
                                                backgroundColor: inDisabled ? '#e74c3c' : '#2ecc71',
                                            }]}
                                            disabled={inDisabled}
                                            onPress={() => router.push('../eventScanner')}
                                            >
                                                <Text style={{ fontSize: 12, color: '#fff', fontWeight: '900' }}>TIME IN</Text>
                                            </Pressable>
                                            <View>
                                                <View style={{ backgroundColor: inAvailable ? '#2ecc71' : '#e74c3c', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Status</Text>
                                                    <Text style={styles.statusValue }> {inAvailable ? 'Available' : 'Unavailable'} </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Start Scan</Text>
                                                    <Text style={styles.time}> {startInScan.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'} )} </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Proper Time</Text>
                                                    <Text style={styles.time}> {time_in} </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.buttonContainer}>
                                            <Pressable style={[styles.button, {
                                                backgroundColor: outDisabled ? '#e74c3c' : '#2ecc71',
                                            }]}
                                            disabled={outDisabled}
                                            onPress={() => router.push('../eventScanner')}
                                            >
                                                <Text style={{ fontSize: 12, color: '#fff', fontWeight: '900' }}>TIME OUT</Text>
                                            </Pressable>
                                            <View>
                                                <View style={{ backgroundColor: outAvailable ? '#2ecc71' : '#e74c3c', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Status</Text>
                                                    <Text style={styles.statusValue}> {outAvailable ? 'Available' : 'Unavailable' } </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Start Scan</Text>
                                                    <Text style={styles.time}> {startOutScan.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'} )} </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Proper Time</Text>
                                                    <Text style={styles.time}> {time_out} </Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <Pressable style={styles.recordsBtn}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Attendance Records</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>

                            <View>
                                <View style={styles.contentContainer}>
                                    <View>
                                        <View>
                                            <View style={styles.dateContainer}>
                                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>MORNING - 8:00 AM</Text>
                                                <Text style={{ fontSize: 10, fontWeight: 'bold' }}>Date: {date} </Text>
                                            </View>
                                            <View style={{ width: '100%', backgroundColor: '#d5d8dc', marginTop: 3, height: 1 }}></View>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 10 }}>Event Name:</Text>
                                            <Text style={{ fontSize: 25, fontWeight: 'bold', marginTop: -10 }}>Intramurals 2025</Text>
                                        </View>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', marginTop: 10 }}>
                                        <View style={styles.buttonContainer}>
                                            <Pressable style={[styles.button, {
                                                backgroundColor: inDisabled ? '#e74c3c' : '#2ecc71',
                                            }]}
                                            disabled={inDisabled}
                                            onPress={() => { alert('lol') }}
                                            >
                                                <Text style={{ fontSize: 12, color: '#fff', fontWeight: '900' }}>TIME IN</Text>
                                            </Pressable>
                                            <View>
                                                <View style={{ backgroundColor: inAvailable ? '#2ecc71' : '#e74c3c', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Status</Text>
                                                    <Text style={styles.statusValue }> {inAvailable ? 'Available' : 'Unavailable'} </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Start Scan</Text>
                                                    <Text style={styles.time}> {startInScan.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'} )} </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Proper Time</Text>
                                                    <Text style={styles.time}> {time_in} </Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={styles.buttonContainer}>
                                            <Pressable style={[styles.button, {
                                                backgroundColor: outDisabled ? '#e74c3c' : '#2ecc71',
                                            }]}
                                            disabled={outDisabled}
                                            onPress={() => { alert('pakyu') }}
                                            >
                                                <Text style={{ fontSize: 12, color: '#fff', fontWeight: '900' }}>TIME OUT</Text>
                                            </Pressable>
                                            <View>
                                                <View style={{ backgroundColor: outAvailable ? '#2ecc71' : '#e74c3c', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Status</Text>
                                                    <Text style={styles.statusValue}> {outAvailable ? 'Available' : 'Unavailable' } </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Start Scan</Text>
                                                    <Text style={styles.time}> {startOutScan.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'} )} </Text>
                                                </View>
                                                <View style={{ backgroundColor: '#fff', marginTop: 5, borderRadius: 42, flexDirection: 'row'}}>
                                                    <Text style={styles.status}>Proper Time</Text>
                                                    <Text style={styles.time}> {time_out} </Text>
                                                </View>

                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ width: '100%' }}>
                                        <Pressable style={styles.recordsBtn}>
                                            <Text style={{ fontSize: 12, fontWeight: 'bold', color: '#fff', textAlign: 'center' }}>Attendance Records</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>


                        </ScrollView>


                        <View style={{ width: '100%', alignItems: 'center', marginVertical: 10, }}>
                            <Text style={{ fontSize: 10, color: '#fff', fontWeight: 'bold' }}>----------------------- Today's Event -----------------------</Text>
                        </View>
                    </View>
                </View>
            </LinearGradient>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    bodyContainer: {
        backgroundColor: '#3498db',
        minHeight: 380,
        maxHeight: 440,
        width: '100%',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15
    },

    contentContainer: {
        backgroundColor: '#fff',
        width: '100%',
        height: 'auto',
        borderRadius: 20,
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10
    },

    dateContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },

    buttonContainer: {
        paddingVertical: 8,
        paddingHorizontal: 8,   
        backgroundColor: '#f1f1f1',
        borderRadius: 10
    },

    button: {
        paddingVertical: 10,
        borderRadius: 30,
        width: 125,
        alignItems: 'center'
    },

    status: {
        backgroundColor: '#2c3e50',
        width: 60,
        textAlign: 'center',
        paddingVertical: 3,
        fontWeight: 'bold',
        fontSize: 7,
        color: '#fff',
        borderRadius: 20,
        zIndex: 5
    },

    statusValue: {
        width: 60,
        color: '#fff',
        textAlign: 'center',
        paddingVertical: 2,
        fontWeight: 'bold',
        fontSize: 8,
    },

    time: {
        width: 60,
        textAlign: 'center',
        paddingVertical: 2,
        fontWeight: 'bold',
        fontSize: 8,
    },

    recordsBtn: {
        backgroundColor: '#f4d03f',
        width: '100%',
        borderRadius: 30,
        paddingVertical: 12,
        marginTop: 10
    }

})

