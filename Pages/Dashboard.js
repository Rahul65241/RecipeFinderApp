import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Button, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Dashboard({ navigation }) {
    const [recipedata, setRecipedata] = useState();
    const [search, setSearch] = useState();
    const [status, setStatus] = useState();
    const [totalresult, setTotalresult] = useState();


    const Recipelist = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'https://api.spoonacular.com/recipes/complexSearch',
                params: {
                    apiKey: 'e04b1144c5d24609aaba868e7e09f113',
                    query: search,
                    number: 100
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
            //console.log("data", data);
            setRecipedata(data.results);
            setTotalresult(data.totalResults)
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
                        <MaterialCommunityIcons name="menu" size={30} color="white" style={{ marginTop: width * 0.14, marginLeft: 10 }} />
                    </View>
                    <Text style={styles.title}>WELCOME</Text>
                    <TextInput
                        style={styles.inputText}
                        placeholder="Search"
                        //autoComplete='off'
                        value={search}
                        onChangeText={text => setSearch(text)} />
                    <TouchableOpacity onPress={() => { setStatus(1), Recipelist() }} style={{ alignItems: 'center', borderRadius: 4, height: 35, marginTop: 15, backgroundColor: 'blue', width: '20%', alignSelf: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', justifyContent: 'center', padding: 7 }}>SEARCH</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert('Added as Favourite')} style={{ alignItems: 'center', borderRadius: 4, height: 35, marginTop: 25, backgroundColor: 'blue', width: '60%', alignSelf: 'center' }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', justifyContent: 'center', padding: 7 }}>CLICK TO VIEW FAVOURITE LIST</Text>
                    </TouchableOpacity>

                    {totalresult == 0 ? <Text style={{ alignSelf: 'center', marginTop: width * 0.5, fontWeight: "bold", fontSize: 22 }}>No Result Found</Text> : ''}
                    {totalresult != 0 && status == 1 ? <>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Recipe Lists</Text>
                        {recipedata?.map(function (food) {
                            return (
                                <TouchableOpacity onPress={()=>navigation.navigate('RecipeDetails', food.id)} key={food.id}>
                                    <ImageBackground
                                        source={{ uri: food.image }}
                                        style={{ width: width * 0.9, height: height * 0.3, marginTop: 20, marginLeft: 15, marginBottom: 20 }}
                                    >
                                        <View style={{ position: 'absolute', bottom: 0, backgroundColor: 'blue', flex: 1, width: width * 0.9, alignItems: 'center' }}>
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginBottom: 10, marginTop: 5 }}>{food.title}</Text>

                                        </View>
                                    </ImageBackground>
                                </TouchableOpacity>
                            )
                        })}</> : ''}
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
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        backgroundColor: "#F6F6F6",
        height: 50,
        borderRadius: 8,
        marginTop: 25,
        alignSelf: 'center',
        padding: 15,
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
