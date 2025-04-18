import {Text} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {JSX} from "react";

const SettingsScreen = (): JSX.Element => {
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text accessibilityRole="summary">Settings!</Text>
        </SafeAreaView>
    );
};

export default SettingsScreen;
