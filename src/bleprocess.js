import React, {useEffect} from 'react'


const bleprocess = ({manager}) => {

        useEffect(() => {
            const subscription = manager.onStateChange((state) => {
                if (state === 'PoweredOn') {
                    this.scanAndConnect();
                    subscription.remove();
                }
            }, true);
            return () => subscription.remove();
        }, [manager]);


        const scanAndConnect = () => {
            manager.startDeviceScan(null, null, (error, device) => {
                if (error) {
                    // Handle error (scanning will be stopped automatically)
                    return
                }
        
                // Check if it is a device you are looking for based on advertisement data
                // or other criteria.
                if (device.name === 'JLab Air Pro' || 
                    device.name === 'SensorTag') {
                    
                    // Stop scanning as it's not necessary if you are scanning for one device.
                    manager.stopDeviceScan();
        
                    // Proceed with connection.
                }
            });
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
        // Handle errors
    });


        return (
            <div>bleprocess</div>
        )
        

            
}


// export default bleprocess; this is a functional version of blemanager



