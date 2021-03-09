import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View,FlatList,ActivityIndicator, Alert } from 'react-native';
import {Card,FAB} from 'react-native-paper';
import {Image} from 'react-native';
const Home=(props)=>{
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(true)
    const fetchData=()=>{
        fetch("https://ea0e11ea7ea6.ngrok.io/").
        then(res=>res.json())
        .then(results=>{
            setData(results)
            setLoading(false)        
        }).catch(err=>{
            Alert.alert('something went wrong in create')
        })
    }
    useEffect(() => {
       fetchData()
    }, [])
    

    const renderList = ((item)=>{
        return(
          <Card style={styles.mycard}
          onPress={()=>props.navigation.navigate("Profile",{item})}>
          <View style={styles.cardView}>
               <Image
              style={{width:60,height:60,borderRadius:30}}
              source={{uri:item.picture}}
              
              />
              <View style={{marginLeft:10}}>
                  <Text style={styles.text}>{item.name}</Text>   
                   <Text style={styles.text}>{item.pos}</Text>      
              </View>
         
          </View>
          
         </Card>
        )
  })
   
    return(
        <View style={{flex:1}}>
           <FlatList
              data={data}
              renderItem={({item})=>{
                return renderList(item)
              }}
              keyExtractor={item=>item._id}
              onRefresh={()=>fetchData()}
              refreshing={loading}
              />
         
           <FAB 
            style={styles.fab}
            small
            icon="plus"
            theme={{colors:{accent:"blue"}}}
            onPress={()=>props.navigation.navigate("Create")}
            />

            
        </View>
        
    )
}

const styles = StyleSheet.create({
    mycard:{
      margin:5,
      padding:5,
      backgroundColor:"#4dc3ff",
      flexDirection:"row"
    },
    cardview:{
        flexDirection:"row"
    },
    text:{
        fontSize:20
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    

      }
  });

export default Home