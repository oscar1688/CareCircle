// React Native code for two interactive UI pages: Calendars & Users

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import {User} from '../app/(tabs)/calendars/UserCalendar';
import { UserHeader } from './ScreenElements';
import { Overlay } from 'react-native-elements';
import  FormField  from './FormField';
import {getUserCalendars, getUserEmail, getCalendar, getUserID} from '../config';
import { useGlobalContext } from '../context/GlobalProvider';



export class Calendar{
  constructor(id, name, users){
    this.id = id
    this.name = name
    this.users = users
  }
}



const CalendarListScreen = (props) => {
  
  const email = props.user.email
  // props.user.email
  const [currentUser, setCurrentUser] = useState({});
  const [calendarList, setCalendarList] = useState([]);
  const [createCalendarOverlay, setCreateCalendarOverlay] = useState(false);
  const [calendars, setCalendars] = useState([
    { id: '1', name: 'Work Calendar' },
    { id: '2', name: 'Personal Calendar' },
  ]);

  const [form, setForm] = useState({
      users:[currentUser.id],
      name:'',
      description: '',
  })

  useEffect(()=>{
      try{
        getUserEmail(email).then(user => {
          try{
            const userObj = {id:user._id, email:user.email, username:user.username, password:user.password, currentLocation:user.currentLocation}
            setCurrentUser(userObj)
          }catch(e){
            console.log("Error", e.message)
          }
      })
      }catch(e){
          console.log("Error", e.message)
      }
  },[]) //get from DB

  useEffect(()=>{
    try{
        getUserCalendars(currentUser.email).then(calList =>{
          setCalendarList(calList)
        })
        setForm({
          users:[currentUser.id],
          name:'',
          description: '',
        })
    }catch(e){
        console.log("Error", e.message)
    }
  },[currentUser]) //get from DB

    useEffect(()=>{
      try{
        let tempArray = [];
        calendarList.map(id => {
          getCalendar(id._id).then(cal => {
                const calObj = new Calendar(cal._id, cal.calendarName, cal.users)
                    tempArray.push(calObj);
            }).catch((error) => console.error('Error fetching events:', error))
        })
        setCalendars(prev => tempArray)
      }catch(e){
        console.log('Error', e.message)
      }
    },[calendarList])

    function toggleOverlayCreate(){
      setCreateCalendarOverlay(prev => !prev)
    }

  const navigation = useNavigation()
  const router = useRouter();

  return (
    <>
    <SafeAreaView style={styles.container}>
    <UserHeader calendarName='Calendars' textClassName='top-[0px]'/>
    <View className="justify-center items-center m-5"> 
      {calendarList.length == 0 ? <Text className="text-xl">No Calendars</Text>:<></>} 
    </View>
    <FlatList
        className="mt-10"
        data={calendars}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemRow}
            onPress={() => router.push({pathname:'(tabs)/calendars/Users', params:{ calendarName: item.name, usersList: item.users, id: item.id }, options:{headerShown: false}})}
          >
            <Ionicons name="calendar" size={32} color="black" />
            <Text style={styles.itemText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.actionRow} onPress={toggleOverlayCreate}>
        <Ionicons name="add" size={24} color="purple" />
        <Text style={styles.actionText}>Add Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionRow} onPress={()=>{}}>
        <Ionicons name="create-outline" size={24} color="purple" />
        <Text style={styles.actionText}>Edit Calendar</Text>
      </TouchableOpacity>
      </SafeAreaView>

      <Overlay isVisible={createCalendarOverlay} onBackdropPress={toggleOverlayCreate}>
      <View className={`flex justify-center w-[400px] h-[500px] items-center border-4 bg-gray-200`}>
        <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlayCreate}>
            <Text className="text-purple-900 text-lg m-2">Back</Text>
        </TouchableOpacity>
            <Text className="absolute top-[10] text-lg font-bold text-purple-900">Create Calendar</Text>
        <TouchableOpacity className="absolute top-[0] right-[0]">
                <Text className="text-purple-900 text-lg m-2" onPress={() =>{
                  toggleOverlayCreate()
                  console.log(form, currentUser)
                  setForm({
                    users:[currentUser.id],
                    name:'',
                    description: '',
                  })
                  }}>Save</Text>
        </TouchableOpacity>
        <View className="absolute flex items-center border-0 h-5/6 justify-center w-full bottom-[50]">
          <FormField 
              title = "Calendar Name *"
              value={form.name}
              handleChangeText={n => setForm({...form, name:n})}
              placeholder='Name'
          />
          <FormField //Description
              title = "Description"
              value={form.description}
              handleChangeText={n => setForm({...form, description:n})}
              placeholder='Description'
          />
        </View>
        </View>
      </Overlay>
    </>
  );
};

const UserListScreen = (props) => {

  const navigation = useNavigation()
  const router = useRouter();

  // const { calendarName, usersList, id, calendar } = route.params;
  const calendar = props.calendar
  const array = []

  const [users, setUsers] = useState([
    { id: '1', name: 'Alice', color: 'green' },
    { id: '2', name: 'Bob', color: 'red' },
    { id: '3', name: 'Charlie', color: 'purple' },
  ]);
  const [userList, setUserList] = useState([])

  useEffect(()=>{
    try{
        setUserList(calendar.users)   
    }catch(e){
      console.log('Error',e.message)
    }
  },[])

  useEffect(()=>{
    try{
      let tempArray = [];
      userList.map(email => {
        getUserEmail(email).then(user => {
          const userObj = new User(user._id, user.email, user.username, 'PASSWORD', [], user.currentLocation)
          tempArray.push(userObj);
        }).catch((error) => console.error('Error fetching events:', error))
      })
      setUsers(prev => tempArray)
    }catch(e){
      console.log('Error',e.message)
    }
  },[userList])

  return (
    <>    
    <SafeAreaView style={styles.container}>
    <UserHeader calendarName={calendar.name} textClassName='top-[0px]'/>
    <BackButton/>
      <FlatList
        className="mt-10"
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={()=>router.push({pathname:'(tabs)/calendars/UserCalendar', params:{ userId:item.id }, options:{headerShown: false}})}>
            <View style={styles.itemRow}>
              <Ionicons name="person-circle" size={32} color='purple' />
              <Text style={styles.itemText}>{item.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.actionRow} onPress={() => {}}>
        <Ionicons name="add" size={24} color="purple" />
        <Text style={styles.actionText}>Add User</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionRow}>
        <Ionicons name="create-outline" size={24} color="purple" />
        <Text style={styles.actionText}>Edit User</Text>
      </TouchableOpacity>
    </SafeAreaView>
    </>
  );

  function BackButton(props){
    return(
        <TouchableOpacity onPress={() => router.back('(tabs)/calendars/Calendars')}>
            <View className={`absolute w-[75px] h-[40px] bg-white border-purple-900 border-2 rounded-lg bg-purple-700 items-center justify-center flex-row top-[-50] left-[25]`}>
                <Image className="right-[4]" source={require('../assets/images/prevButton.png')} style={{position:'relative', width:30, height:30}}/>
                <Text className="text-lg text-purple-900 right-[7]">Back</Text>
            </View>
        </TouchableOpacity>    
    )
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 0,
    backgroundColor: '#fff',
    width:'100%',
    height:'100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'purple',
    marginBottom: 16,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    marginLeft: 16,
    fontSize: 18,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'purple',
  },
});

export { CalendarListScreen, UserListScreen };