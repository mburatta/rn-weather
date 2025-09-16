import {useModeContext} from "@br/weather/core/contexts";
import {ListItem, Toggle, Icon, Text} from '@br/weather/core/components';
import {JSX, memo, useCallback, useMemo, useState} from 'react';
import {InteractionManager} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../Store.ts';

export const DarkMode = memo((): JSX.Element => {

    const mode = useSelector((state: RootState) => state.settings.mode);

    const {
        settings: {setMode},
    } = useDispatch<AppDispatch>();

    const [localChecked, setLocalChecked] = useState(mode === 'dark');
    const [isSwitching, setIsSwitching] = useState(false);


    const checked = useMemo(() => localChecked, [localChecked]);

    const onToggleChange = useCallback((isChecked: boolean) => {

        setLocalChecked(isChecked);
        setIsSwitching(true);

        InteractionManager.runAfterInteractions(() => {
            requestAnimationFrame(() => {
                setMode(isChecked ? 'dark' : 'light');
                setTimeout(() => setIsSwitching(false), 50);
            });
        });
    }, [setMode]);



    const AccessoryLeft = useCallback(() => <Icon name='theme-light-dark' />, []);
    const AccessoryRight = useCallback(() => (
        <Toggle
            checked={checked}
            onChange={onToggleChange}
            disabled={isSwitching}
            accessibilityRole="switch"
            accessibilityLabel="Dark/Light mode toggle"
            accessibilityState={{ checked, disabled: isSwitching }}

        />
    ), [checked, onToggleChange, isSwitching]);


    return (
        <>
            <ListItem
                title="Dark Mode"
                description="Toggle between Dark/Light mode"
                accessoryLeft={AccessoryLeft}
                accessoryRight={AccessoryRight}
            />
        </>

    )
});
