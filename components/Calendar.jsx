import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, useWindowDimensions, ScrollView, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Link, router} from 'expo-router';
import {UserHeader, UsersFooter, HomeBody, UserIcon, UserInformation, TimeSheet} from './ScreenElements';
import { Overlay } from 'react-native-elements';
import FormField from './FormField';
import CustomButton from './CustomButton';
import {User} from '../app/(tabs)/home';
import {getUserEvents, addEvent, editEvent, deleteEvent} from '../config';


const Calendar = (props) => {

    const today = new Date()
    const [day, setDay] = useState(today)
    const [active, setActive] = useState(today)

    const [isChanged, setIsChanged] = useState(false)

    const {width, height} = useWindowDimensions();
        const addHeight = height - 450

    return(
        <>        
        <View className="flex bg-white">
            <View className='flex-none items-center max-h-auto bg-white'>                    
                <UserHeader calendarName = {`${props.user.username}'s Calendar`}/> 
                <View className="relative flex flex-row w-full h-[60] border-0 items-center justify-evenly bg-opacity-100 bg-gray-200">
                    <BackButton/>
                    <TouchableOpacity onPress={decreaseWeek}>
                        <View className = "flex-row w-[60px] h-[30px] justify-center items-center">
                            <Image source={require('../assets/images/prevButton.png')} style={{position:'relative', width:30, height:30}}/>
                            <Text className="text-purple-900 text-lg">Prev</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={increaseWeek}>
                        <View className = "flex-row w-[60px] h-[30px] justify-center items-center">
                            <Text className="text-purple-900 text-lg">Next</Text>
                            <Image source={require('../assets/images/nextButton.png')} style={{position:'relative', width:30, height:30}}/>
                        </View>
                    </TouchableOpacity>
                    <ResetDayButton/>
                    {props.isUser ? <AddEvent/>:<></>}
                </View>                
                <View className="relative flex shadow-2xl flex-row w-full h-[125] border-0 left-[0] top-[0] items-center justify-center bg-opacity-100 bg-gray-300" styles={{borderColor:'black'}}>
                    <DayHeader/>  
                </View>                               
                <ScrollView className='w-full ' style={{height:height-335}}>   
                    <View className='w-full overflow-hidden' style={{height:3165}}> 
                        <HomeBody/>      
                        <EventLayout user={props.user}/>
                        <CurrentTimeLine/>
                    </View>
                </ScrollView>                             
            </View>            
       </View>
       </>
    )

    function EventLayout(props){        
        const [events, setEvents] = useState([])       
        const [activeEvents, setActiveEvents] = useState([])
    
        useEffect(()=>{
            try{
                setActiveEvents(events.filter(event => event.start[2] == active.getDate() && event.start[0] == active.getFullYear() &&(event.start[1]-1) == active.getMonth()))
            }catch(e){
                console.error('Error', e.message)

            }
        },[active, events])

        useEffect(() => {
            try{
                getUserEvents(props.user).then(events => {
                try{
                        const formattedEvents = events.map((event) => ({
                            id: event._id,
                            email: event.email,
                            title: event.eventName,
                            start: event.startTime, // e.g. "2025-03-19 03:00"
                            end: event.endTime,     // e.g. "2025-03-19 05:00"
                            description: event.description,
                            location: event.location,
                        }))
                    setEvents(formattedEvents);
                }catch(e){
                    console.error('Error', e.message)

                }
            });
                setIsChanged(false);
            }catch(e){
                console.error('Error', e.message)
            }
        }, [isChanged])          

        //props ARRAY
        return(
            <>
                <View className='absolute flex-row border-0 w-4/5 h-full right-0 mx-2'>          
                    <View className='border-0 border-blue-500 w-1/2 h-full right-0 '> 
                    {   
                        activeEvents.map((event) => {
                            return <Event key={event.id} event={event} duration={(event.end[3] - event.start[3]) + ((event.end[4] - event.start[4])/60)} 
                                    startTime={(event.start[3]+(event.start[4]/60))}/> ;
                        })
                    }                 
                    </View>
                    <View className='border-0 border-blue-500 w-[5px] h-full right-0'>
                        
                    </View>
                    <View className='border-0 border-red-500 w-1/2 h-full right-0 '>

                    </View>     
                </View>
            </>
        )
    }

    function ResetDayButton(){
        return(
            <TouchableOpacity onPress={() => {setDay(today), setActive(today)}}>
                <View className="w-[75px] h-[40px] bg-white border-purple-900 border-2 rounded-lg bg-purple-700 items-center justify-center">
                    <Text className="text-lg text-purple-900">Today</Text>
                </View>
            </TouchableOpacity>    
        )
    }

    function BackButton(){
        return(
            <TouchableOpacity onPress={() => router.back()}>
                <View className="w-[75px] h-[40px] bg-white border-purple-900 border-2 rounded-lg bg-purple-700 items-center justify-center flex-row">
                    <Image className="right-[4]" source={require('../assets/images/prevButton.png')} style={{position:'relative', width:30, height:30}}/>
                    <Text className="text-lg text-purple-900 right-[7]">Back</Text>
                </View>
            </TouchableOpacity>    
        )
    }

    function AddEvent(props){
    
        const {width, height} = useWindowDimensions();
    
        const [visible, setVisible] = useState(false);
    
        const id = '121221'
        const email = 'oli03@nyit.edu'
    
        const toggleOverlay = () => {
            setVisible(!visible);
        }
        
        const [form, setForm] = useState({
            id: id,
            email: email,
            name:'',
            startY: '',
            startM: '',
            startD: '',
            startH: '',
            startm: '',
            endY: '',
            endM: '',
            endD: '',
            endH: '',
            endm: '',
            location: '',
            description: '',
        })
    
        return(
            <>
                <TouchableOpacity className={props.className+` flex-row`} onPress={toggleOverlay}>
                    <Image source={require('../assets/images/addButton.png')} style={{position:'relative', width:30, height:30}}/>              
                </TouchableOpacity> 
    
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View className={`flex justify-center w-[400px] h-[500px] items-center border-4 bg-gray-200`}>
                        <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlay}>
                            <Text className="text-purple-900 text-lg m-2">Back</Text>
                        </TouchableOpacity>
                            <Text className="absolute top-[10] text-lg font-bold text-purple-900">Create Event</Text>
                        <TouchableOpacity className="absolute top-[0] right-[0]">
                                <Text className="text-purple-900 text-lg m-2" onPress={async function addEventToDB(){
                                const f = form;    
                                try{
                                    //CHECKS
                                    checkForm(f)
    
                                    let start = [parseInt(f.startY, 10), parseInt(f.startM, 10), parseInt(f.startD, 10), parseInt(f.startH, 10), parseInt(f.startm, 10)];
                                    let end = [parseInt(f.startY, 10), parseInt(f.startM, 10), parseInt(f.startD, 10), parseInt(f.endH, 10), parseInt(f.endm, 10)]; //end DATE must be same as start DATE
                                    console.log(start,end, f.endY, f.endM, f.endD)

                                    console.log('Starting post operation')

                                    addEvent({ 
                                                email:f.email, eventName:f.name, startTime:start,
                                                endTime:end, description:f.description, location:f.location
                                            })
                                            
                                    toggleOverlay();
                                    
                                    setForm(prev => ({
                                        ...prev,
                                        name:'',
                                        startY: '',
                                        startM: '',
                                        startD: '',
                                        startH: '',
                                        startm: '',
                                        endY: '',
                                        endM: '',
                                        endD: '',
                                        endH: '',
                                        endm: '',
                                        endTime: '',
                                        location: '',
                                        description: '',
                                    }))
                                    setIsChanged(true)
                                }catch(error){
                                    console.log('Error', error.message)
                                    Alert.alert('Error', error.message)
                                }
                                }}>Save</Text>
                        </TouchableOpacity>
                        <View className="absolute flex border-0 h-5/6 justify-center w-5/6 bottom-[30]">
                            <FormField 
                                title = "EventName *"
                                value={form.name}
                                handleChangeText={n => setForm({...form, name:n})}
                                placeholder='Name'
                            />
                            <View className="flex-row">
                                <FormField //dropDown
                                    title = "Date *"
                                    value={form.startY}
                                    handleChangeText={n => setForm({...form, startY:n})}
                                    placeholder='YYYY'
                                    otherStyles ="w-[80px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.startM}
                                    handleChangeText={n => setForm({...form, startM:n})}
                                    placeholder='MM'
                                    otherStyles ="w-[70px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.startD}
                                    handleChangeText={n => setForm({...form, startD:n})}
                                    placeholder='DD'
                                    otherStyles ="w-[70px] mx-1"
                                />                                
                            </View>
                            {/* Time */}
                            <View className="flex-row justify-between items-start">
                                {/* Start Time Group */}
                                <View className="flex-col items-start">
                                    <Text className="text-base font-medium text-gray-700 mb-0.5 ml-1">Start Time *</Text>
                                    <View className="flex-row">
                                        <FormField
                                            value={form.startH}
                                            handleChangeText={n => setForm({ ...form, startH: n })}
                                            placeholder="HH"
                                            otherStyles="w-[70px] mx-1"
                                        />
                                        <FormField
                                            value={form.startm}
                                            handleChangeText={n => setForm({ ...form, startm: n })}
                                            placeholder="mm"
                                            otherStyles="w-[70px] mx-1"
                                        />
                                    </View>
                                </View>

                                {/* End Time Group */}
                                <View className="flex-col items-start">
                                    <Text className="text-base font-medium text-gray-700 mb-0.5 ml-1">End Time *</Text>
                                    <View className="flex-row">
                                        <FormField
                                            value={form.endH}
                                            handleChangeText={n => setForm({ ...form, endH: n })}
                                            placeholder="HH"
                                            otherStyles="w-[70px] mx-1"
                                        />
                                        <FormField
                                            value={form.endm}
                                            handleChangeText={n => setForm({ ...form, endm: n })}
                                            placeholder="mm"
                                            otherStyles="w-[70px] mx-1"
                                        />
                                    </View>
                                </View>
                            </View>
                            <FormField //Location
                                title = "Location"
                                value={form.location}
                                handleChangeText={n => setForm({...form, location:n})}
                                placeholder='Location'
    
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
        )
    
    }

    function decreaseWeek(){
        setDay(prev => {
            var dayTemp = new Date(prev)
            dayTemp.setDate(prev.getDate()-7)
            return dayTemp
        })
    } 
    
    function increaseWeek(){
        setDay(prev => {
            var dayTemp = new Date(prev)
            dayTemp.setDate(prev.getDate()+7)
            return dayTemp
        })
    } 

    function DayHeader(props){        
    
        return(
            <View className="flex flex-row justify-evenly w-full border-0">
                <DayComponentHead TodayDay={today.getDay()} TodayNumber={today.getDate()}/>
            </View>
        )
        
        function DayComponentHead(props){
            const name = props.TodayDay
            // const number = props.TodayNumber
    
            var dayM2 = new Date(day)
            var dayM1 = new Date(day)
            var dayP1 = new Date(day)
            var dayP2 = new Date(day)
            var dayP3 = new Date(day)
            var dayP4 = new Date(day)
            dayM2.setDate(day.getDate()-2)
            dayM1.setDate(day.getDate()-1)
            dayP1.setDate(day.getDate()+1)
            dayP2.setDate(day.getDate()+2)
            dayP3.setDate(day.getDate()+3)
            dayP4.setDate(day.getDate()+4)
    
            const number = 2; 

            return(     
                <> 
                    <DayComponent thisDay = {dayM2} dayName="Sun" dayNumber={number-2} isSelected={active}/>  
                    <DayComponent thisDay = {dayM1} dayName="Mon" dayNumber={number-1} isSelected={active} />  
                    <DayComponent thisDay = {day} dayName={name} dayNumber={number}  isSelected={active} />  
                    <DayComponent thisDay = {dayP1} dayName="Wed" dayNumber={number+1} isSelected={active} />  
                    <DayComponent thisDay = {dayP2} dayName="Thu" dayNumber={number+2} isSelected={active} />  
                    <DayComponent thisDay = {dayP3} dayName="Fri" dayNumber={number+3} isSelected={active} />  
                    <DayComponent thisDay = {dayP4} dayName="Sat" dayNumber={number+4} isSelected={active} />                      
                </>
            )
    
    
            function DayComponent(props){
                
                const [isSelected, setIsSelected] = useState(
                    props.isSelected.getDate() == props.thisDay.getDate() && 
                    props.isSelected.getMonth() == props.thisDay.getMonth() && 
                    props.isSelected.getFullYear() == props.thisDay.getFullYear() )
    
                let td = props.thisDay
    
                let isToday = false
                isToday = (td.getDate() == today.getDate() && td.getMonth() == today.getMonth() && td.getFullYear() == today.getFullYear()) 
    
                function handlePress(){
                    setActive(td)
                }
    
                // useEffect(() =>{
                // },[active, isSelected, day])
                
                //RENDER EVENTS HERE PER DATE

                let m = null
                let d = null

                switch(td.getMonth()){
                    case 0: m = 'Jan' 
                        break;
                    case 1: m = 'Feb'
                        break;
                    case 2: m = 'Mar'
                        break;
                    case 3: m = 'Apr'
                        break;
                    case 4: m = 'May'
                        break;
                    case 5: m = 'Jun'
                        break;
                    case 6: m = 'Jul'
                        break;
                    case 7: m = 'Aug'
                        break;
                    case 8: m = 'Sep'
                        break;
                    case 9: m = 'Oct'
                        break;
                    case 10: m = 'Nov'
                        break;
                    case 11: m = 'Dec'                    
                        break;
                }

                switch(td.getDay()){
                    case 0: d = 'Sun' 
                        break;
                    case 1: d = 'Mon'
                        break;
                    case 2: d = 'Tue'
                        break;
                    case 3: d = 'Wed'
                        break;
                    case 4: d = 'Thu'
                        break;
                    case 5: d = 'Fri'
                        break;
                    case 6: d = 'Sat'
                        break;                    
                }

                    return(
                        
                        <TouchableOpacity
                                    onPress={handlePress}
                                    activeOpacity={0.7}
                                    >
                                
                            <View className="flex flex-col justify-center items-center h-[75px] w-[50-px] border-0">
                                <Text className="text-sm">{m}</Text>
                                <Text className="text-sm">{td.getFullYear()}</Text>
                                <Text className="text-lg">{d}</Text>
                                <View className={`h-[30px] w-[30px] m-1 rounded-md justify-center items-center ${isToday ? `bg-purple-400`:``} ${isSelected ? `border-2 border-purple-900`:``}`}>
                                    <Text className={`text-lg ${isToday ? `text-white`:`text-purple-900`}`}>{td.getDate()}</Text>
                                </View>
                            </View>
    
                        </TouchableOpacity>
                    )        
            }
        }
    }

    function convertTimeArraytoString(array1, array2){
        let s = array1
        let e = array2
        let sm = null;
        let em = null;
        let string = '';
        let amString = 'am'
    
        function returnMonth(a){
            let m = null;
                switch(a[1] - 1){
                case 0: m = 'Jan' 
                    break;
                case 1: m = 'Feb'
                    break;
                case 2: m = 'Mar'
                    break;
                case 3: m = 'Apr'
                    break;
                case 4: m = 'May'
                    break;
                case 5: m = 'Jun'
                    break;
                case 6: m = 'Jul'
                    break;
                case 7: m = 'Aug'
                    break;
                case 8: m = 'Sep'
                    break;
                case 9: m = 'Oct'
                    break;
                case 10: m = 'Nov'
                    break;
                case 11: m = 'Dec'                    
                    break;
            }
            return m;
        }
        
        sm = returnMonth(s)
        em = returnMonth(e)
    
        if(s[3] > 11){
            if(s[3] > 12){
                string = s[0]+'-'+sm+'-'+s[2]+' '+(s[3]-12)+':';
            }else{
                string = s[0]+'-'+sm+'-'+s[2]+' '+(s[3])+':';
            }
            amString = 'pm'
    
        }else{
            string = s[0]+'-'+sm+'-'+s[2]+' '+s[3]+':';
        }
        
        if(s[4] <=9 && s[4] >= 0){
            string += "0"+s[4]+" "+amString
        }
        else{
            string += s[4]+" "+amString
        }
    
        amString = 'am'
    
    
        if(e[3] > 11){
            if(e[3] > 12){
                string += " -- "+e[0]+'-'+em+'-'+e[2]+' '+(e[3]-12)+':';
            }else{
                string += " -- "+e[0]+'-'+em+'-'+e[2]+' '+(e[3])+':';
            }
            amString = 'pm'
    
        }else{
            string += " -- "+e[0]+'-'+em+'-'+e[2]+' '+e[3]+':';
        }
    
        if(e[4] <=9 && e[4] >= 0){
            string += "0"+e[4]+" "+amString
        }
        else{
            string += e[4]+" "+amString
        }
    
        return string
    }
    
    function Event(props){
    
        const event = props.event
    
        const [visible, setVisible] = useState(false);
        const [visibleEdit, setVisibleEdit] = useState(false);
    
        const toggleOverlay = () => {
            setVisible(!visible);
        }
    
        const toggleOverlayEdit = () => {
            setVisibleEdit(!visibleEdit);
        }
    
        let compHeight = 124.75
    
        if(Platform.OS == 'ios' || Platform.OS == 'android'){
            compHeight = 124.75
        }
        else{
            compHeight = 128
        }
    
        const [form, setForm] = useState({})
    
        useEffect(()=>{
            setForm(prev => ({
                ...prev,
                id: event.id,
                email: event.email,
                name: event.title,
                startY: event.start[0]+'',
                startM: event.start[1]+'',
                startD: event.start[2]+'',
                startH: event.start[3]+'',
                startm: event.start[4]+'',
                endY: event.end[0]+'',
                endM: event.end[1]+'',
                endD: event.end[2]+'',
                endH: event.end[3]+'',
                endm: event.end[4]+'',
                location: event.location,
                description: event.description,
            }))
        },[visibleEdit])
    
        let isUser = props.isUser
    
        return(
            <>
                <TouchableOpacity onPress={toggleOverlay}>
                    <View className={`absolute w-full mr-1 rounded-md opacity-90 border-4 border-purple-900 overflow-hidden ${isUser ? 'bg-purple-800':'bg-purple-400'}`}
                        style={{height:compHeight*props.duration, top:50+compHeight*props.startTime}}>
                        <View className=''>
                            <Text className="text-white text-2xl truncate mx-2 mt-2">
                                {props.event.title}
                            </Text> 
                            <Text className="text-white text-md truncate mx-2">
                                {convertTimeArraytoString(props.event.start, props.event.end)}
                            </Text>
                            <Text className="text-white text-md truncate mx-2">
                                {props.event.email}
                            </Text>
                            <Text className="text-blue-700 text-md truncate mx-2">
                                {props.event.location}
                            </Text>
                            <Text className="text-gray-700 text-sm truncate mx-2">
                                {props.event.description}
                            </Text>
                        </View>                
                    </View>
                </TouchableOpacity>
    
                <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
                    <View className={`flex justify-center w-[400px] h-[500px] items-center border-4 bg-gray-200`}>
                        <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlay}>
                            <Text className="text-purple-900 text-lg m-2">Back</Text>
                        </TouchableOpacity>
                            <Text className="absolute top-[10] text-lg font-bold text-purple-900">View Event</Text>
                        <TouchableOpacity className="absolute top-[0] right-[0]"></TouchableOpacity>
                        <TouchableOpacity className="absolute top-[0] right-[0]" onPress={toggleOverlayEdit}>   
                           <Text className="text-purple-900 text-lg m-2">Edit</Text>
                        </TouchableOpacity>
                        <View className="absolute flex border-2 h-5/6 justify-center w-full bottom-[50]">
                           <Text className="text-xl font-bold mx-4 text-black">{props.event.title}</Text> 
                           <Text className="text-sm mx-4 text-black">{convertTimeArraytoString(props.event.start,props.event.end)}</Text> 
                           <Text className="text-lg mx-4 text-blue-700">{props.event.location}</Text>
                           <Text className="text-sm mx-4 text-black">{props.event.description}</Text> 
                        </View>
                    </View>
    
                    <Overlay isVisible={visibleEdit} onBackdropPress={toggleOverlayEdit}>
                        <View className={`flex justify-center w-[400px] h-[500px] items-center border-4 bg-gray-200`}>
                            <TouchableOpacity className="absolute top-[0] left-[0]" onPress={toggleOverlayEdit}>
                                <Text className="text-purple-900 text-lg m-2">Back</Text>
                            </TouchableOpacity>
                                <Text className="absolute top-[10] text-lg font-bold text-purple-900">Edit Event</Text>
                            <TouchableOpacity className="absolute top-[0] right-[0]">
                                    <Text className="text-purple-900 text-lg m-2" onPress={async function updateEventDB(){                                        
                                            // Example using fetch
                                            try {
                                                
                                                const f = form;
                                                console.log(f.id)
                                                let start = [parseInt(f.startY, 10), parseInt(f.startM, 10), parseInt(f.startD, 10), parseInt(f.startH, 10), parseInt(f.startm, 10)];
                                                let end = [parseInt(f.endY, 10), parseInt(f.endM, 10), parseInt(f.endD, 10), parseInt(f.endH, 10), parseInt(f.endm, 10)];
                                                console.log(start,end)

                                                checkForm(f)

                                                editEvent({
                                                    id:f.id,
                                                    email:f.email, eventName:f.name, startTime:start,
                                                    endTime:end, description:f.description, location:f.location
                                                }).then(res => console.log(res));
        
                                                toggleOverlayEdit()

                                                setIsChanged(true);

                                            }
                                            catch(e){
                                                console.log('Error', e.message)
                                            }                                        
                                        }
                                    }>Save</Text>
                            </TouchableOpacity>
                            <View className="absolute flex border-0 h-5/6 justify-center w-5/6 bottom-[30]">
                            <FormField 
                                title = "EventName *"
                                value={form.name}
                                handleChangeText={n => setForm({...form, name:n})}
                                placeholder='Name'
                            />
                            <View className="flex-row">
                                <FormField //dropDown
                                    title = "Date *"
                                    value={form.startY}
                                    handleChangeText={n => setForm({...form, startY:n})}
                                    placeholder='YYYY'
                                    otherStyles ="w-[80px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.startM}
                                    handleChangeText={n => setForm({...form, startM:n})}
                                    placeholder='MM'
                                    otherStyles ="w-[40px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.startD}
                                    handleChangeText={n => setForm({...form, startD:n})}
                                    placeholder='DD'
                                    otherStyles ="w-[40px] ml-1 mr-5"
                                />                                
                            </View>
                            <View className="flex-row">

                                <FormField //dropDown
                                    title = "Start Time*"
                                    value={form.startH}
                                    handleChangeText={n => setForm({...form, startH:n})}
                                    placeholder='HH'
                                    otherStyles ="w-[70px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.startm}
                                    handleChangeText={n => setForm({...form, startm:n})}
                                    placeholder='mm'
                                    otherStyles ="w-[50px] mx-1"
                                />

                                <View className="mx-2"/>

                                {/* <FormField //dropDown
                                    title = "end Date *"
                                    value={form.endY}
                                    handleChangeText={n => setForm({...form, endY:n})}
                                    placeholder='YYYY'
                                    otherStyles ="w-[75px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.endM}
                                    handleChangeText={n => setForm({...form, endM:n})}
                                    placeholder='MM'
                                    otherStyles ="w-[40px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.endD}
                                    handleChangeText={n => setForm({...form, endD:n})}
                                    placeholder='DD'
                                    otherStyles ="w-[40px] ml-1 mr-5"
                                /> */}
                                <FormField //dropDown
                                    title = "end Time*"end
                                    value={form.endH}
                                    handleChangeText={n => setForm({...form, endH:n})}
                                    placeholder='HH'
                                    otherStyles ="w-[70px] mx-1"
                                />
                                <FormField //dropDown
                                    title = " "
                                    value={form.endm}
                                    handleChangeText={n => setForm({...form, endm:n})}
                                    placeholder='mm'
                                    otherStyles ="w-[50px] mx-1"
                                />
                            </View>
                            <FormField //Location
                                title = "Location"
                                value={form.location}
                                handleChangeText={n => setForm({...form, location:n})}
                                placeholder='Location'
    
                            />
                            <FormField //Description
                                title = "Description"
                                value={form.description}
                                handleChangeText={n => setForm({...form, description:n})}
                                placeholder='Description'
                            />
                                <CustomButton title="Delete Event" textStyles="text-red-500" 
                                    containerStyles="bg-white border-2 bg-opacity- w-[300] border-purple-900 m-4" 
                                    handlePress={async function deleteEventDB(){
                                        try{
                                            const f = form;
                                            console.log(f.id)
                                            deleteEvent({ id: f.id }).then(event => console.log(event))
                                            toggleOverlayEdit()
                                            setIsChanged(true);
                                        }catch(e){
                                            console.log('Error', e.message)
                                        }
                                    }}/>
                            </View>                    
                        </View>
                    </Overlay>
                </Overlay>
    
            </>
        )
        
    }

    function checkForm(form){

        try{    
            const f = form

            let sY = 0
            let sM = 0
            let sD = 0
            let sH = 0
            let sm = 0
            let eY = 0
            let eM = 0
            let eD = 0
            let eH = 0
            let em = 0

            if(f.endY == '' || f.endM == '' || f.endD == ''){
                sY = parseInt(f.startY)
                sM = parseInt(f.startM)
                sD = parseInt(f.startD)
                sH = parseInt(f.startH)
                sm = parseInt(f.startm)
                eY = parseInt(f.startY)
                eM = parseInt(f.startM)
                eD = parseInt(f.startD)
                eH = parseInt(f.startH)
                em = parseInt(f.startm)
            }else{
                sY = parseInt(f.startY)
                sM = parseInt(f.startM)
                sD = parseInt(f.startD)
                sH = parseInt(f.startH)
                sm = parseInt(f.startm)
                eY = parseInt(f.endY)
                eM = parseInt(f.endM)
                eD = parseInt(f.endD)
                eH = parseInt(f.endH)
                em = parseInt(f.endm)
            }
            
            if(f.startY == '' || f.startM == '' || f.startD == '' || f.name == ''){
                throw("fields with * must not be empty")
            }

            if(
                isNaN(sY) || isNaN(sM) || isNaN(sD) || isNaN(sH) || isNaN(sm) ||
                isNaN(eY) || isNaN(eM)|| isNaN(eD) || isNaN(eH) || isNaN(em)
            ){
                throw("Time inputs must be a number")
            }

            if(sY != eY || sM != eM || sD != eD){
                throw("Only same day events are supported at this time")
            }  
        
            if(sH > eH || (sH == eH && sm >= em)){
                throw("Start time must be before end time")
            }    

            if(sM >= 12 || sM <= 1 || eM >= 12 || eM <= 1){
                throw("Check month number; month doesn't exist")
            }

            if(sD < 1 || eD < 1){
                throw("Check date number; date doesn't exist")
            }
            if(sM == 2 && sD > 28 && sY%4 != 0){
                throw("Check date number; date doesn't exist")
            }
            else if(sM == 2 && sD > 29 && sY%4 == 0){
                throw("Check date number; date doesn't exist")
            }

            if((sM == 1 || sM == 3 || sM == 5 || sM == 7 || sM == 8 || sM == 10 || sM == 12) && sD > 31){
                throw("Check date number; date doesn't exist")
            }else if((sM == 4 || sM == 6 || sM == 9 || sM == 11) && sD > 30){
                throw("Check date number; date doesn't exist")
            }

            if(sY < 2020 || sY > 2100){
                throw("Year is out of currently supported bounds")
            }
        }catch(e){
            console.log("Error", e.message)
        }
    }
    
    function CurrentTimeLine(){
        const [currentTime, setCurrentTime] = useState(new Date());
    
        let timeString = convertTimetoString(currentTime.getHours(),currentTime.getMinutes())
        let anWidth = '100%'
        let compHeight = 128
    
        function convertTimetoString(hours,minutes){
            let h = hours
            let m = minutes
            let mString = m+''
            let am = "am"
            
            if(h > 11){
                am = "pm"
            }
            if(h > 12){
                h = h - 12
            }
            if(h == 0){
                h = 12
            }
    
            if(m >= 0 && m <= 9 ){
                mString = "0"+mString
            }
    
            return h+":"+mString+am;
        }
    
        if(Platform.OS == 'ios' || Platform.OS == 'android'){
            compHeight = 124.75
            anWidth = '78%'        
        }
        // else if(){
        //     //580
        // }
        else{
            compHeight = 128
            anWidth = '90%'
        }
    
        return(
            <>
                <View className="absolute flex-row-reverse border-0 w-full items-center border-purple-300" 
                    style={{top:33+compHeight*currentTime.getHours()+(compHeight*(currentTime.getMinutes()))/60}}>
                    <View className="h-[5px] bg-purple-800" style={{width:anWidth}}/>
                    <View className="h-[35px] w-[90px] bg-purple-800 rounded-full justify-center items-center">
                        <Text className='text-white text-xl'>{timeString}</Text>
                    </View>
                </View>
            </>
        )
    }  
}
    //top:33+compHeight*currentTime.getHours()+(compHeight*(currentTime.getMinutes()))/60



export default Calendar