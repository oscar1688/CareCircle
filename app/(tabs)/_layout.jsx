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
                // className="w-6 h-5 mb-1"
                style={{width:30, height:30}}
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
        tabBarActiveTintColor: '#471AA0',
        tabBarInactiveTintColor: '#9747FF',
        tabBarStyle:{
          backgroundColor: '#D9D9D9',
          borderTopWidth: 1,
          borderTopColor: '#D9D9D9',
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