import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Login from './login/index'
import MiddleMenu from './middleMenu/index'
import SetupComponent from './SMTPDA/Setup'
import ProgramComponent from './SMTPDA/Program'
import ScanMaterialLocationComponent from './SMTPDA/ScanMaterialLocation'
import FeedingComponent from './SMTPDA/Feeding'
import ReceiveMaterialComponent from './SMTPDA/ReceiveMaterial'
import NewOldFeedingComponent from './SMTPDA/NewOldFeeding'
import UnloadMaterialComponent from './SMTPDA/UnloadMaterial'
// import MoveStorehouse from './moveStorehouse/index'
// import Inventory from './inventory/index'
// import PrepareMaterials from './prepareMaterials/index'


class Main extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Login navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f8f8f8',
  },
});

const App = StackNavigator({
  Main: {
    screen: Main,
  },
  Login: {
    screen: Login,
  },
  MiddleMenu: {
    screen: MiddleMenu,
    navigationOptions: ({ navigation }) => ({
      title: '菜单',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  SetupComponent: {
    screen: SetupComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Setup扫料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  ProgramComponent: {
    screen: ProgramComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'Program扫料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  ScanMaterialLocationComponent: {
    screen: ScanMaterialLocationComponent,
    navigationOptions: ({ navigation }) => ({
      title: '扫料道扫料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  FeedingComponent: {
    screen: FeedingComponent,
    navigationOptions: ({ navigation }) => ({
      title: 'COT上料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  ReceiveMaterialComponent: {
    screen: ReceiveMaterialComponent,
    navigationOptions: ({ navigation }) => ({
      title: '接料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  NewOldFeedingComponent: {
    screen: NewOldFeedingComponent,
    navigationOptions: ({ navigation }) => ({
      title: '新旧料盘接料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
  UnloadMaterialComponent: {
    screen: UnloadMaterialComponent,
    navigationOptions: ({ navigation }) => ({
      title: '卸料',
      headerTitleStyle: {
        alignSelf: 'center'
      }
    }),
  },
}, {
    // {
    animationEnabled: false, // 切换页面时是否有动画效果
    // tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: false, // 是否可以左右滑动切换tab
    backBehavior: 'none', // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
  });

export default App

// navigationOptions: ({ navigation }) => ({
//   title: navigation.state.params.name,
//   headerTitleStyle: {
//     alignSelf: 'center'
//   }
// }),





// export default class App extends Component {
//   render() {
//     return (
//       <View >
//         <Text >
//           Welcome to React Native!
//         </Text>
//       </View>
//     );
//   }
// }