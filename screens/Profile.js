import react, {Component} from "react";
import {Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Pressable, TextInput} from 'react-native'

class Profile extends Component{
    constructor(props){
        super(props)
        this.state = {
            passwordVisible: false,
            newPassword: '',
            dataVisible: false,
            newData: '',
        }
    }

    passwordVisible = (visible) => {
        this.setState({ passwordVisible: visible });
      }

      dataVisible = (visible) => {
        this.setState({ dataVisible: visible });
      }

    render(){

        const changePassword = () => {
            let fData = {
                fileId: this.state.newPassword,
              }
              console.log(this.state.nowId);
            storage.load({
                key: 'token'
            })
            // .then(res => axios.patch('/file/makeTemplate', {data: fData, headers: {Authorization: res.token}}))
        }

        return(
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.passwordVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <TextInput placeholder="Введите новый пароль" style={styles.textInput} onChange={newPassword => this.setState({newPassword: newPassword.nativeEvent.text})}/>
                                <Text style={styles.formButton} onPress={changePassword}>Изменить</Text>
                                <Pressable
                                    style={styles.modalClose}
                                    onPress={() => {this.passwordVisible(false)}}
                                >
                                    <Text style={styles.buttonModalClose}>&#215;</Text>
                                </Pressable>
                            </View>
                        </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.dataVisible}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <TextInput placeholder="email: root@dropdocx" style={styles.textInput}/>
                            <TextInput placeholder="Логин: root" style={styles.textInput}/>
                            <TextInput placeholder="Имя" style={styles.textInput}/>
                            <TextInput placeholder="Фамилия" style={styles.textInput}/>
                                <Text style={styles.formButton} onPress={changePassword}>Изменить</Text>
                                <Pressable
                                    style={styles.modalClose}
                                    onPress={() => {this.dataVisible(false)}}
                                >
                                    <Text style={styles.buttonModalClose}>&#215;</Text>
                                </Pressable>
                            </View>
                        </View>
                </Modal>


               <Text style={styles.topText}>Профиль</Text> 
               <ScrollView contentContainerStyle={styles.profileView} showsHorizontalScrollIndicator={false}>
                   <Image source={require('../assets/icons/ava.png')} style={styles.ava}/>
                   <Text style={styles.avaText}>Данил Ленченков</Text>
                   <Text style={styles.avaMidText}>Главный администратор, образованный front-end разработчик и просто хороший человек</Text>
                   <TouchableOpacity>
                       <Text style={styles.changePassword} onPress={() => this.passwordVisible(true)}>Сменить пароль</Text>
                   </TouchableOpacity>
                   <TouchableOpacity>
                       <Text style={styles.changePassword} onPress={() => this.dataVisible(true)}>Изменить</Text>
                   </TouchableOpacity>
               </ScrollView>
            </View>
        )
    }
}

export default Profile

const styles = StyleSheet.create({
    container: {
        paddingTop: 45,
        paddingBottom: 85,
        paddingRight: 15,
        paddingLeft: 15,
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
    topText: {
        fontSize: 34,
        fontWeight: '600',
        color: '#336BD8',
        marginBottom: 15
    },
    profileView: {
        width: '100%',
        minHeight: 275,
        display: 'flex',
        alignItems: 'center'
    },
    ava: {
        width: 175,
        height: 175,
        marginTop: 45,
        borderTopRightRadius: 100,
        borderTopLeftRadius: 100,
        borderBottomRightRadius: 100,
        borderBottomLeftRadius: 100,
    },
    avaText: {
        fontSize: 24,
        fontWeight: '600',
        marginTop: 15,
    },
    avaMidText: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
        marginTop: 15,
        color: '#909090'      
    },
    changePassword: {
        marginTop: 25,
        padding: 8,
        backgroundColor: '#336BD8',
        color: 'white',
        width: 125,
        textAlign: 'center',
    },
    modalClose: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        right: 0,
        top: 0,
        width: 55,
        height: 55,
    },
    buttonModalClose: {
        color: 'black', 
        fontSize: 28,
    },
    centeredView: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    modalView: {
        width: '90%',
        position: 'relative',
        right: 0,
        left: 0,
        minHeight: 165,
        marginTop: 45,
        backgroundColor: "#F3F3F3",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      formButton: {
        textAlign: 'center',
        color: 'white',
        width: '80%',
        maxHeight: 55,
        marginTop: 15,
        backgroundColor: "#383838",
        padding: 8,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    textInput:{
        backgroundColor: '#fff',
        color: 'black',
        width: "80%",
        padding: 8,
        marginTop: 15,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        
    }
})