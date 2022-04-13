import react, {Component} from "react";
import {Text, View, StyleSheet} from 'react-native'

class Organizations extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>Organizations screen</Text>
            </View>
        )
    }
}

export default Organizations

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#8fcbbc'
    }
})