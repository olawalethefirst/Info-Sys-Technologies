import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ServicesMiniPair from '../components/ServicesMiniPair';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';
import updateEffectiveBodyHeight from '../redux/actions/updateEffectiveBodyHeight';
import ServicesMiniIntro from '../components/ServicesMiniIntro';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import {
    serviceDetails,
} from '../constants';

function HomeScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    updateEffectiveBodyHeight,
}) {
    const [effectiveBodyHeight, setEffectiveBodyHeight] = useState(0);
    const renderItem = ({ item }) => item.data;
    const tabBarHeight = useBottomTabBarHeight();
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    const servicesArray = checkColumnMode(deviceWidthClass)
        ? [
              {
                  data: (
                      <ServicesMiniPair
                          data1={{
                              title: serviceDetails[0].title,
                              body: serviceDetails[0].body,
                              index: 0,
                          }}
                          data2={{
                              title: serviceDetails[1].title,
                              body: serviceDetails[1].body,
                              index: 1,
                          }}
                          spacing={2}
                      />
                  ),
              },
              {
                  data: (
                      <ServicesMiniPair
                          data1={{
                              title: serviceDetails[2].title,
                              body: serviceDetails[2].body,
                              index: 2,
                          }}
                          data2={{
                              title: serviceDetails[3].title,
                              body: serviceDetails[3].body,
                              index: 3,
                          }}
                          spacing={2}
                      />
                  ),
              },
              {
                  data: (
                      <ServicesMiniPair
                          data1={{
                              title: serviceDetails[4].title,
                              body: serviceDetails[4].body,
                              index: 4,
                          }}
                          data2={{
                              title: serviceDetails[5].title,
                              body: serviceDetails[5].body,
                              index: 5,
                          }}
                          spacing={2}
                      />
                  ),
              },
              {
                  data: (
                      <ServicesMiniPair
                          data1={{
                              title: serviceDetails[6].title,
                              body: serviceDetails[6].body,
                              index: 6,
                          }}
                          spacing={4}
                      />
                  ),
              },
          ]
        : serviceDetails.map((val, index) => ({
              data: (
                  <ServicesMini
                      data={{ title: val.title, body: val.body, index }}
                  />
              ),
          }));
    const sectionComponents = [
        {
            data: (
                <Welcome
                    margin={margin}
                    bodyHeight={effectiveBodyHeight}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                    scrollRef={scrollRef}
                />
            ),
        },
        {
            data: (
                <AboutMini
                    fontFactor={fontFactor}
                    margin={margin}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            data: <ServicesMiniIntro margin={margin} fontFactor={fontFactor} />,
        },
        ...servicesArray,
        {
            data: (
                <ForumMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={effectiveBodyHeight}
                />
            ),
        },
        {
            data: (
                <ContactMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={effectiveBodyHeight}
                />
            ),
        },
    ];

    useEffect(() => {
        if (bodyHeight && tabBarHeight && !effectiveBodyHeight) {
            setEffectiveBodyHeight(() => {
                const effectiveBodyHeight = bodyHeight - tabBarHeight;
                updateEffectiveBodyHeight({
                    effectiveBodyHeight,
                    tabBarHeight,
                });
                return effectiveBodyHeight;
            });
        }
    }, [
        bodyHeight,
        tabBarHeight,
        updateEffectiveBodyHeight,
        effectiveBodyHeight,
    ]);

    if (!effectiveBodyHeight) {
        return <></>;
    }

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={sectionComponents}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                bounces={false}
                ref={scrollRef}
            />
        </View>
    );
}

HomeScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
    updateEffectiveBodyHeight: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B26',
    },
    list: {
        backgroundColor: '#161B26',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps, {
    updateEffectiveBodyHeight,
})(HomeScreen);
