import { StyleSheet } from "react-native";

export const styles =StyleSheet.create(
    {
        inputContainer:{
          flexDirection:'row',
          backgroundColor:'#f0f0f0',
          justifyContent:'space-between',
          alignItems:'center',
          margin:10,
          padding:10

        },
        inputtext:{
           fontSize:20,
           fontWeight:'bold'
        },
        timecontiner:{
          flexDirection:'row',
          justifyContent:'space-evenly',
          width:100,
        },
        row:{
         flexDirection:'row',
           padding:10,
           margin:10,
          backgroundColor:'#f0f0f0',
          alignItems:'center',
        
        },
        iconcontainer:{
         backgroundColor:'gray',
          margin:2,
          padding:8,
          borderRadius:'50%'
        },
        iconcontainerhome:{
            backgroundColor:'#0ff',
             margin:2,
             padding:8,
             borderRadius:'50%'
           },
        destination:{
            fontSize:20,
            margin:2,
        }
    }
)