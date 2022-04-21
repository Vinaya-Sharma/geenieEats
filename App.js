
import React from 'react';
import Home from "./screens/Home";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {
  return (
   <Home/>
  );
};

export default App;
