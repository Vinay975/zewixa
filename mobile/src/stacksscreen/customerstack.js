import React, { useContext } from 'react';
import { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "../bottomTab";
// import Settings from "../customerScreens/profileScreens/setting";
// import FetchingHostelData from "../FecthingData/hosteldata";
import HostelDetails from "../FecthingData/displayingData";
import ApartmentDetails from '../FecthingData/apartmentDetails';

import HostelBooking from '../Booking/HostelBooking';

import PersonInfo from '../UserAccountData/personInfo';
import Security from '../UserAccountData/security';
import Payments from '../UserAccountData/payments';
import Notifications from '../UserAccountData/notifications';
import ContactUs from '../SupportPage/contact';
import HelpCentre from '../SupportPage/helpCentre';
import TermsOfService from '../SupportPage/termsofservice';
import PrivacyPolicy from '../SupportPage/privacypolice';
import SignIn from "../userDetails/signin";
import SignUp from "../userDetails/signup";
// import { AuthContext } from "../userDetails/userAuth";


const CustomerBar = createStackNavigator();

const CustomerStack = ({ setIsHost }) => {

  const [user, setUser] = useState(null);
  return (
    <CustomerBar.Navigator screenOptions={{ headerShown: false }}>
      <CustomerBar.Screen name="BottomTab">
        {() => <BottomTab setIsHost={setIsHost} />}
      </CustomerBar.Screen>

      {/* 👇 Show the header only for Settings */}
      <CustomerBar.Screen
        name="PersonalInformation"
        component={PersonInfo}
        options={{ headerShown: true }}
      />
       <CustomerBar.Screen
        name="Security"
        component={Security}
        options={{ headerShown: true }}
      />
       <CustomerBar.Screen
        name="Payments"
        component={Payments}
        options={{ headerShown: true }}
      />
       <CustomerBar.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: true }}
      />
      
      <CustomerBar.Screen
        name="ContactUs"
        component={ContactUs}
        options={{ headerShown: true }}
      />
      <CustomerBar.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicy}
        options={{ headerShown: true }}
      />
      <CustomerBar.Screen
        name="TermsOfService"
        component={TermsOfService}
        options={{ headerShown: true }}
      />
       <CustomerBar.Screen
        name="HelpCentre"
        component={HelpCentre}
        options={{ headerShown: true }}
      />
      <CustomerBar.Screen name="SignIn"
        options={{ headerShown: true }}>
        {(props) => (
          <SignIn {...props} setUser={setUser} />
        )}
      </CustomerBar.Screen>
      <CustomerBar.Screen name="SignUp"
        options={{ headerShown: true }}
      >
        {(props) => (
          <SignUp {...props} setUser={setUser} />
        )}
      </CustomerBar.Screen>
      <CustomerBar.Screen
        name="HostelDetails"
        component={HostelDetails}
        options={{ headerShown: true }}
      />
       <CustomerBar.Screen
        name="ApartmentDetails"
        component={ApartmentDetails}
        options={{ headerShown: true }}
      />
       <CustomerBar.Screen
        name="HostelBooking"
        component={HostelBooking}
        options={{ headerShown: true }}
      />
    </CustomerBar.Navigator>

  );
};

export default CustomerStack;
