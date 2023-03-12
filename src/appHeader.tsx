import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { Text, StyleSheet, View, ImageBackground } from 'react-native';
import AppBar from "@mui/material/AppBar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 200,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});
export function AppHeader(){    
    return(
       <AppBar position="static">
        <ImageBackground source={require('./img/images.jpeg')} resizeMode="cover" style={styles.image} alt='Bikes'>
            <Text style={styles.text}>Find your B!ke</Text>
        </ImageBackground>
        </AppBar>
    );
  };

