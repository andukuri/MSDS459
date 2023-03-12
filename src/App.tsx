import React, { useState, Dispatch } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route, useNavigate }
    from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import {  ApolloClient,
  ApolloProvider, createHttpLink,  InMemoryCache} from "@apollo/client";
import { AppHeader } from './appHeader';
import UserAsk from './userAsk';
import { UserAskDataType } from './type';
import BikeComp from './bikeComp';

  const httpLink = createHttpLink({
    uri: "/graphql",
    headers: {
      'Content-Type': 'application/json'
      },
    useGETForQueries: true
  });

  


  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache({ addTypename: false })
  });

  
function App() {

    
  const [ userAskData, update ] = useState<UserAskDataType>();
  const updateVars=(newData)=>{

    update(newData);
  }

  return (
    <>      
      <AppHeader />
      <ApolloProvider client={client}>  
        <Router>         
          <Container>   
            <Routes>
              <Route path='/' element={<UserAsk updateVars={updateVars} userAskData={userAskData}/>}/> 
              <Route path="/bikes" element={<BikeComp userAskData={userAskData}/>}/> 
            </Routes> 
          </Container>
        </Router>
        </ApolloProvider>
    </>
  );  
}

export default App;
