// 2) Reanimated v3 (se presente nel progetto)
require('react-native-reanimated').setUpTests();

jest.mock(
    'react-native-safe-area-context',
    () => jest.requireActual('react-native-safe-area-context/jest/mock').default
);

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => 'Icon')
