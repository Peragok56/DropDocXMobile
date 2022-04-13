import react, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity,  Pressable} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Tabs from "./nav/tabs";
import axios from "./axios/axios";
import storage from "./store/Storage";

const App = () => {
  const[isAuth, setAuth] = useState(true)
  const[login, setLogin] = useState('')
  const[password, setPassword] = useState('')

  const Authorization = () => {
    let fData = {
      login: login,
      password: password,
    }
    axios.post('/account/login', fData)
    .then((res) => {
      // console.log(res);
      storage.save({
        key: 'token',
        data: {
          token: res.data.data.token
        }
      })
      setAuth(true)
    })
    .catch((e) => {
      console.log(e);
    })
  }

  function auth() {
    if (isAuth === false) {
      return(
        <View style={style.container}>
          <View style={style.form}>
            <Text style={{color: '#336BD8', fontSize: 24, textAlign: 'center', marginBottom: 45}}>Авторизация</Text>
            <View>
              <TextInput placeholder="Логин" style={style.input} onChange={login => setLogin(login.nativeEvent.text)}/>
              <TextInput placeholder="Пароль" style={style.input} secureTextEntry={true} onChange={password => setPassword(password.nativeEvent.text)}/>
                <TouchableOpacity>
                <Text style={style.button} onPress={() => Authorization(login, password)}>Войти</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
      )
    } else {
      return(
        <NavigationContainer>
        <Tabs />
      </NavigationContainer>
      )
    }
  }

    return(
      auth()
    )
}

export default App

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
}, 
  form: {
    padding: 25,
    width: 325,
    height: 250,
    backgroundColor: '#F3F3F3',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputForm:{
    width: "100%",
    
  },
  input: {
    backgroundColor: "white",
    padding: 8,
    marginBottom: 5,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
  },
  button: {
    textAlign: 'center',
        color: 'white',
        width: '100%',
        maxHeight: 55,
        marginTop: 15,
        backgroundColor: "#383838",
        padding: 8,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
  },
  buttonText: {
    color: 'white', fontSize: 20
  }
})