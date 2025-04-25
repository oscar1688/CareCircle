📅 CareCircle
CareCircle is a calendar-sharing mobile application designed for families and friend groups.
It allows users to create shared calendars, manage events together, and monitor real-time location updates to check if members are following their planned schedules.

✨ Features
📆 Shared Calendars: Create, edit, and manage calendars shared among selected users.
🗓️ Event Sharing: Invite friends and family to events, with real-time updates.
📍 Location Check-Ins: See if users are where they’re supposed to be based on their event schedule.
🔔 Real-Time Updates: Instantly get updates if users change locations or event statuses.

🛠️ Tech Stack
Frontend: React Native (Expo)
Backend: Appwrite (Authentication), MongoDB (database)
Maps/Location: Google Maps API
Authentication: Appwrite

🚀 Installation
# 1. Clone the repository
git clone https://github.com/oscar1688/CareCircle.git
cd CareCircle
# 2. Install dependencies
npm install
# 3. Start the development server
npx expo start

📱 Usage
Open the app and sign up or log in.
Create a shared calendar or join an existing one.
Add events with times and optional location data.
Enable location permissions to allow real-time schedule tracking.
Monitor your group’s compliance with the event schedule through the calendars view by selecting the user you want to view.

🤝 Contributers
Oscar - Figma App Design, FrontEnd:Landing Page, Auth Screens, Profile Screen, Backend: Auth, Location, Testing & Debugging
Anthony - Figma App Design, FrontEnd: Home Page, Calendars Screen, Backend: Database, Testing & Debugging
Jeffery - Figma App Design, FrontEnd: Settings Screen, Profile Screen, Backend: Database, Documentation
Jumman - Figma App Design, FrontEnd: Profile Screen, assisted Anthony with creation of Calendar Screen, Documentation

📦 Packages & API
expo – (Core Expo SDK – everything runs on this)
react – (Core React library)
react-native – (Core React Native library)
expo-router – (Routing/navigation for your app)
expo-location – (Expo API for location services)
axios – (HTTP client for making API calls)
geolib – (Helps with distance and geospatial calculations)
nativewind – (Use Tailwind CSS style classes inside React Native)
tailwindcss – (Tailwind CSS core dependency for NativeWind)
react-native-appwrite – (Connects your app to Appwrite backend for authentication, database, etc.)

📚 User Guide
To install the the APK file follow the following steps:
1. Access the APK file from the download link above on your android device and click on download.
2. After downloading the APK file, simply clicking on the download popup from the web browser or clicking on the APK file from your downloads folder and android will prompt you regarding how you want to open the file.
3. Select APK installer from the menu provided, and then Click on install.
4. Certain security permissions need to be enabled for this to work. Specifically, you must enable “Install unknown apps” for the file explorer/web browser, depending on which you are running the installed APK file from.
5. After allowing said permissions, you will be able to install the app through the package installer.
6. After installation is complete, click on open or you can access the app through a new app icon from your “all apps” menu.
To start using the app follow the following steps:
1. Click on the continue button at the welcoming page.
2. Click on Sign Up on the Sign In page. Once you are at the Sign Up page, enter your name, email, and desired password and then click "Sign Up". After verification, you will be brought to the home page.
3. If you are a returning user, you can simply login by entering your email and password at the Sign In page.
4. Once you are at the home page, you are greeted with your own calendar. Here you can create/edit/delete events, and view previously created events. You can navigate to other dates by using the "Prev Week/Next Week" buttons and clicking on the dates. There is a convenient "Today" button to return your view to the current date. In addition, there is a bottom navigation bar where you can access "Calendars" and "Profile", "Calendars" can be understood as "groups" of people that are sharing their schedules.
5. On the Calendars screen you can create a new group(Calendar) to share with friends/family. After creating a Calendar by inputting a name, you can click on the calendar to add users to the calendar. You can add users by clicking on the "Add User" button and entering a valid email address of said user. Clicking on the setting icon of Calendars you belong to, you can decide to "Leave Calendar" if you are not the owner, or "Delete Calendar" if you are the owner. Clicking into the Calendar, you can view users that belong to the calendar. Clicking on each user allows you to view their schedule, and from the users page you are able to remove users by clicking on the gear icon next to the respective user.]
6. On the Profile screen, you are able to see your username, and email address, as well as be able to sign out. The ability to edit user information/uploading icon is pending implementation.

