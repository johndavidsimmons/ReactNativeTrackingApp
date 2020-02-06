import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button, 
  TextInput, 
  ScrollView, 
  FlatList } from 'react-native';

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput"

import { ACPCore } from '@adobe/react-native-acpcore';
import { ACPAnalytics } from '@adobe/react-native-acpanalytics';


export default function App() {
  ACPCore.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPCore version: " + version));
  ACPCore.getLogLevel().then(level => console.log("AdobeExperienceSDK: Log Level = " + level));
  ACPAnalytics.extensionVersion().then(version => console.log("AdobeExperienceSDK: ACPAnalytics version: " + version));

  const [courseGoals, setCourseGoals] = useState([]);
  const [isAddMode, setIsAddMode] = useState(false)

  const addGoalHandler = goalTitle => {
    setCourseGoals(currentGoals => [
      ...courseGoals, 
      { id: Math.random().toString(), value: goalTitle}]);
      setIsAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId )
    });
  }

  const cancelGoalAdditionHandler = () => {
    ACPCore.trackAction("cancelAddGoal", {})
    setIsAddMode(false);
  }

  let contextData = {"key1": "some data", "key2": "another data point"}
  ACPCore.trackState("Homepage", contextData);

  return (
    // Main View
    <View style={styles.screen}>
      <Text style={styles.headline}>My Demo App</Text>
      <View style={styles.addButton}>
        <Button title="Add New Goal" onPress={() => {
          let buttonData = {"buttonKey": "buttonValue"}
          ACPCore.trackAction("buttonPress", buttonData)
          setIsAddMode(true)
          }
        } />
      </View>
      {/*input area*/}
      <GoalInput onAddGoal={addGoalHandler} visible={isAddMode} onCancel={cancelGoalAdditionHandler}/>

    {/*List of goals*/}
      <FlatList 
        data={courseGoals} 
        renderItem={itemData => 
        <GoalItem 
          id={itemData.item.id} 
          onDelete={removeGoalHandler} 
          title={itemData.item.value} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  headline: {
    fontSize: 32,
    textAlign: "center"
  },
  addButton: {
    borderWidth: 1,
    marginTop: 10
  }

});
