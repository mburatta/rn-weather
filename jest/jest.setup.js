const React = require('react');
const { render } = require('@testing-library/react-native');
const { ApplicationProvider } = require('@ui-kitten/components');
const eva = require('@eva-design/eva');

// 2) Reanimated v3 (se presente nel progetto)
require('react-native-reanimated').setUpTests();

jest.mock(
    'react-native-safe-area-context',
    () => jest.requireActual('react-native-safe-area-context/jest/mock').default
);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')

global.renderWithKitten = (ui, options) =>
render(
    <ApplicationProvider {...eva} theme={eva.light}>
        {ui}
    </ApplicationProvider>,
    options,
);
