
import React, {JSX} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {styles} from './Loading.styles';

interface Props {
    backgroundColor?: string;
}

export const Loading = (props: Props): JSX.Element => {
    const {backgroundColor} = props;
    return (
        <View style={[styles.default, {backgroundColor}]}>
            <ActivityIndicator size='large' />
        </View>
    );
};
