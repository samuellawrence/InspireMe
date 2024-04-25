import React from 'react';
import SettingsScreen from './screens/SettingsScreen';
import HomeScreen from "./screens/HomeScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {SettingsProvider} from "./context/SettingsContext";

const App = () => {

    const Stack = createNativeStackNavigator();

    return (
        <SettingsProvider>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Home" options={{headerShown: false}} component={HomeScreen}/>
                    <Stack.Screen name="Settings" component={SettingsScreen}/>
                </Stack.Navigator>
            </NavigationContainer>
        </SettingsProvider>
    );
};

export default App;
