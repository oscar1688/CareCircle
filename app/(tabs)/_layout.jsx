import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router';

{/* Script for importing and exporting all icon images used. */}
import { icons } from '../../constants';

{/* The bottom navigation bar */}

{/* TabIcon is a react functional component that returns a image representing the icon of the bottom nav bar. */ }
const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center w-16">
            <Image 
                source={icon}
                resizeMode="contain"
                tintColor={color}
                className="w-6 h-6 mb-1"
            />
            <Text 
                className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`}
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{ color: color }}
            >
                {name}
            </Text>
        </View>
    )
}

function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#4C6444',
        tabBarInactiveTintColor: '#8A6240',
        tabBarStyle:{
          backgroundColor: '#CABA9C',
          borderTopWidth: 1,
          borderTopColor: '#CABA9C',
          height: 64,
          paddingTop: 12,
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="calendars"
        options={{
          title: 'Calendars',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.calendars}
              color={color}
              name="Calendars"
              focused={focused}
            />
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon 
              icon={icons.profile}
              color={color}
              name="Profile"
              focused={focused}
            />
          )
        }}
      />
    </Tabs>

  );
}

export default TabsLayout;