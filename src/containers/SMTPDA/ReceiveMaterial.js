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

const GetMterialNumberForScanMaterialLocation = PublicParam.ReceiveMaterialGetMterialNumberForScanMaterialLocation
const GetMaterialIsProblemForScanMaterialLocation = PublicParam.ReceiveMaterialGetMaterialIsProblemForScanMaterialLocation


const Item = List.Item;

class ReceiveMaterialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MaterialLocationFocused: false,
      MaterialUIDFocused: false,
      MaterialArea: '',
      MaterialUID: '',
      MaterialLocation: '',
      MaterialNumber: ''
    };
  }


  onChange = (key) => (value) => {
    console.log('onChange', key, value)
    if (key === 'MaterialArea') {
      this.setState({ MaterialArea: value });
    } else if (key === 'MaterialLocation') {
      this.setState({ MaterialLocation: value });
    } else if (key === 'MaterialUID') {
      this.setState({ MaterialUID: value });
    }
  }

  OnBlur = (key) => () => {
    if (key === 'MaterialArea') {
      this.setState({ MaterialLocationFocused: true });
    } else if (key === 'MaterialLocation') {
      console.log('OnBlur', key)

      this.fetchGetMterialNumberForScanMaterialLocation()
    } else if (key === 'MaterialUID') {
      console.log('OnBlur', key)
      this.fetchGetMaterialIsProblemForScanMaterialLocation()
    }
  }

  fetchGetMterialNumberForScanMaterialLocation = () => {
    console.log('fetchGetMterialNumberForScanMaterialLocation', GetMterialNumberForScanMaterialLocation)
    fetch(`${GetMterialNumberForScanMaterialLocation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: this.state.MaterialArea,
        MaterialLocation: this.state.MaterialLocation,
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetMterialNumberForScanMaterialLocation', responseJson)
      if (responseJson.Status === 200) {
        this.setState({
          MaterialNumber: responseJson.Data.MaterialNumber,
          MaterialLocationFocused: false,
          MaterialUIDFocused: true
        })
      } else {
        Toast.success(responseJson.ErrorMessage || '(responseJson.Status !== 200', 1);
      }
    }).catch((error) => {
      console.log('fetchGetMterialNumberForScanMaterialLocationError::', error)
    }).done();
  }

  fetchGetMaterialIsProblemForScanMaterialLocation = () => {
    console.log('fetchGetMaterialIsProblemForScanMaterialLocation', GetMaterialIsProblemForScanMaterialLocation)
    fetch(`${GetMaterialIsProblemForScanMaterialLocation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: this.state.MaterialArea,
        MaterialLocation: this.state.MaterialLocation,
        MaterialUID: this.state.MaterialUID,
        OperationType: 1
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetMaterialIsProblemForScanMaterialLocation', responseJson)
      if (responseJson.Status === 200 && responseJson.Data === 1) {
        this.setState({
          MaterialUIDFocused: false,
          MaterialLocationFocused: true,
          MaterialUID: '',
          MaterialLocation: '',
          MaterialNumber: ''
        })
        Toast.success('扫描物料UID成功', 1);
      } else {
        Toast.success(responseJson.ErrorMessage || '扫描物料UID失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetMaterialIsProblemForScanMaterialLocation:Error:', error)
    }).done();
  }
  render() {
    return (
      <View >
        <List>
          <InputItem
            // focused={this.state.UIDFocused}
            value={this.state.MaterialArea}
            onChange={this.onChange('MaterialArea')}
            editable={true}
          ><Text style={styles.span}>机台区域号:</Text></InputItem>
          <InputItem
            value={this.state.MaterialLocation}
            focused={this.state.MaterialLocationFocused}
            onBlur={this.OnBlur('MaterialLocation')}
            onChange={this.onChange('MaterialLocation')}
            editable={true}
          ><Text style={styles.span}>料道:</Text></InputItem>
          <InputItem
            value={this.state.MaterialNumber}
            editable={false}
          ><Text style={styles.span}>料号:</Text></InputItem>
          <InputItem
            value={this.state.MaterialUID}
            onBlur={this.OnBlur('MaterialUID')}
            focused={this.state.MaterialUIDFocused}
            onChange={this.onChange('MaterialUID')}
            editable={true}
          ><Text style={styles.span}>物料UID:</Text></InputItem>
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
export default ReceiveMaterialComponent
