import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from './components/HomeScreen';
import Inscription from './components/Inscription';
import Apropos from './components/apropos';
import LoginScreen from './components/LoginScreen';
import Recherche from './components/Recherche';
import UserProfile from './components/UserProfile';
import LogoutScreen from './components/LogoutScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [userLoggedIn, setUserLoggedIn] = useState({ email: '' });

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Accueil') {
              iconName = focused ? 'ios-home' : 'ios-home-outline';
            } else if (route.name === 'Inscription') {
              iconName = 'ios-person-add';
            } else if (route.name === 'À propos') {
              iconName = 'ios-information-circle';
            } else if (route.name === 'Connexion') {
              iconName = focused ? 'ios-log-in' : 'ios-log-in-outline';
            } else if (route.name === 'Recherche') {
              iconName = 'ios-search';
            } else if (route.name === 'Profil') {
              iconName = 'ios-person';
            } else if (route.name === 'Déconnexion') {
              iconName = focused ? 'ios-log-out' : 'ios-log-out-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        {userLoggedIn.email ? (
          <>
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Recherche" component={Recherche} />
            <Tab.Screen
              name="Profil"
              component={() => <UserProfile email={userLoggedIn.email} />}
            />
            <Tab.Screen
              name="Déconnexion"
              options={{ tabBarBadge: true }}
              component={() => <LogoutScreen setUserLoggedIn={setUserLoggedIn} />}
            />
          </>
        ) : (
          <>
            <Tab.Screen name="Accueil" component={HomeScreen} />
            <Tab.Screen name="Inscription" component={Inscription} />
            <Tab.Screen
              name="Connexion"
              component={() => <LoginScreen setUserLoggedIn={setUserLoggedIn} />}
            />
            <Tab.Screen name="À propos" component={Apropos} />
          </>
        )}
      </Tab.Navigator>
    </NavigationContainer>
  );
}
