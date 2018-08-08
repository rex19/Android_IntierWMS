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

const GetMaterialNumberForScanMaterialLocation = PublicParam.ScanMaterialLocationGetMaterialNumberForScanMaterialLocation
const GetIsProblemForScanMaterialLocation = PublicParam.ScanMaterialLocationGetIsProblemForScanMaterialLocation


const Item = List.Item;

class ScanMaterialLocationComponent extends Component {
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
      this.fetchGetMaterialNumberForScanMaterialLocation()
      this.setState({ MaterialUIDFocused: true, MaterialLocationFocused: false });
    } else if (key === 'MaterialUID') {
      this.fetchGetIsProblemForScanMaterialLocation()
      this.setState({ MaterialUIDFocused: false });
    }
  }

  fetchGetMaterialNumberForScanMaterialLocation = () => {
    console.log('fetchGetMaterialNumberForScanMaterialLocation', GetMaterialNumberForScanMaterialLocation)
    fetch(`${GetMaterialNumberForScanMaterialLocation}`, {
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
      console.log('fetchGetMaterialNumberForScanMaterialLocation', responseJson)
      if (responseJson.Status === 200) {
        this.setState({
          MaterialNumber: responseJson.Data.MaterialNumber,
        })
      } else {
        Toast.success(responseJson.ErrorMessage || '获取料号失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetMaterialNumberForScanMaterialLocationError::', error)
    }).done();
  }

  fetchGetIsProblemForScanMaterialLocation = () => {
    console.log('fetchGetIsProblemForScanMaterialLocation', GetIsProblemForScanMaterialLocation)
    fetch(`${GetIsProblemForScanMaterialLocation}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: this.state.MaterialArea,
        MaterialLocation: this.state.MaterialLocation,
        MaterialUID: this.state.MaterialUID
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetIsProblemForScanMaterialLocation', responseJson)
      if (responseJson.Data === 1) {//如果返回结果==1 则把下面料道 料号 物料UID清空，焦点回到料道
        this.setState({
          MaterialUIDFocused: false,
          MaterialLocationFocused: true,
          MaterialUID: '',
          MaterialLocation: '',
          MaterialNumber: '',
        });
      } else {
        console.log('返回结果不等于1')
        Toast.success(responseJson.ErrorMessage || '物料uid失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetIsProblemForScanMaterialLocation:Error:', error)
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
export default ScanMaterialLocationComponent
