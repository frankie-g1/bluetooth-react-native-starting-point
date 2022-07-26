import {BleManager} from 'react-native-ble-plx';
import React, {Component} from 'react'
import {Text, PermissionsAndroid, Button} from 'react-native'




const requestBluetoothPermission = async (props) =>{

    console.log(props)
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            {
                title:"Coolio Bluetooth Permission Request",
                message: "GIVE US BEEGLETOOTH NOW",
                buttonNeutral: "Ask me later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if(granted == PermissionsAndroid.RESULTS.GRANTED){
            console.log("You can use the bluetooth")
        } else {
            console.log("Bluetooth permission denied")
        }
    } catch(err){
        console.warn(err)
    }
}





class BManager extends Component {

    constructor(){
        super();
        this.manager = new BleManager();
        
    }

    // componentWillMount is legacy, for any listeners on state change use componentDidMount. sourced here : https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html
    componentDidMount() {
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
            // To avoid bluetooth access errors, use the permissions API

            if (error) {
                console.log("error") // stops here so far
                                        // [BleError: Cannot start scanning operation]
                console.log(JSON.stringify(error))
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
            <>
            <Text>BLE MANAGER </Text>
            <Button title="request bluetooth" onPress={requestBluetoothPermission} />
            </>
        )
    }



}

export default BManager;