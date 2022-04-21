import { View, Text } from 'react-native';
import React, { useState } from 'react';
import AddItemPage from './AddItemPage'
import EditProfile from './EditProfile';
import { SafeAreaView } from 'react-native-safe-area-context';

const CompanyAddItemPage = () => {
  const [edit, setEdit] = useState(false)

  return (
    <View style={{backgroundColor:"#faf5e8", height:"100%"}}>
    <SafeAreaView>
       { edit? <EditProfile edit={edit} setEdit={setEdit} />: <AddItemPage edit={edit} setEdit={setEdit}/>}
    </SafeAreaView>
    </View>

  );
};

export default CompanyAddItemPage;
