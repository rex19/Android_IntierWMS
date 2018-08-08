


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

const GetOldMaterialForScanUID = PublicParam.NewOldFeedingGetOldMaterialForScanUID
const GetIsSuccessForScanUID = PublicParam.NewOldFeedingGetIsSuccessForScanUID


const Item = List.Item;

class NewOldFeedingComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      OldMaterialUID: '',
      NewMaterialUID: '',
      MaterialArea: '',
      MaterialLocation: '',
      MaterialNumber: '',
      OldMaterialUIDFocused: true,
      NewMaterialUIDFocused: false
    };
  }


  onChange = (key) => (value) => {
    if (key === 'OldMaterialUID') {
      this.setState({ OldMaterialUID: value });
    } else if (key === 'NewMaterialUID') {
      this.setState({ NewMaterialUID: value });
    }
  }

  OnBlur = (key) => () => {
    if (key === 'OldMaterialUID') {
      console.log('OnBlur', key)
      this.fetchGetOldMaterialForScanUID()
    } else if (key === 'NewMaterialUID') {
      console.log('OnBlur', key)
      this.fetchGetIsSuccessForScanUID()
    }
  }

  fetchGetOldMaterialForScanUID = () => {
    console.log('fetchGetOldMaterialForScanUID', GetOldMaterialForScanUID)
    fetch(`${GetOldMaterialForScanUID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        OldMaterialUID: this.state.OldMaterialUID,
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetOldMaterialForScanUID', responseJson)
      this.setState({
        // MaterialNumber: responseJson.Data.MaterialNumber,
        MaterialArea: responseJson.Data.MaterialArea,
        MaterialLocation: responseJson.Data.MaterialLocation,
        MaterialNumber: responseJson.Data.MaterialNumber,
        OldMaterialUIDFocused: false,
        NewMaterialUIDFocused: true
      })
    }).catch((error) => {
      console.log('fetchGetOldMaterialForScanUIDError::', error)
    }).done();
  }

  fetchGetIsSuccessForScanUID = () => {
    console.log('fetchGetIsSuccessForScanUID', GetIsSuccessForScanUID)
    fetch(`${GetIsSuccessForScanUID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        NewMaterialUID: this.state.NewMaterialUID,
        MaterialArea: this.state.MaterialArea,
        MaterialLocation: this.state.MaterialLocation,
        OperationType: 1
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetIsSuccessForScanUID', responseJson)
      if (responseJson.Status === 200 && responseJson.Data === 1) {
        this.setState({
          OldMaterialUID: '',
          NewMaterialUID: '',
          MaterialArea: '',
          MaterialLocation: '',
          MaterialNumber: '',
          OldMaterialUIDFocused: true,
          NewMaterialUIDFocused: false
        })
        Toast.success('扫描新料盘物料UID', 1);
      } else {
        Toast.success(responseJson.ErrorMessage || '扫描新料盘物料UID失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetIsSuccessForScanUID:Error:', error)
    }).done();
  }
  render() {
    return (
      <View >
        <List>
          <InputItem
            value={this.state.OldMaterialUID}
            focused={this.state.OldMaterialUIDFocused}
            onChange={this.onChange('OldMaterialUID')}
            onBlur={this.OnBlur('OldMaterialUID')}
            editable={true}
          ><Text style={styles.span}>旧料盘物料UID:</Text></InputItem>
          <InputItem
            value={this.state.MaterialArea}
            editable={false}
          ><Text style={styles.span}>区域:</Text></InputItem>
          <InputItem
            value={this.state.MaterialLocation}
            editable={false}
          ><Text style={styles.span}>料道:</Text></InputItem>
          <InputItem
            value={this.state.MaterialNumber}
            editable={false}
          ><Text style={styles.span}>料号:</Text></InputItem>
          <InputItem
            value={this.state.NewMaterialUID}
            onBlur={this.OnBlur('NewMaterialUID')}
            focused={this.state.NewMaterialUIDFocused}
            onChange={this.onChange('NewMaterialUID')}
            editable={true}
          ><Text style={styles.span}>新料盘物料UID:</Text></InputItem>
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
export default NewOldFeedingComponent
