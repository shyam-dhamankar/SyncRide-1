import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import { styles } from './style'
import Ionicons from '@expo/vector-icons/Ionicons';

const CovidMassage = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HAPPY HOLI</Text>
      <Text style={styles.text} >If you are a beginner that wants to learn javascript and react native or an advanced javascript developer that wants to get into mobile development using react native then this Livestream is for you. This is a perfect opportunity to follow along and build this application together with us, and add it to your portfolio as it will help you land your next job. If you finish the app, tag me on social media and I will give you feedback.
      </Text>
      <View>
      <Text style={styles.learnmore}>learn More
      <Ionicons name="arrow-forward" size={24} color="black" />
      </Text>
      </View>
    </View>
  )
}

export default CovidMassage