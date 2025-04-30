/* eslint-disable react/jsx-props-no-spreading */
import React, { JSX} from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, LayoutProps} from '@ui-kitten/components';
import {styles} from './AppLayout.styles';

type Props = LayoutProps & {
    children?: React.ReactNode;
};

export const AppLayout = (props: Props): JSX.Element => {
    const {children, style, ...other} = props;

    return (
        <SafeAreaView style={styles.container}>
            <Layout style={[styles.layout, style]} {...other}>
                {children}
            </Layout>
        </SafeAreaView>
    );
};
