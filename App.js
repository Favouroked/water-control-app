import React, {useEffect, useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const deviceId = "3babdce7-7709-4711-8df7-66913afa2702";

const URL = "https://water-level-project.herokuapp.com/device/3babdce7-7709-4711-8df7-66913afa2702";

export default function App() {
    const [waterLevel, setWaterLevel] = useState(0);
    const [status, setStatus] = useState("OFF");

    const fetchWaterLevel = async () => {
        try {
            const response = await fetch(URL);
            const json = await response.json();
            console.log(json);
            const level = json.data.waterLevel;
            const status = json.data.state;
            setWaterLevel(level);
            setStatus(status);
        } catch (error) {
            console.log("error", error);
        }
    };

    const toggleStatus = async () => {
        const newStatus = status === 'OFF' ? 'ON': 'OFF';
        console.log(`New status: ${newStatus}`);
        const options = {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({state: newStatus})
        };
        try {
            const response = await fetch(URL, options);
            const json = await response.json();
            console.log(json);
            const status = json.data.state;
            setStatus(status);
        } catch (error) {
            console.log("error", error);
        }
    };

    useEffect(() => {
        fetchWaterLevel();
    }, []);


    const toggleColor = status === 'OFF' ? 'green' : 'red';
    const toggleText = status === 'OFF' ? 'Turn ON' : 'Turn OFF';
    return (
        <View style={styles.container}>
            <Text style={styles.boldText}>Device ID</Text>
            <Text>{deviceId}</Text>
            <Text style={styles.bigText}>{waterLevel}%</Text>
            <Text style={styles.boldText}>Pumping Status:</Text>
            <Text>{status}</Text>
            <View style={styles.button}>
                <Button
                    onPress={() => toggleStatus()}
                    title={toggleText}
                    color={toggleColor}
                    accessibilityLabel="Switch Button"
                />
            </View>

            <View style={styles.button}>
                <Button
                    onPress={() => fetchWaterLevel()}
                    title="Refresh"
                    color="gray"
                    accessibilityLabel="Refresh Button"
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bigText: {
        fontWeight: 'bold',
        fontSize: 90,
        marginVertical: 50
    },
    boldText: {
        fontWeight: 'bold'
    },
    button: {
        marginVertical: 20
    }

});
