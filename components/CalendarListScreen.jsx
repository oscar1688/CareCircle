// React Native code for two interactive UI pages: Calendars & Users

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Image, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRouter, useLocalSearchParams } from 'expo-router';
import {User} from '../app/(tabs)/calendars/UserCalendar';
import { UserHeader } from './ScreenElements';
import { Overlay } from 'react-native-elements';
import  FormField  from './FormField';
import CustomButton from './CustomButton';
import {getUserCalendars, getUserEmail, getCalendar, getUserID, addCalendar, editCalendar, deleteCalendar} from '../config';
import { useGlobalContext } from '../context/GlobalProvider';
import {Alert} from 'react-native';



export class Calendar{
  constructor(id, name, users){
    this.id = id
    this.name = name
    this.users = users
  }
}


const CalendarListScreen = (props) => {
  
  const {width, height} = useWindowDimensions();


  const email = props.user.email
  // props.user.email
  const [isChanged, setIsChanged] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [calendarList, setCalendarList] = useState([]);
  const [createCalendarOverlay, setCreateCalendarOverlay] = useState(false);
  const [calendars, setCalendars] = useState([
    { id: '1', name: 'Work Calendar' },
    { id: '2', name: 'Personal Calendar' },
  ]);

  const [form, setForm] = useState({
      users:[currentUser.email],
      name:'',
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
          users:[currentUser.email],
          name:'',
        })
    }catch(e){
        console.log("Error", e.message)
    }
  },[isChanged, currentUser]) //get from DB

    // useEffect(()=>{
    //   try{
    //     let tempArray = [];
    //     calendarList.map(id => {
    //       getCalendar(id._id).then(cal => {
    //             const calObj = new Calendar(cal._id, cal.calendarName, cal.users)
    //                 tempArray.push(calObj);
    //         }).catch((error) => console.error('Error fetching events:', error))
    //     })
    //     setCalendars(prev => tempArray)
    //   }catch(e){
    //     console.log('Error', e.message)
    //   }
    //   console.log("Render")
    //   setIsChanged(false)
    // },[calendarList])

    useEffect(() => {
      const fetchCalendars = async () => {
        try {
          const calendarPromises = calendarList.map(id =>
            getCalendar(id._id)
              .then(cal => new Calendar(cal._id, cal.calendarName, cal.users))
              .catch((error) => {
                console.error('Error fetching calendar:', error);
                return null; // Handle or skip errors
              })
          );
    
          const results = await Promise.all(calendarPromises);
          const validCalendars = results.filter(cal => cal !== null);
          setCalendars(validCalendars);
        } catch (e) {
          console.error('Error in fetchCalendars:', e.message);
        } finally {
          setIsChanged(false);
        }
        console.log("Render");
      };
    
      fetchCalendars();
    }, [calendarList]);

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
          <CalendarListObject calendar={item}/>
        )}
      />

      <TouchableOpacity style={styles.actionRow} onPress={toggleOverlayCreate}>
        <Ionicons name="add" size={24} color="purple" />
        <Text style={styles.actionText}>Add Calendar</Text>
      </TouchableOpacity>
      </SafeAreaView>

      <Overlay isVisible={createCalendarOverlay} onBackdropPress={toggleOverlayCreate}>
      <View className={`flex justify-center w-[400px] h-[250px] items-center border-4 bg-gray-200`} style={{width:width*5/6, height:height*1/2, maxWidth:400, maxHeight:300}}>
        <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlayCreate}>
            <Text className="text-purple-900 text-lg m-2">Back</Text>
        </TouchableOpacity>
            <Text className="absolute top-[10] text-lg font-bold text-purple-900">Create Calendar</Text>
        <TouchableOpacity className="absolute top-[0] right-[0]">
                <Text className="text-purple-900 text-lg m-2" onPress={() =>{  
                  try{
                    checkForm(form)
                    addCalendar({
                      calendarName: form.name,
                      users:form.users
                    })
                    setIsChanged(true)
                    toggleOverlayCreate()
                    console.log(form)
                    //TRIGGER CREATION
                    setForm({
                      users:[currentUser.email],
                      name:'',
                      description: '',
                    })
                  }catch(e){
                    console.log("Error", e.message)
                    Alert.alert("Error", e.message)
                  }                   
                  }}>Add</Text>
        </TouchableOpacity>
        <View className="absolute flex items-center border-0 h-5/6 justify-center w-full">
          <FormField 
              title = "Calendar Name *"
              value={form.name}
              otherStyles="w-[300px]"
              handleChangeText={n => setForm({...form, name:n})}
              placeholder='Name'
          />
        </View>
        </View>
      </Overlay>      
    </>
  );

  function CalendarListObject(props){

    const calendar = props.calendar
    const [editCalendarOverlay, setEditCalendarOverlay] = useState(false);


    const [editForm, setEditForm] = useState({
      id:calendar.id,
      users:calendar.users,
      name:calendar.name,
    })

    function toggleOverlayEdit(){
      setEditCalendarOverlay(prev => !prev)
    }

    return(
      
      <>
      <TouchableOpacity
        style={styles.itemRow}
        onPress={() => router.push({pathname:'(tabs)/calendars/Users', params:{ calendarName: calendar.name, usersList: calendar.users, id: calendar.id, currentUserEmail: currentUser.email }, options:{headerShown: false}})}
      >
        <View className="flex-row items-center border-0 w-1/2">
          <Ionicons name="calendar" size={32} color="black" />
          <Text style={styles.itemText}>{calendar.name}</Text>
        </View>            
        <View className="flex-row-reverse items-center border-0 w-1/2">
          <TouchableOpacity onPress={() => {toggleOverlayEdit()}}>
            <Ionicons name="settings" size={32} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <Overlay isVisible={editCalendarOverlay} onBackdropPress={toggleOverlayEdit}>
        <View className={`flex justify-center w-[400px] h-[350px] items-center border-4 bg-gray-200`} style={{width:width*5/6, height:height*1/2, maxWidth:400, maxHeight:350}}>
          <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlayEdit}>
              <Text className="text-purple-900 text-lg m-2">Back</Text>
          </TouchableOpacity>
              <Text className="absolute top-[10] text-lg font-bold text-purple-900">Edit Calendar</Text>
          <TouchableOpacity className="absolute top-[0] right-[0]">
                  <Text className="text-purple-900 text-lg m-2" onPress={() =>{
                    try{
                      console.log(editForm)
                      checkForm(editForm)
                      editCalendar({
                        id:editForm.id,
                        calendarName:editForm.name,
                      })
                      setIsChanged(true)
                      toggleOverlayEdit()
                    }catch(e){
                      console.log("Error", e.message)
                      Alert.alert("Error", e.message)
                    }
                    //TRIGGER UPDATE            
                    }}>Save</Text>
          </TouchableOpacity>
          <View className="absolute flex items-center border-0 justify-center w-full bottom-[50]">
            <FormField 
                title = "Calendar Name *"
                value={editForm.name}
                otherStyles="w-[300]"
                handleChangeText={n => setEditForm({...editForm, name:n})}
                placeholder='Name'
            />
            <CustomButton title="Leave Calendar" textStyles="text-red-500" 
            containerStyles="bg-white border-2 bg-opacity- w-[300] border-purple-900 mt-4" 
            handlePress={async function LeaveCalendarDB(){
              try{
                const temp = calendar.users.filter(item => item != currentUser.email)
                console.log(temp, currentUser.email)
                if(temp.length > 0){
                  editCalendar({
                    id:calendar.id,
                    users:temp,
                  })
                  setIsChanged(true)
                }
                else{
                  deleteCalendar({
                    id:calendar.id
                  })
                  setIsChanged(true)
                }
              }catch(e){
                console.log("Error", e.message)
              }
              
              console.log('Trigger remove')
                // try{
                //     const f = form;
                //     console.log(f.id)
                //     deleteCalendar({ id: f.id }).then(event => console.log(event))
                //     toggleOverlayEdit()
                //     setIsChanged(true);
                // }catch(e){
                //     console.log('Error', e.message)
                // }
            }}/>
            <CustomButton title="Delete Calendar" textStyles="text-red-500" 
            containerStyles="bg-white border-2 bg-opacity- w-[300] border-purple-900 m-4" 
            handlePress={async function deleteCalendarDB(){
              deleteCalendar({
                id:calendar.id
              })
              setIsChanged(true)
              console.log('Trigger delete')
                // try{
                //     const f = form;
                //     console.log(f.id)
                //     deleteCalendar({ id: f.id }).then(event => console.log(event))
                //     toggleOverlayEdit()
                //     setIsChanged(true);
                // }catch(e){
                //     console.log('Error', e.message)
                // }
            }}/>
          </View>          
          </View>
        </Overlay>

      </>
    )
  }

  function checkForm(form){
    try{
      const f = form
      if(f.name == ''){
        throw new Error("Fields with * can not be blank")
      }
    }catch(e){
      console.log(e)
    }
  }

};

