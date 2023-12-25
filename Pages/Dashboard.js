import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard({ navigation }) {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [recipedata, setRecipedata] = useState();

    useEffect(() => {
        Recipelist();
    }, [])


    const Recipelist = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'https://api.spoonacular.com/recipes/complexSearch',
                params: {
                    apiKey: 'e04b1144c5d24609aaba868e7e09f113'
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("data", data);
            setRecipedata(data.results)
        } catch (err) {
            console.log("195", err);
        }
    };


    return (
        <>
            <LinearGradient
                colors={['#2E2B69', 'lightblue', 'yellow', '#2A12CC']}
                style={styles.linearGradient}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MaterialCommunityIcons name="menu" onPress={() => navigation.navigate('RegularAccount')} size={30} color="white" style={{ marginTop: width * 0.14, marginLeft: 10 }} />
                        <MaterialCommunityIcons name="shopping-outline" onPress={() => navigation.navigate('Cart')} size={30} color="white" style={{ marginTop: width * 0.14, marginRight: 10 }} />
                    </View>
                    <Text style={styles.title}>WELCOME {username}!</Text>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.inputText}
                            placeholder="Search"
                            autoComplete='off'
                            onChangeText={text => setName(text)} />
                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Recipe Lists</Text>
                    {recipedata == undefined || recipedata == null || recipedata == '' ? '' :
                        (recipedata?.map(function (food) {
                            return (
                                <View key={food.id}>
                                    <ImageBackground
                                        source={{uri:food.image}}
                                        style={{ width: width * 0.9, height: height * 0.3, marginTop: 20, marginLeft: 15, marginBottom: 20 }}
                                    >
                                        <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'blue',flex:1,  width: width * 0.9, alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom:10, marginTop:5 }}>{food.title}</Text>

                                        </View>
                                    </ImageBackground>
                                </View>
                            )
                        }))}
                </ScrollView >
            </LinearGradient >
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    linearGradient: {
        flex: 1
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        backgroundColor: "#F6F6F6",
        height: 50,
        borderRadius: 8,
        marginTop: 25,
        alignSelf: 'center',
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "black",
    },
    title: {
        fontWeight: 'bold',
        fontSize: width * 0.05,
        color: 'violet',
        marginTop: 25,
        textAlign: 'center',
    }

});
