// App.tsx 
import React from 'react'; 
import { StatusBar } from 'expo-status-bar'; 
// These paths use the correct capitalization as seen in your screenshot:
import { ChatProvider } from './Contexts/ChatContext'; 
import { DataProvider } from './Contexts/DataContext'; 
import { LanguageProvider } from './Contexts/LanguageContext'; 
import RootNavigator from './Navigation/RootNavigator'; 

export default function App() { 
  return ( 
    <LanguageProvider> 
      <DataProvider> 
        <ChatProvider> 
          <RootNavigator /> 
          <StatusBar style="auto" /> 
        </ChatProvider> 
      </DataProvider> 
    </LanguageProvider> 
  ); 
}
