/* eslint-disable react/jsx-props-no-spreading */
import React, { JSX} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Layout, LayoutProps, useTheme} from '@ui-kitten/components';
import {styles} from './AppLayout.styles';

type Props = LayoutProps & {
    children?: React.ReactNode;
};

export const AppLayout = (props: Props): JSX.Element => {
    const {children, style, ...other} = props;

    const theme = useTheme();
    const backgroundColor = theme['background-basic-color-2'];


    return (
        <SafeAreaView style={[styles.container, {backgroundColor}]}>
            <Layout style={[styles.layout, style]} {...other}>
                {children}
            </Layout>
        </SafeAreaView>
    );
};
