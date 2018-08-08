import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableHighlight
} from 'react-native';
import { NavigationActions } from 'react-navigation';
// import { connect } from 'react-redux'; // 引入connect函数
import { Card, WingBlank, WhiteSpace, Button, Picker, List, Grid, Toast, Flex } from 'antd-mobile';
// import test1 from '../../img/test1.jpg';
// import test2 from '../../img/test2.jpg';
// let test1 = '../../img/test1.jpg'
// let test2 = '../../img/test2.jpg' 
const Item = List.Item;
const Brief = Item.Brief;


const navigateActionToSetupComponent = NavigationActions.navigate({
  routeName: 'SetupComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'SetupComponent' })
})
const navigateActionToProgramComponent = NavigationActions.navigate({
  routeName: 'ProgramComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'ProgramComponent' })
})
const navigateActionToScanMaterialLocationComponent = NavigationActions.navigate({
  routeName: 'ScanMaterialLocationComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'ScanMaterialLocationComponent' })
})
const navigateActionToFeedingComponent = NavigationActions.navigate({
  routeName: 'FeedingComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'FeedingComponent' })
})
const navigateActionToReceiveMaterialComponent = NavigationActions.navigate({
  routeName: 'ReceiveMaterialComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'ReceiveMaterialComponent' })
})
const navigateActionToNewOldFeedingComponent = NavigationActions.navigate({
  routeName: 'NewOldFeedingComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'NewOldFeedingComponent' })
})
const navigateActionToUnloadMaterialComponent = NavigationActions.navigate({
  routeName: 'UnloadMaterialComponent',
  params: {},
  action: NavigationActions.navigate({ routeName: 'UnloadMaterialComponent' })
})
// const backAction = NavigationActions.back({
//   key: ''
// })
const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'Main' }),
  ]
})
const MiddleMenu = (props) => {



  const quit = () => {
    console.log('quit', props.navigation.state.params.key)
    // this.props.navigation.goBack();
    props.navigation.dispatch(resetAction)
    // this.props.navigation.dispatch(NavigationActions.back({
    //   key: this.props.navigation.state.params.key
    // }))
  }

  const handleClick = (params) => () => {

    console.log('handleClick', params)
    switch (params) {
      case 'SetupComponent':
        props.navigation.dispatch(navigateActionToSetupComponent)
        break;
      case 'ProgramComponent':
        props.navigation.dispatch(navigateActionToProgramComponent)
        break;
      case 'ScanMaterialLocationComponent':
        props.navigation.dispatch(navigateActionToScanMaterialLocationComponent)
        break;
      case 'FeedingComponent':
        props.navigation.dispatch(navigateActionToFeedingComponent)
        break;
      case 'ReceiveMaterialComponent':
        props.navigation.dispatch(navigateActionToReceiveMaterialComponent)
        break;
      case 'NewOldFeedingComponent':
        props.navigation.dispatch(navigateActionToNewOldFeedingComponent)
        break;
      case 'UnloadMaterialComponent':
        props.navigation.dispatch(navigateActionToUnloadMaterialComponent)
        break;
    }
  }


  return (
    <View >
      <WingBlank size="lg">
        <WhiteSpace size="lg" />
        <View style={styles.Accordion}>
          <ScrollView
            style={{ flex: 1, backgroundColor: '#f5f5f9' }}
            automaticallyAdjustContentInsets={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >

            <List renderHeader={() => '菜单'} className="my-list">
              <WhiteSpace size="sm" />
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('SetupComponent')}
              >
                Setup扫料
          </Item>
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('ProgramComponent')}
              >
                Program扫料
          </Item>
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('ScanMaterialLocationComponent')}
              >
                扫料道扫料
        </Item>
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('FeedingComponent')}
              >
                COT上料
        </Item>
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('ReceiveMaterialComponent')}
              >
                接料
      </Item>
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('NewOldFeedingComponent')}
              >
                新旧料盘接料
      </Item>
              <Item
                arrow="horizontal"
                multipleLine
                onClick={handleClick('UnloadMaterialComponent')}
              >
                卸料
    </Item>
              <WhiteSpace size="lg" />
            </List>

          </ScrollView>
          <WingBlank >
            <Button type='ghost' style={styles.quitButton}
              onClick={() => quit()}
            >退出登陆</Button>
          </WingBlank>
        </View>
      </WingBlank>
    </View>
  )
}

export default MiddleMenu

const styles = StyleSheet.create({
  subTitle: {
    marginBottom: 10,
    fontSize: 20,
    // padding: '30px 0 18px 0'
  },
  Accordion: {
    marginTop: 10,
    marginBottom: 10,
    height: 390,
    width: '100%',
    // overflow:'scroll',
    // backgroundColor: 'red'
  },
  viewClass: {
    width: '100%',
    height: 140,
    //color: '#e6e6e6',
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: '#0090e5',
    borderColor: '#0090e5',
  },
  textClass: {
    //backgroundColor: '#3783F1',
    color: '#FBFDFF',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: '30%',
    fontSize: 20,
  },
  quitButton: {
    marginTop: 20
  },
  menuView: {
    borderRadius: 160 / 0.03,
    backgroundColor: '#1B87ED',
    width: 160,
    height: 160 * 0.8,
    margin: 5,
  }
});




// <Item
// arrow="horizontal"
// // thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
// multipleLine
// onClick={this.handleClick('Inventory')}
// >
// 盘点 <Brief>点我点我</Brief>
// </Item>
// <WhiteSpace size="lg" />