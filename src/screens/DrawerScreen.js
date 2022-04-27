import {
    StyleSheet,
    TouchableOpacity,
    Text,
    StatusBar,
    SafeAreaView,
    View,
} from 'react-native';
import React, { useCallback } from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import TabBarIcon from '../components/TabBarIcon';
import {
    ForumStack,
    Contact,
    Services,
    About,
    Home,
    Forum,
} from '../constants';
import MarginVertical from '../components/MarginVertical';
import { connect } from 'react-redux';
import signOutUser from '../helperFunctions/signOutUser';
import PropTypes from 'prop-types';

const DrawerScreen = (props) => {
    const {
        navigation: { navigate },
        state,
        margin,
        uid,
    } = props;
    const activeTab = state.routes[0].state?.index;
    const goTo = useCallback((route) => () => navigate(route), [navigate]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: '#1A91D7',
            }}
        >
            <StatusBar backgroundColor="#1A91D7" barStyle="light-content" />
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    flexGrow: 1,
                    backgroundColor: '#fff',
                    margin: 0,
                    padding: 0,
                }}
                style={{ backgroundColor: '#fff', margin: 0, padding: 0 }}
            >
                <DrawerItem
                    label={'Navigator'}
                    inactiveTintColor={'black'}
                    pressOpacity={1}
                    pressColor="#fff"
                    inactiveBackgroundColor="#fff"
                    style={{ marginHorizontal: margin }}
                />
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <MarginVertical size={0.5} />
                <DrawerItem
                    label={Home}
                    icon={(props) => <TabBarIcon name={About} {...props} />}
                    activeTintColor={'#fff'}
                    inactiveTintColor={'#656566'}
                    activeBackgroundColor={'#1A91D7'}
                    inactiveBackgroundColor={'#f7f7f7'}
                    focused={!activeTab}
                    pressColor="#1A91D7"
                    onPress={goTo(Home)}
                    style={{ marginHorizontal: margin }}
                />
                <DrawerItem
                    label={About}
                    icon={(props) => <TabBarIcon name={Home} {...props} />}
                    activeTintColor={'#fff'}
                    inactiveTintColor={'#656566'}
                    activeBackgroundColor={'#1A91D7'}
                    inactiveBackgroundColor={'#f7f7f7'}
                    focused={activeTab === 1}
                    pressColor="#1A91D7"
                    onPress={goTo(About)}
                    style={{ marginHorizontal: margin }}
                />
                <DrawerItem
                    label={Services}
                    icon={(props) => <TabBarIcon name={Services} {...props} />}
                    activeTintColor={'#fff'}
                    inactiveTintColor={'#656566'}
                    activeBackgroundColor={'#1A91D7'}
                    inactiveBackgroundColor={'#f7f7f7'}
                    focused={activeTab === 2}
                    pressColor="#1A91D7"
                    onPress={goTo(Services)}
                    style={{ marginHorizontal: margin }}
                />
                <DrawerItem
                    label={Contact}
                    icon={(props) => <TabBarIcon name={Contact} {...props} />}
                    activeTintColor={'#fff'}
                    inactiveTintColor={'#656566'}
                    activeBackgroundColor={'#1A91D7'}
                    inactiveBackgroundColor={'#f7f7f7'}
                    focused={activeTab === 3}
                    pressColor="#1A91D7"
                    onPress={goTo(Contact)}
                    style={{ marginHorizontal: margin }}
                />
                <DrawerItem
                    label={Forum}
                    icon={(props) => (
                        <TabBarIcon name={ForumStack} {...props} />
                    )}
                    activeTintColor={'#fff'}
                    inactiveTintColor={'#656566'}
                    activeBackgroundColor={'#1A91D7'}
                    inactiveBackgroundColor={'#f7f7f7'}
                    focused={activeTab === 4}
                    pressColor="#1A91D7"
                    onPress={goTo(ForumStack)}
                    style={{ marginHorizontal: margin }}
                />
                <MarginVertical size={0.5} />
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                />
                <MarginVertical />
                {uid && (
                    <TouchableOpacity onPress={signOutUser}>
                        <Text style={styles.buttonText(margin)}>Sign Out</Text>
                    </TouchableOpacity>
                )}
            </DrawerContentScrollView>
        </SafeAreaView>
    );
};

const mapStateToProps = ({
    settingsState: { margin },
    forumTempState: { uid },
}) => ({ margin, uid });

export default connect(mapStateToProps)(DrawerScreen);

const styles = StyleSheet.create({
    buttonText: (margin) => ({
        marginHorizontal: margin,
        textAlign: 'left',
        color: '#1A91D7',
        alignSelf: 'flex-start',
        fontFamily: 'Poppins_500Medium',
    }),
});

DrawerScreen.propTypes = {
    uid: PropTypes.string,
    margin: PropTypes.number,
    state: PropTypes.object,
    navigate: PropTypes.func,
    navigation: PropTypes.object,
};
