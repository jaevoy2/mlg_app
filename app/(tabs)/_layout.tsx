import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from 'react-native';
import ImgViewer from '../../components/ImageViewer';
import ValidateQR from '../validateQR';
import Events from './events';
import Records from './records';

const Tab = createBottomTabNavigator();
const logo = require("../../assets/images/logo.png");

export default function TabsLayout() {
    return (
        <>
            <StatusBar style="inverted" />
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#3498db',
                    tabBarStyle: {
                        height: 70,
                    },
                }}
                >
                <Tab.Screen
                    name="events"
                    component={Events}
                    options={{
                    tabBarLabel: 'Events',
                    headerStyle: {
                        height: 130
                    },
                    headerTitle: () => (
                        <View style={styles.headerContainer}>
                            <View style={styles.headerRight}>
                                <View style={{ width: 40 }}>
                                    <ImgViewer imgSource={logo} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>MLG COLLEGE OF LEARNING, INC.</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>ATTENDANCE CHECKER</Text>
                                </View>
                            </View>
                            <Pressable style={styles.logout}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 11 }}>Logout</Text>
                            </Pressable>
                        </View>
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ justifyContent: 'center' }}>
                                <Ionicons
                                name={focused ? 'list' : 'list-outline'}
                                size={28}
                                color={color}
                                />
                        </View>
                    ),
                    headerShadowVisible: false
                    }}
                />         


                <Tab.Screen
                    name="validateQr"
                    component={ValidateQR}
                    options={{
                    tabBarLabel: 'Validate QR',
                    headerStyle: {
                        height: 130
                    },
                    headerShadowVisible: false,
                    headerTitle: () => (
                        <View style={styles.headerContainer}>
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
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ justifyContent: 'center' }}>
                            <MaterialCommunityIcons style={{ justifyContent: 'center' }} color={color} name="qrcode-scan" size={25} />
                        </View>
                    ),
                    }}
                />       


                <Tab.Screen
                    name="records"
                    component={Records}
                    options={{
                    tabBarLabel: 'Records',
                    headerStyle: {
                        height: 130
                    },
                    headerShadowVisible: false,
                    headerTitle: () => (
                        <View style={styles.headerContainer}>
                            <View style={styles.headerRight}>
                                <View style={{ width: 40 }}>
                                    <ImgViewer imgSource={logo} />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 9, fontWeight: 'bold' }}>MLG COLLEGE OF LEARNING, INC.</Text>
                                    <Text style={{ fontWeight: 'bold', fontSize: 14 }}>ATTENDANCE CHECKER</Text>
                                </View>
                            </View>
                            <Pressable style={styles.logout}>
                                <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 11 }}>Logout</Text>
                            </Pressable>
                        </View>
                    ),
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ justifyContent: 'center' }}>
                            <Ionicons
                            name={focused ? 'reader' : 'reader-outline'}
                            size={28}
                            color={color}
                            />
                        </View>
                    ),
                    }}
                />



                {/* <Tab.Screen
                    name="setting"
                    component={Setting}
                    options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <View style={{ justifyContent: 'center' }}>
                            <Ionicons
                            name={focused ? 'settings' : 'settings-outline'}
                            size={28}
                            color={color}
                            />
                        </View>
                    ),
                    }}
                /> */}

            </Tab.Navigator>

        </>
    );
}


const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%'
    },

    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8
    },

    logout: {
        paddingHorizontal: 18,
        paddingVertical: 12,
        backgroundColor: '#e74c3c',
        borderRadius: 30,
        alignItems: 'center'
    }

})

