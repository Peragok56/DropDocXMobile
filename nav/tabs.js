import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AllFiles from '../screens/AllFiles';
import RecentFiles from '../screens/RecentFiles';
import Chat from '../screens/Chat';
import Organizations from '../screens/Organizations';
import Profile from '../screens/Profile';
import { View, Image, Platform } from 'react-native';

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return(
        <Tab.Navigator
            tabBarOptions={{
                showLabel: false,
                style: {
                    position: "absolute",
                    bottom: 25,
                    left: 20,
                    right: 20,
                    elevation: 0,
                    backgroundColor: "#F3F3F3",
                    borderRadius: 15,
                    borderWidth: 0,
                    height: 60,
                    // ...styles.shadow
                }
            }}
        >
            <Tab.Screen name='Все файлы' component={AllFiles} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? '50%' : null}}>
                        <Image 
                            source={require('../assets/icons/storage.png')}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? "#336BD8" : '#909090'
                            }}
                        />
                    </View>
                ),}}/>
            <Tab.Screen name='Недавние файлы' component={RecentFiles} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? '50%' : null}}>
                        <Image 
                            source={require('../assets/icons/projects.png')}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? "#336BD8" : '#909090'
                            }}
                        />
                    </View>
                ),}}/>
            <Tab.Screen name='Чаты' component={Chat} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? '50%' : null}}>
                        <Image 
                            source={require('../assets/icons/chats.png')}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? "#336BD8" : '#909090'
                            }}
                        />
                    </View>
                ),}}/>
            <Tab.Screen name='Организации' component={Organizations} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? '50%' : null}}>
                        <Image 
                            source={require('../assets/icons/organization.png')}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? "#336BD8" : '#909090'
                            }}
                        />
                    </View>
                ),}}/>
            <Tab.Screen name='Профиль' component={Profile} options={{
                tabBarIcon: ({focused}) => (
                    <View style={{alignItems: 'center', justifyContent: 'center', top: Platform.OS === 'ios' ? '50%' : null}}>
                        <Image 
                            source={require('../assets/icons/personal.png')}
                            resizeMode='contain'
                            style={{
                                width: 35,
                                height: 35,
                                tintColor: focused ? "#336BD8" : '#909090'
                            }}
                        />
                    </View>
                ),}}/>
        </Tab.Navigator>
    );
} 

export default Tabs