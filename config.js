import {Alert} from 'react-native';

const DBurl = 'https://carecircle-qtvs.onrender.com'
//216.37.100.30
//192.168.1.155
//localhost
//https://carecircle-qtvs.onrender.com

export async function getUserEvents(user) {
    try {
        const response = await fetch(DBurl + `/getUserEvents/${user.email}`);
        const data = await response.json();
        const events = data.events;
        return events;
    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
}

export async function addEvent(parameters){
    try {
        const response = await fetch(DBurl+'/createEvent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });
    if (response.ok) {
        console.log('Success', 'Item added successfully!')
        Alert.alert('Success', 'Item added successfully!');
    } else {
        console.log('Error', 'Failed to add item.')
        Alert.alert('Error', 'Failed to add item.');
    }
    } catch (error) {
        console.log('Error', error.message)
        Alert.alert('Error', error.message);   
    }      
}

export async function editEvent(parameters){
    try{
    const response = await fetch(DBurl+`/updateEvent`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
    })
    if(response.ok){
        console.log('Success', 'Item updated successfully!')
        Alert.alert('Success', 'Item update successfully!');
    }
    if (!response.ok) {
        throw new Error('Failed to update entity');
    }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);  
    }
}

export async function deleteEvent(parameters){
    try {
        const response = await fetch(DBurl+`/deleteEvent`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),                          
        })
        if(response.ok){
            console.log('Success', 'Item deleted successfully!')
            Alert.alert('Success', 'Item deleted successfully!');
        }
        if (!response.ok) {
            throw new Error('Failed to delete entity');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
    }
}

export async function getUserEmail(email) {
    try {
        const response = await fetch(DBurl + `/getUserEmail/${email}`);
        const data = await response.json();
        const user = data.users[0];
        return user;
    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
}

export async function getUserID(id) {
    try {
        const response = await fetch(DBurl + `/getUserID/${id}`);
        const data = await response.json();
        const user = data.users[0];
        return user;
    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
}

export async function addUser(parameters){
    try {
        const response = await fetch(DBurl+'/createUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });
    if (response.ok) {
        console.log('Success', 'Item added successfully!')
        Alert.alert('Success', 'Item added successfully!');
    } else {
        console.log('Error', 'Failed to add item.')
        Alert.alert('Error', 'Failed to add item.');
    }
    } catch (error) {
        console.log('Error', error.message)
        Alert.alert('Error', error.message);   
    }      
}

export async function updateUser(parameters){
    try{
    const response = await fetch(DBurl+`/updateUser`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
    })
    if(response.ok){
        console.log('Success', 'Item updated successfully!')
        Alert.alert('Success', 'Item update successfully!');
    }
    if (!response.ok) {
        throw new Error('Failed to update entity');
    }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);  
    }
}

export async function deleteUser(parameters){
    try {
        const response = await fetch(DBurl+`/deleteUser`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),                          
        })
        if(response.ok){
            console.log('Success', 'Item deleted successfully!')
            Alert.alert('Success', 'Item deleted successfully!');
        }
        if (!response.ok) {
            throw new Error('Failed to delete entity');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
    }
}

export async function getUserCalendars(email) {
    try {
        const response = await fetch(DBurl + `/getUserCalendars/${email}`);
        const data = await response.json();
        const calList = data.calendars;
        return calList;
    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
}

export async function getCalendar(id) {
    try {
        const response = await fetch(DBurl + `/getCalendar/${id}`);
        const data = await response.json();
        const cal = data.calendars[0];
        return cal;
    } catch (error) {
        console.error('Error fetching events:', error);
        return null;
    }
}

export async function addCalendar(parameters){
    try {
        const response = await fetch(DBurl+'/createCalendar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),
        });
    if (response.ok) {
        console.log('Success', 'Item added successfully!')
        Alert.alert('Success', 'Item added successfully!');
    } else {
        console.log('Error', 'Failed to add item.')
        Alert.alert('Error', 'Failed to add item.');
    }
    } catch (error) {
        console.log('Error', error.message)
        Alert.alert('Error', error.message);   
    }      
}

export async function editCalendar(parameters){
    try{
    const response = await fetch(DBurl+`/updateCalendar`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameters),
    })
    if(response.ok){
        console.log('Success', 'Item updated successfully!')
        Alert.alert('Success', 'Item update successfully!');
    }
    if (!response.ok) {
        throw new Error('Failed to update entity');
    }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);  
    }
}

export async function deleteCalendar(parameters){
    try {
        const response = await fetch(DBurl+`/deleteCalendar`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(parameters),                          
        })
        if(response.ok){
            console.log('Success', 'Item deleted successfully!')
            Alert.alert('Success', 'Item deleted successfully!');
        }
        if (!response.ok) {
            throw new Error('Failed to delete entity');
        }
    } catch (error) {
        console.error(error);
        Alert.alert('Error', error.message);
    }
}