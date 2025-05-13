import React, { useContext } from 'react';
import { useState } from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import BottomTab from "../bottomTab";
import Settings from "../customerScreens/profileScreens/setting";
import FetchingHostelData from "../FecthingData/hosteldata";
import HostelDetails from "../FecthingData/displayingData";
import SignIn from "../userDetails/signin";
import SignUp from "../userDetails/signup";
import { AuthContext } from "../userDetails/userAuth";


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
        name="Settings"
        component={Settings}
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
    </CustomerBar.Navigator>

  );
};

export default CustomerStack;
