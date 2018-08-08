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

const GetMaterialNumberForScanLocation = PublicParam.UnloadMaterialGetMaterialNumberForScanLocation
const GetIsProblemForScanUID = PublicParam.UnloadMaterialGetIsProblemForScanUID

const Item = List.Item;

class UnloadMaterialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      MaterialArea: '',
      MaterialUID: '',
      MaterialLocation: '',
      MaterialNumber: '',

      MaterialLocationFocused: false,
      MaterialUIDFocused: false

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
      this.setState({ MaterialLocationFocused: true, MaterialUIDFocused: false });
    } else if (key === 'MaterialLocation') {
      console.log('OnBlur', key)
      this.fetchGetMaterialNumberForScanLocation()
    } else if (key === 'MaterialUID') {
      console.log('OnBlur', key)
      this.fetchGetIsProblemForScanUID()
    }
  }
  onFocus = (key) => () => {
    if (key === 'MaterialUID') {
      console.log('MaterialUID-onFocus', )
      // this.setState({ MaterialLocationFocused: true, MaterialUIDFocused: false });
      // window.document.getElementsByClassName('input1').length;
    }
  }

  fetchGetMaterialNumberForScanLocation = () => {
    console.log('fetchGetMaterialNumberForScanLocation', GetMaterialNumberForScanLocation)
    fetch(`${GetMaterialNumberForScanLocation}`, {
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
      console.log('fetchGetMaterialNumberForScanLocation', responseJson)
      if (responseJson.Status === 200) {
        this.setState({
          MaterialNumber: responseJson.Data.MaterialNumber,
          MaterialLocationFocused: false,
          MaterialUIDFocused: true
        })
      } else {
        Toast.success(responseJson.ErrorMessage, 1);
      }
    }).catch((error) => {
      console.log('fetchGetMaterialNumberForScanLocationError::', error)
    }).done();
  }

  fetchGetIsProblemForScanUID = () => {
    console.log('fetchGetIsProblemForScanUID', GetIsProblemForScanUID)
    fetch(`${GetIsProblemForScanUID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: this.state.MaterialArea,
        MaterialLocation: this.state.MaterialLocation,
        OldMaterialUID: this.state.MaterialUID,
        OperationType: 4
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetIsProblemForScanUID', responseJson)
      if (responseJson.Status === 200 && responseJson.Data === 1) {
        Toast.success(responseJson.ErrorMessage || '卸料成功', 1);

        this.setState({ MaterialUIDFocused: true });
      } else {
        Toast.success(responseJson.ErrorMessage || '卸料失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetIsProblemForScanUID:Error:', error)
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
            onBlur={this.OnBlur('MaterialArea')}
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
            onFocus={this.onFocus('MaterialUID')}
            className='input1'
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
export default UnloadMaterialComponent
