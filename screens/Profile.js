import React from 'react';
import { StyleSheet, Text, View,FlatList,Image, Linking,Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card, Title,Button} from 'react-native-paper';
import { MaterialIcons ,Entypo} from '@expo/vector-icons';

const Profile=(props)=>{
    const {_id,name,picture,phone,salary,email,position} = props.route.params.item
    const openDial=()=>{
        if(Platform.OS === "android"){
           Linking.openURL(`tel:${phone}`)
        }else{
           Linking.openURL(`telprompt:${phone}`)
        }
   }
   const deleteEmploye = ()=>{
    fetch("https://ea0e11ea7ea6.ngrok.io/delete",{
        method:"post",
        headers:{
         'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            id:_id
        })
    })
    .then(res=>res.json())
    .then(deletedEmp=>{
        Alert.alert(`${deletedEmp.name} deleted`)
        props.navigation.navigate("Home")
    })
    .catch(err=>{
     Alert.alert("someting went wrong")
    })
}
    return(
    <View style={styles.root}>
        <LinearGradient
        colors={["#0652cc","#3074e3"]}
        style={{height:"20%"}}
        />
        <View style={{alignItems:"center"}}>
        <Image
        style={{width:100,height:100,borderRadius:50,marginTop:-50}}
        source={{uri:picture}}/>
        </View>   
        <View style={{alignItems:"center",margin:15}}>
            <Title>{name}</Title>
            <Text style={{fontSize:18}}>{position}</Text>

        </View>
        <Card style={styles.mycard} onPress={()=>{
            Linking.openURL(`mailto:${email}`)
        }}>
            <View style={styles.cardContent}>
            <MaterialIcons name="email" size={32} color="#0652cc"/>
    <Text style={styles.mytext}>{email}</Text>
            </View>        

        </Card>
        <Card style={styles.mycard}  onPress={()=>openDial()}>
            <View style={styles.cardContent}>
            <Entypo name="phone" size={32} color="#0652cc"/>
    <Text style={styles.mytext}>{phone}</Text>
            </View>        

        </Card>
        <Card style={styles.mycard}>
            <View style={styles.cardContent}>
            <MaterialIcons name="attach-money" size={32} color="#0652cc"/>
    <Text style={styles.mytext}>{salary}</Text>
            </View>        

        </Card>

        <View style={{flexDirection:"row",justifyContent:"space-around",padding:10}}>
            <Button 
             icon="account-edit"
             mode="contained"
             theme={theme}
             onPress={() => {
                props.navigation.navigate("Create",
                {_id,name,picture,phone,salary,email,position}
                ) 
             }}>
                Edit
            </Button>
            <Button 
             icon="delete"
             mode="contained"
             theme={theme}
              onPress={()=>deleteEmploye()}>
                Fire employee
            </Button>
         </View>

    </View>
    )
}
const theme = {
    colors:{
        primary:"#006aff"
    }
}

const styles = StyleSheet.create({
    root:{
        flex:1
    },
     mycard:{
         margin:3
     },
 cardContent:{
     flexDirection:"row",
     padding:8
 },
 mytext:{
     fontSize:18,
     marginTop:3,
    marginLeft:5
 }
})
export default Profile;