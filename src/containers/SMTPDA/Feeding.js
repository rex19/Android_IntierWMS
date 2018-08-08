import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native';
import { Picker, List, WhiteSpace, InputItem, TextareaItem, Button, Toast } from 'antd-mobile';
import { PublicParam } from '../../utils/config.js'

const GetFeedingIsSuccessForScanMaterialLocation = PublicParam.FeedingGetFeedingIsSuccessForScanMaterialLocation


const Item = List.Item;

class FeedingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MaterialArea: '',
      COT: '',
    };
  }


  onChange = (key) => (value) => {
    if (key === 'MaterialArea') {
      this.setState({ MaterialArea: value });
    } else if (key === 'COT') {
      this.setState({ COT: value });
    }
  }

  OnBlur = (key) => () => {
    if (key === 'MaterialLocation') {
      console.log('OnBlur', key)
    } else if (key === 'COT') {
      console.log('OnBlur', key)
      this.fetchGetFeedingIsSuccessForScanMaterialLocation()
    }
  }


  fetchGetFeedingIsSuccessForScanMaterialLocation = () => {
    console.log('fetchGetFeedingIsSuccessForScanMaterialLocation', GetFeedingIsSuccessForScanMaterialLocation)
    fetch(`${GetFeedingIsSuccessForScanMaterialLocation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: this.state.MaterialArea,
        COT: this.state.COT,
        OperationType: 1
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetFeedingIsSuccessForScanMaterialLocation', responseJson)
      if (responseJson.Status === 200 && responseJson.Data === 1) {
        Toast.success('COT上料成功', 1);
        this.setState({
          MaterialArea: '',
          COT: '',
        });

      } else {
        Toast.success(responseJson.ErrorMessage || 'COT上料失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetFeedingIsSuccessForScanMaterialLocation:Error:', error)
    }).done();
  }
  render() {
    return (
      <View >
        <List>
          <InputItem
            // focused={this.state.UIDFocused}
            value={this.state.MaterialArea}
            onBlur={this.OnBlur('MaterialArea')}
            onChange={this.onChange('MaterialArea')}
            editable={true}
          ><Text style={styles.span}>机台区域号:</Text></InputItem>
          <InputItem
            value={this.state.COT}
            onBlur={this.OnBlur('COT')}
            // focused={this.state.targetFocused}
            onChange={this.onChange('COT')}
            editable={true}
          ><Text style={styles.span}>扫描COT号:</Text></InputItem>
        </List>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  span: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  quitButton: {
    marginTop: 10
  }
});
export default FeedingComponent
