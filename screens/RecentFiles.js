import react, {Component} from "react";
import {Text, View, StyleSheet} from 'react-native'

class RecentFiles extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Text style={styles.topText}>Недавние файлы</Text>
            </View>
        )
    }
}

export default RecentFiles

const styles = StyleSheet.create({
    container: {
        paddingTop: 45,
        paddingBottom: 85,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    topText: {
        fontSize: 34,
        fontWeight: '600',
        color: '#336BD8',
        marginBottom: 15
    },
})