import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image, ImageBackground, Pressable, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({navigation}) {
    return (
        <>
            <LinearGradient
                colors={['#2E2B69', 'purple', 'red', '#2A12CC']}
                style={styles.linearGradient}>
                <MaterialCommunityIcons name="food-turkey" size={90} color="white" />
                <Text style={styles.head}>RECIPE <Text style={styles.head2}>FINDER</Text> APP</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttontext}>Continue</Text>
                </TouchableOpacity>
            </LinearGradient>
        </>
    );
}

const styles = StyleSheet.create({
    head: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'black',
        fontStyle: 'italic',
        textAlign:'center'
    },
    head2: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
        fontStyle: 'italic',
        textAlign:'center'
    },
    linearGradient: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        position: 'absolute',
        bottom: 50,
        width: '85%',
        height: '5%',
        backgroundColor: 'lightblue',
        borderRadius: 8
    },
    buttontext: {
        flex: 1,
        color: 'black',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent: 'center',
        position: 'relative',
        marginTop: 5
    }
});
