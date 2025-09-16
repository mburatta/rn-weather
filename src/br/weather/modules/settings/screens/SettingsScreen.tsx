import {JSX} from "react";

import {AppLayout} from "@br/weather/core/components";

import {DarkMode} from '@br/weather/settings/components';

const SettingsScreen = (): JSX.Element => {
    return (
        <AppLayout>
            <DarkMode />
        </AppLayout>
    );
};

export default SettingsScreen;
