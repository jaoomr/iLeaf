import {createAppContainer} from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack'
import HabitosPage from './src/pages/HabitosPage';
import LoginPage from './src/pages/LoginPage';

const AppNavigator = createStackNavigator({
  'Login':{
    screen: LoginPage,
    navigationOptions:{
      header:null
    }
    },
  'Habitos':{
    screen: HabitosPage,
    navigationOptions:{
      title: 'Hábitos',
      headerTitleStyle: {
        textAlign: 'center',
        fontSize: 20,
      }
    }
    }
  },
  {
    defaultNavigationOptions:{
      title: 'MyHabitTimeline',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#6542f4',
        borderBottomColor: '#f4f2ff',
      },
      headerTitleStyle: {
        color: 'white',
        fontSize: 20,
        flexGrow: 1,
        textAlign: 'center',
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;