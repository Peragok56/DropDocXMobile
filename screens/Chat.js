import react, {Component} from "react";
import {Text, View, StyleSheet} from 'react-native'

class Chat extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Chat screen</Text>
            </View>
        )
    }
}

export default Chat

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
})