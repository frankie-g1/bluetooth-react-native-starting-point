import {BleManager} from 'react-native-ble-plx';
import React, {Component} from 'react'
import {Text, PermissionsAndroid} from 'react-native'

class BManager extends Component {

    constructor(){
        super();
        this.manager = new BleManager();
        
    }

    


    componentWillMount() {
        const subscription = this.manager.onStateChange((state) => {
            if (state === 'PoweredOn') {
                console.log("powered on")

                this.scanAndConnect();
                subscription.remove();
            }
            else{
                console.log(state)
            }
        }, true);
    }


    scanAndConnect() {

        this.manager.startDeviceScan(null, null, (error, device) => {
            if (error) {
                console.log("error") // stops here so far
                                        // [BleError: Cannot start scanning operation]
                console.log(error)
                // Handle error (scanning will be stopped automatically)
                return
            }
    
            // Check if it is a device you are looking for based on advertisement data
            // or other criteria.
            if (device.name === 'JLab GO Air') {

                    console.log(device.name)
                
                // Stop scanning as it's not necessary if you are scanning for one device.
                this.manager.stopDeviceScan();
    
                // Proceed with connection.
            }
            device.connect()
            .then((device) => {
                console.log(device)
                return device.discoverAllServicesAndCharacteristics()
            })
            .then((device) => {
            // Do work on device with services and characteristics
            })
            .catch((error) => {
                console.log("error")
                console.log(error)
                // Handle errors
            });
        });
    }
    

    render(){

        return(
            <Text>BLE MANAGER </Text>
        )
    }



}

export default BManager;