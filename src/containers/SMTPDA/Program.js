
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

const GetLocationAndAreaForScanMaterialLocation = PublicParam.ProgramGetLocationAndAreaForScanMaterialLocation
const GetLocationAndAreaForScanMaterialUID = PublicParam.ProgramGetLocationAndAreaForScanMaterialUID
const GetNextLocationAndAreaForScanMaterial = PublicParam.ProgramGetNextLocationAndAreaForScanMaterial

const Item = List.Item;

class ProgramComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    } else if (key === 'MaterialUID') {
      this.setState({ MaterialUID: value });
    }
  }

  OnBlur = (key) => () => {
    if (key === 'MaterialArea') {
      console.log('OnBlur', key)
      this.fetchGetLocationAndAreaForScanMaterialLocation(this.state.MaterialArea)
    } else if (key === 'MaterialUID') {
      console.log('OnBlur', key)
      this.fetchGetLocationAndAreaForScanMaterialUID()
    }
  }

  fetchGetLocationAndAreaForScanMaterialLocation = (param = '1') => {
    console.log('fetchGetLocationAndAreaForScanMaterialLocation', param, GetLocationAndAreaForScanMaterialLocation)
    fetch(`${GetLocationAndAreaForScanMaterialLocation}`, {
      // fetch('http://192.168.1.252/SETUP/api/Setup/GetLocationAndAreaForScanMaterialLocation', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: param
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetLocationAndAreaForScanMaterialLocation', responseJson)
      this.setState({
        MaterialLocation: responseJson.Data.MaterialLocation,
        MaterialNumber: responseJson.Data.MaterialNumber,
      })
    }).catch((error) => {
      console.log('fetchGetLocationAndAreaForScanMaterialLocationError::', error)
    }).done();
  }
  fetchGetLocationAndAreaForScanMaterialUID = () => {
    console.log('fetchGetLocationAndAreaForScanMaterialUID', GetLocationAndAreaForScanMaterialUID)
    fetch(`${GetLocationAndAreaForScanMaterialUID}`, {
      // fetch('http://192.168.1.252/SETUP/api/Setup/GetLocationAndAreaForScanMaterialLocation', {
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
      console.log('fetchGetLocationAndAreaForScanMaterialUID', responseJson)
      if (responseJson.Status === 200) {
        this.setState({
          MaterialLocation: responseJson.Data.MaterialLocation,
          MaterialNumber: responseJson.Data.MaterialNumber,
        })
        Toast.success('扫描物料UID成功', 1);
      } else {
        Toast.success(responseJson.ErrorMessage || '扫描物料UID失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetLocationAndAreaForScanMaterialUIDError::', error)
    }).done();
  }

  fetchGetNextLocationAndAreaForScanMaterial = () => {
    console.log('fetchGetNextLocationAndAreaForScanMaterial', GetNextLocationAndAreaForScanMaterial)
    fetch(`${GetNextLocationAndAreaForScanMaterial}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        MaterialArea: this.state.MaterialArea,
        MaterialLocation: this.state.MaterialLocation
      })
    }).then((response) => {
      return response.json();
    }).then((responseJson) => {
      console.log('fetchGetNextLocationAndAreaForScanMaterial', responseJson)
      if (responseJson.Status === 200) {
        this.setState({
          MaterialLocation: responseJson.Data.MaterialLocation,
          MaterialNumber: responseJson.Data.MaterialNumber,
          MaterialUID: ''
        })
        Toast.success('扫描物料UID成功', 1);
      } else {
        Toast.success(responseJson.ErrorMessage || '扫描物料UID失败', 1);
      }
    }).catch((error) => {
      console.log('fetchGetNextLocationAndAreaForScanMaterialError::', error)
    }).done();
  }

  handleNextActivation = () => {
    console.log('handleNextActivation')
    this.fetchGetNextLocationAndAreaForScanMaterial()
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
            editable={false}
          ><Text style={styles.span}>料道:</Text></InputItem>
          <InputItem
            value={this.state.MaterialNumber}
            editable={false}
          ><Text style={styles.span}>料号:</Text></InputItem>
          <InputItem
            value={this.state.MaterialUID}
            onBlur={this.OnBlur('MaterialUID')}
            // focused={this.state.targetFocused}
            onChange={this.onChange('MaterialUID')}
            editable={true}
          ><Text style={styles.span}>物料UID:</Text></InputItem>
        </List>
        <Button type='primary' style={styles.quitButton}
          onClick={() => this.handleNextActivation()}
        >下一个</Button>
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


export default ProgramComponent
