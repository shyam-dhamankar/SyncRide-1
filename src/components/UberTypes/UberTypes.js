import { FlatList ,View,Pressable,Text, Touchable} from "react-native";
import UberType from "../UberType/ubertype";
import { types } from "../../assets/data/types";
import Fontisto from '@expo/vector-icons/Fontisto'; 
const UberTypes = () => {
   function handelPress ()
  {
   console.warn('hadel')
  }
  return (
    <View>
      <FlatList
        data={types}
        renderItem={({ item }) => <UberType typep={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
      <Pressable 
      onPress={handelPress} 
      style={{flexDirection:'row',alignItems:'center'}}
      >
        <Text style={{backgroundColor:'black',color:'white',
          padding:15,margin:10,
          textAlign:'center',
        width:'80%'
        }}>
          Confirm Ride
        </Text>
        <Fontisto name="taxi" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default UberTypes;
