import { SafeAreaView, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { styles } from "./style";
import AutocompleteScreen from "../../components/GomapComponent/gomapproautoComplete";
import { Alert } from "react-native";


const DestinationSearch = () => {
  const [From, setFromtext] = useState("");
  const [To, setToText] = useState("");
  const [PickUp,setpickup]=useState('')
  const [DropLocation,setDropof]=useState('')
  
  useEffect(()=>
    {
      if(PickUp&&DropLocation)
      {
        Alert.alert('yes good')
      }
    },[PickUp,DropLocation])
  


  useEffect(()=>
  {
   console.log(PickUp)
  },[PickUp])

  useEffect(()=>
    {
     console.log(DropLocation)
    },[DropLocation])
  


  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.textInput}
        value={From}
        onChangeText={setFromtext}
        placeholder="from"
      />
            {!From && !PickUp && <AutocompleteScreen setFromText={setFromtext} setLocation={setpickup} />}

      <TextInput
        style={styles.textInput}
        value={To}
        onChangeText={setToText}
        placeholder="where to ?"
      />
      
      {From && PickUp && !To && <AutocompleteScreen setFromText={setToText} setLocation={setDropof} />}
    </SafeAreaView>
  );
}
export default DestinationSearch;
