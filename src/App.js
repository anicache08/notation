import React, { Component } from 'react';
import {
  createNavigator,
  createDrawerNavigator,
  SwitchRouter,
  SceneView
} from "@react-navigation/core";
import {
  createBrowserApp,
  Link
} from "@react-navigation/web";

import {createStore} from 'redux';
import {Provider} from 'react-redux';

import First from "./pages/FirstOperand/";
import Second from "./pages/SecondOperand/";
import Result from "./pages/Result/";

const initialState = {
   first: '',
   second: ''
}

const reducer = (state=initialState, action) => 
{

  switch(action.type)
  {   
      case 'FIRST':
        return { ...state, first: action.payload.first }
        break;
      case 'SECOND':
        return { ...state, second: action.payload.second }
        break;
  }

  return state;
}

const store = createStore(reducer);


First.path = "";
First.navigationOptions = {
  title: "First Operand",
  linkName: "Operand"
};

Second.path = "second";
Second.navigationOptions = {
  title: "Second Operand",
  linkName: "Operand"
};

Result.path = "result";
Result.navigationOptions = {
  title: "Result Operand",
  linkName: "Operand"
};

class AppView extends React.Component {
  render() {
    const { descriptors, navigation } = this.props;
    const activeKey = navigation.state.routes[navigation.state.index].key;
    const descriptor = descriptors[activeKey];
    
    return (
      <Provider store={store}>
        <SceneView
          component={descriptor.getComponent()}
          navigation={descriptor.navigation} />
      </Provider>
    );
  }
}

const AppNavigator = createNavigator(
  AppView,
  SwitchRouter({
    First,
    Second,
    Result
  }),
  {}
);

const App = createBrowserApp(AppNavigator);

export default App;