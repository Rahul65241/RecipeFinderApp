import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Dimensions, TextInput, TouchableOpacity, FlatList, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";


export default function RecipeDetails({ navigation, route }) {
    const [recipeid, setrecipeid] = useState(route.params);
    const [recipedata, setRecipedata] = useState();

    useEffect(() => {
        Recipelist();
    }, [recipeid])

    const Recipelist = async () => {
        try {
            const { data } = await axios({
                method: 'GET',
                url: 'https://api.spoonacular.com/recipes/'+recipeid+'/information',
                params: {
                    apiKey: 'e04b1144c5d24609aaba868e7e09f113',
                    includeNutrition: false,
                },
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log("data", data);
            setRecipedata(data);
        } catch (err) {
            console.log("195", err);
        }
    };



    return (
        <>
            <LinearGradient
                colors={['#2E2B69', 'orange', 'red', '#2A12CC']}
                style={styles.linearGradient}>
                <ScrollView>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <MaterialCommunityIcons name="arrow-left" onPress={() => navigation.navigate('Dashboard')} size={30} color="white" style={{ marginTop: width * 0.14, marginLeft: 10 }} />
                    </View>


                    <View style={{ backgroundColor: 'blue', width: '90%', alignSelf: 'center', marginTop: 20, borderRadius: 7 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20, marginLeft: width * 0.05, marginTop: width * 0.06 }}>{recipedata?.title}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={{ color: 'white', marginLeft: width * 0.05, marginTop: width * 0.09, fontWeight: '800' }}>{recipedata?.vegetarian?'Vegetarian':'Non-Vegetarian'}</Text>
                                <View style={{ flexDirection: 'row', marginBottom:20 }}>
                                    <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                        <Text style={{ color: 'white', marginLeft: width * 0.05, fontWeight: '800' }}>Health Score: {recipedata?.healthScore}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'column', width: width * 0.5 }}>
                                        <Text style={{ color: 'white', marginRight: width * 0.15, fontWeight: '800', textAlign: 'right' }}>{recipedata?.license}</Text>
                                    </View>
                                </View>
                                </View>
                            </View>
                        </View>
                        <TouchableOpacity style={{width:'30%', height:35, backgroundColor:'blue', alignSelf:"center", alignItems:'center',
                        marginTop:15, borderRadius:6}} onPress={()=>alert('Added to Favourite List')}>
                            <Text style={{marginTop:5, fontWeight:'bold', color:'white', fontSize:14}}>Add to Favourite</Text>
                        </TouchableOpacity>

                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 15, marginTop: 20,  }}>
                        Recipe Image
                    </Text>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <ImageBackground
                            source={{uri:recipedata?.image}}
                            style={{width: width*0.9, height: height*0.3, marginTop: 20, marginBottom: 20 }}
                        >
                        </ImageBackground>

                    </View>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Overview</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Recipe Name:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21,width:'65%' }}> {recipedata?.title}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Ready in Minutes:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {recipedata?.readyInMinutes} minutes</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Servings: 
                         </Text>
                        <Text style={{ color: 'white', marginTop: 21, width:'70%', textAlign:'justify' }}>{recipedata?.servings}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Vegetarian:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, }}> {recipedata?.vegetarian?'YES':'NO'}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginBottom:30 }}>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', marginLeft: 15, marginTop: 20, color: 'white' }}>Summary:
                        </Text>
                        <Text style={{ color: 'white', marginTop: 21, width:'70%' }}> {recipedata?.summary}</Text>
                    </View>

                </ScrollView>
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
