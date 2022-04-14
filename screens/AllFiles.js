import react, {Component} from "react";
import {Text, View, StyleSheet, Image, FlatList, TouchableOpacity, Modal, Pressable, TextInput, ScrollView, RefreshControl} from 'react-native'
import axios from "../axios/axios";
import storage from "../store/Storage";
import { nanoid } from "nanoid";

class AllFiles extends Component{
    constructor(props){
        super(props)
        this.state = {
            file: [],
            modalVisible: false,
            modalChange: 'view',
            nowId: null,
            newFileName: '',
            refresh: false,
        }
    }

    componentDidMount(){
        storage.load({
            key: 'token'
        })
        .then(res => axios.get('/file/getList', {headers: {Authorization: res.token}})
        .then((res2) => {
            console.log(res2);
            this.setState({file: res2.data.data.files})
        }))

        storage.load({
            key: ['token', 'homeFolderId'],
        })
        .then(res => console.log(res))
        
    }



    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
      }

    
    

    render(){

        const onRefresh = (() => {
            this.setState({refresh: true});
            setTimeout(() => {
                storage.load({
                    key: 'token'
                })
                .then(res => axios.get('/file/getList', {headers: {Authorization: res.token}})
                .then((res2) => {
                    this.setState({file: res2.data.data.files})
                }))
            }, 1200);
            setTimeout(() => {
                this.setState({refresh: false})
            }, 1450);
          });

        const renameFile = () =>{
            let fData = {
                fileId: this.state.nowId,
                newFileName: this.state.newFileName,
              }
              console.log(this.state.nowId);
              storage.load({
                key: 'token'
            })
            .then(res => axios.patch('/file/rename', fData, {headers: {Authorization: res.token}})
            .then((res2) => {
                console.log(res2);
            }))
        }

        const deleteFile = () => {
            let fData = {
                fileId: this.state.nowId,
              }
              console.log(this.state.nowId);
            storage.load({
                key: 'token'
            })
            .then(res => axios.delete('/file/remove', {data: fData, headers: {Authorization: res.token}})
            .then((res2) => {
                console.log(res2);
                this.setState({modalVisible: false})
                this.setState({modalChange: 'view'})
                
            }))
        }

        const templateEdit = () => {
            let fData = {
                fileId: this.state.nowId,
              }
              console.log(this.state.nowId);
            storage.load({
                key: 'token'
            })
            .then(res => axios.patch('/file/makeTemplate', {data: fData, headers: {Authorization: res.token}}))
        }

        return(
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                    >
                    {this.state.modalChange === 'view'? 
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => this.setState({modalChange: 'rename'})} style={styles.textOption}>
                            <Text style={styles.modalText}>Переименовать файл</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => deleteFile(this.state.nowId)} style={styles.textOption}>
                            <Text style={styles.modalText}>Удалить файл</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => templateEdit(this.state.nowId)} style={styles.textOption}>
                            <Text style={styles.modalText}>Сделать шаблоном</Text>
                        </TouchableOpacity>
                            <Pressable
                                style={styles.modalClose}
                                onPress={() => {this.setModalVisible(false), this.setState({modalChange: 'view'})}}
                            >
                                <Text style={styles.buttonModalClose}>&#215;</Text>
                            </Pressable>
                        </View>
                    </View>: this.state.modalChange === 'rename' ?
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.changeTopText}>Переименовать файл</Text>
                                <TextInput placeholder="Введите новое название" style={styles.textInput} onChange={newName => this.setState({newFileName: newName.nativeEvent.text})}/>
                                <Text style={styles.formButton} onPress={renameFile}>Изменить</Text>
                                <Pressable
                                    style={styles.modalClose}
                                    onPress={() => {this.setModalVisible(false), this.setState({modalChange: 'view'})}}
                                >
                                    <Text style={styles.buttonModalClose}>&#215;</Text>
                                </Pressable>
                            </View>
                        </View> : null
                    }
                </Modal>
                <Text style={styles.topText}>Все файлы</Text>
                {console.log(this.state.file)}
                <ScrollView contentContainerStyle={styles.contentContainer}
                refreshControl={
                    <RefreshControl
                      refreshing={this.state.refresh}
                      onRefresh={onRefresh}
                    />}
                >
                        {this.state.file.map((item) => 
                            item.isDeleted === false ?
                                <TouchableOpacity style={styles.card} onLongPress={() => {this.setModalVisible(true), this.setState({nowId: item._id})}} key={nanoid()}>
                                    <Image source={require('../assets/files/File.png')} style={{width: "70%", height: "70%"}}/>
                                    <Text style={styles.cardText}>{item.name}</Text>
                                </TouchableOpacity> : null
                            
                        )}
                        
                </ScrollView>
            </View>
        )
    }
}

export default AllFiles

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
    changeTopText: {
        fontSize: 21,
        fontWeight: '600',
        color: '#336BD8',
        marginBottom: 15
    },  
    card: {
        marginBottom: 55,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: 225,
        height: 225,
        backgroundColor: "#F3F3F3",
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
        position: 'relative'
    },
    cardText: {
        position: 'absolute',
        bottom: -30
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
    textInput:{
        backgroundColor: '#fff',
        color: 'black',
        width: "80%",
        padding: 8,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        borderBottomRightRadius: 8,
        borderBottomLeftRadius: 8,
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
    textOption: {
        marginTop: 15,
        backgroundColor: '#336BD8',
        padding: 8,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
    },
    modalText: {
        color: 'white',
        width: 245,
        textAlign: 'center',
    },
    contentContainer: {
        padding: 25
      }
})