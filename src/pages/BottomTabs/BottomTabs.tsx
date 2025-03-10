import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeTab} from '../HomeTab';
import {ProfileTab} from '../ProfileTab';
import {
  HomeFill,
  HomeOutline,
  ProfileFill,
  ProfileOutline,
} from '../../assets/icons';
import {PlusButton} from '../../components';
import type {NavigationProp} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import {useCallback} from 'react';

const EmptyComponent = () => null;

const Tab = createBottomTabNavigator();
const BottomTabs = () => {
  const navigation = useNavigation<NavigationProp<IRootStackParamList>>();

  const homeTabBarIcon = useCallback(
    (props: {focused: boolean}) => (
      <>{props.focused ? <HomeFill /> : <HomeOutline />}</>
    ),
    [],
  );

  const addTabBarIcon = useCallback(
    () => (
      <PlusButton
        onPress={() => {
          navigation.navigate('ManageTransaction');
        }}
      />
    ),
    [navigation],
  );

  const profileTabBarIcon = useCallback(
    (props: {focused: boolean}) => (
      <>{props.focused ? <ProfileFill /> : <ProfileOutline />}</>
    ),
    [],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(40, 38, 92, 0.95)',
          borderTopWidth: 0,
          position: 'absolute',
          height: 96,
          borderTopRightRadius: 22,
          borderTopLeftRadius: 22,
          alignContent: 'space-around',
          paddingTop: 20,
        },
        tabBarLabel: '',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: homeTabBarIcon,
        }}
      />
      <Tab.Screen
        name="AddTransaction"
        component={EmptyComponent}
        options={{
          tabBarButton: addTabBarIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileTab}
        options={{
          tabBarIcon: profileTabBarIcon,
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabs;
