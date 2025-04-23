import {Text} from 'react-native-gesture-handler';
import {JSX} from "react";
import {AppLayout} from "@br/weather/core/components";

const SettingsScreen = (): JSX.Element => {
    return (
        <AppLayout>
            <Text accessibilityRole="summary">Settings!</Text>
        </AppLayout>
    );
};

export default SettingsScreen;
