import {StyleSheet, TextStyle, ViewStyle} from 'react-native';
import theme from '@br/weather/assets/jsons/br-weather-theme.json';
import {DotStyle} from 'react-native-reanimated-carousel/lib/typescript/components/Pagination/Basic/PaginationItem';

export type ThemedStyles = {
    noDataLayout: ViewStyle;
    paginationContainer: TextStyle;
    dot: DotStyle;
    activeDot: DotStyle;
};

const themedStyles = StyleSheet.create<ThemedStyles>({
    noDataLayout: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    dot: {
        width: 20,
        height: 20,
        borderRadius: 100,
        backgroundColor: 'color-primary-200',
    },
    paginationContainer: {
        gap: 5,
        marginBottom: 10,
    },
    activeDot: {
        borderRadius: 100,
        overflow: "hidden",
        backgroundColor: 'color-primary-default',
    }
});

export default themedStyles;