const UserListScreen = (props) => {

  const {width, height} = useWindowDimensions();


  const navigation = useNavigation()
  const router = useRouter();

  // const { calendarName, usersList, id, calendar } = route.params;
  const calendar = props.calendar
  const currentUserEmail = props.currentUserEmail
  const [currentUser, setCurrentUser] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [createCalendarOverlay, setCreateCalendarOverlay] = useState(false);
  const [userList, setUserList] = useState([])
  const [form, setForm] = useState({
    newUsers:'',
    currentUsers:[...calendar.users]
  })

  function toggleOverlayCreate(){
      setCreateCalendarOverlay(prev => !prev)
    }

  const [users, setUsers] = useState([
    { id: '1', name: 'Alice', color: 'green' },
    { id: '2', name: 'Bob', color: 'red' },
    { id: '3', name: 'Charlie', color: 'purple' },
  ]);

  useEffect(()=>{
    try{
        // setUserList(calendar.users) 
        getUserEmail(currentUserEmail).then(res => setCurrentUser(res))
    }catch(e){
      console.log('Error',e.message)
    }
    setIsChanged(true)
  },[])

  useEffect(()=>{
    try{
        getCalendar(calendar.id).then(calendar => setUserList(calendar.users))
    }catch(e){
      console.log('Error',e.message)
    }
    setIsChanged(false)
  },[isChanged, currentUser])

  // useEffect(()=>{
  //   try{
  //     let tempArray = [];
  //     userList.map(email => {
  //       getUserEmail(email).then(user => {
  //         const userObj = new User(user._id, user.email, user.username, 'PASSWORD', [], user.currentLocation)
  //         tempArray.push(userObj);
  //       }).catch((error) => console.error('Error fetching events:', error))
  //     })
  //     setUsers(prev => tempArray)
  //   }catch(e){
  //     console.log('Error',e.message)
  //   }
  // },[userList])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userPromises = userList.map(email =>
          getUserEmail(email)
            .then(user => new User(user._id, user.email, user.username, 'PASSWORD', [], user.currentLocation))
            .catch((error) => {
              console.error('Error fetching user:', error);
              return null; // Skip errored users
            })
        );
  
        const results = await Promise.all(userPromises);
        const validUsers = results.filter(user => user !== null);
        setUsers(validUsers);
      } catch (e) {
        console.error('Error in fetchUsers:', e.message);
      }
    };
  
    fetchUsers();
  }, [userList]);

  return (
    <>    
    <SafeAreaView style={styles.container}>
    <UserHeader calendarName={calendar.name} textClassName='top-[0px]'/>
    <BackButton/>
      <FlatList
        className="mt-10"
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) =>           
          <UserListObject user={item}/>
        }
      />
      <TouchableOpacity style={styles.actionRow} onPress={() => {toggleOverlayCreate()}}>
        <Ionicons name="add" size={24} color="purple" />
        <Text style={styles.actionText}>Add User</Text>
      </TouchableOpacity>     

    </SafeAreaView>

    <Overlay isVisible={createCalendarOverlay} onBackdropPress={toggleOverlayCreate}>
      <View className={`flex justify-center w-[400px] h-[300px] items-center border-4 bg-gray-200`} style={{width:width*5/6, height:height*1/2, maxWidth:400, maxHeight:300}}>
        <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlayCreate}>
            <Text className="text-purple-900 text-lg m-2">Back</Text>
        </TouchableOpacity>
            <Text className="absolute top-[10] text-lg font-bold text-purple-900">Add User</Text>
        <TouchableOpacity className="absolute top-[0] right-[0]">
                <Text
                  className="text-purple-900 text-lg m-2"
                  onPress={async () => {
                    let existError = false;
                    let addError = false;
                    let tempArray = form.newUsers.split(",");
                    tempArray = [...new Set(tempArray)];

                    try {
                      const sub = await getCalendar(calendar.id);
                      const emailResults = await Promise.all(
                        tempArray.map(async (item) => {
                          const user = await getUserEmail(item);
                          if (user) {
                            if (!sub.users.includes(user.email)) {
                              return user.email;
                            } else {
                              addError = true;
                              return null;
                            }
                          } else {
                            existError = true;
                            return null;
                          }
                        })
                      );

                      const filteredArray = emailResults.filter((email) => email != null);

                      if (filteredArray.length > 0) {
                        await editCalendar({
                          id: sub._id,
                          users: [...sub.users, ...filteredArray],
                        });

                        // ✅ Immediately re-fetch and update userList
                        const updated = await getCalendar(sub._id);
                        setUserList(updated.users);

                        setForm({
                          newUsers: '',
                          currentUsers: [...updated.users],
                        });

                        setIsChanged(true);
                      }

                      if (existError && addError) {
                        throw new Error("Some users don't exist and others are already in the calendar");
                      } else if (existError) {
                        throw new Error("Some users don't exist");
                      } else if (addError) {
                        throw new Error("Some users are already in the calendar");
                      }

                      toggleOverlayCreate(); // Close overlay after success
                    } catch (e) {
                      console.log("Error", e.message);
                      Alert.alert("Error", e.message);
                    }
                  }}
                >
                  Add
                </Text>
        </TouchableOpacity>
        <View className="absolute flex items-center border-0 h-5/6 justify-center w-full">
          <Text className="text-base text-red-500 font-pmedium ">Seperate emails by comma " , "</Text>
          <Text className="text-base text-red-500 font-pmedium ">No spaces</Text>
          <FormField 
              title = "User Email"
              value={form.newUsers}
              otherStyles="w-[300px]"
              handleChangeText={n => setForm({...form, newUsers:n})}
              placeholder='Email(s)'
          />
        </View>
        </View>
      </Overlay>
    </>
  );

  

  function BackButton() {
    return (
      <View
        pointerEvents="box-none"
        style={{ position: 'absolute', top: 50, left: 25, zIndex: 50 }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          onPressIn={() => console.log("Back button pressed")}
          activeOpacity={0.8}
          className="flex-row items-center bg-white border-2 border-purple-900 rounded-lg px-3 py-1"
        >
          <Image
            source={require('../assets/images/prevButton.png')}
            style={{ width: 30, height: 30 }}
            className="mr-2"
          />
          <Text className="text-lg text-purple-900">Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function UserListObject(props){

    const user = props.user

    const [editCalendarOverlay, setEditCalendarOverlay] = useState(false);

    function toggleOverlayEdit(){
      setEditCalendarOverlay(prev => !prev)
    }

    return(
      <>
        <TouchableOpacity onPress={()=>router.push({pathname:'(tabs)/calendars/UserCalendar', params:{ userId:user.id }, options:{headerShown: false}})}>
          <View style={styles.itemRow}>
            <View className="flex-row items-center border-0 w-1/2">            
              <Ionicons name="person-circle" size={32} color='purple' />
              <Text style={styles.itemText}>{user.username}</Text>
            </View>            
            <View className="flex-row-reverse items-center border-0 w-1/2">
              <TouchableOpacity onPress={() => {toggleOverlayEdit()}}>
                <Ionicons name="settings" size={32} color="black" />
              </TouchableOpacity>
            </View>
          </View>        
        </TouchableOpacity>

        <Overlay isVisible={editCalendarOverlay} onBackdropPress={toggleOverlayEdit}>
        <View className={`flex justify-center w-[400px] h-[300px] items-center border-4 bg-gray-200`} style={{width:width*5/6, height:height*1/2, maxWidth:400, maxHeight:300}}>
          <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlayEdit}>
              <Text className="text-purple-900 text-lg m-2">Back</Text>
          </TouchableOpacity>
              <Text className="absolute top-[10] text-lg font-bold text-purple-900">Manage User</Text>
          <View className="absolute flex items-center border-0 h-5/6 justify-center w-full">
            <Text className="text-2xl font-bold mx-4 text-black">{user.username}</Text>   
            <Text className="text-xl mx-4 text-black">{user.email}</Text>      
            {user.email == currentUser.email ? <></> :
            <CustomButton title="Remove User" textStyles="text-red-500" 
              containerStyles="bg-white border-2 bg-opacity- w-[300] border-purple-900 m-4" 
              handlePress={async function RemoveUserDB(){
                try{
                  // const temp = calendar.users.filter(item => item != user.email)
                  
                  const subCal = await getCalendar(calendar.id)

                  const temp = subCal.users.filter(item => item != user.email)

                  console.log(subCal, temp)

                  if(temp.length > 0){
                    editCalendar({
                      id:calendar.id,
                      users:temp,
                    })
                    setIsChanged(true)
                  }
                  else{
                    throw new Error("Can not remove last user, please delete calendar instead")                                 
                  }
                }catch(e){
                  console.log("Error", e.message)
                  Alert.alert("Error", e.message)
                }
              }}/>
            }
          </View>          
          </View>
        </Overlay>
      </>
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