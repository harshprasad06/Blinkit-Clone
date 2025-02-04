import {
  StyleSheet,
  Animated as RNAnimated,
  SafeAreaView,
  Text,
  View,
  Touchable,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleFlatList,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import CustomText from '@components/ui/CustomText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import Content from '@components/dashboard/Content';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon  from 'react-native-vector-icons/Ionicons';
import WithCart from '@features/cart/WithCart';
import withLiveStatus from '@features/map/withLiveStatus';
const NOTICE_HEIGHT = -(NoticeHeight + 12);

const ProductDashboard: FC = () => {
  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;
  const {scrollY, expand} = useCollapsibleContext();
  const perviousScrollY = useRef<number>(0);
  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < perviousScrollY.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 1 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});

    perviousScrollY.current = scrollY.value;

    return {
      opacity,
      transform: [{translateY}],
    };
  });
  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />

        <SafeAreaView />

        <Animated.View style={[styles.backToTopButton, backToTopStyle]}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center', gap: 6}}
            onPress={() => {
              scrollY.value = 0;
              expand();
            }}>
            <Icon
              name="arrow-up-circle-outline"
              size={RFValue(12)}
              color="white"
            />
            <CustomText
              variant="h9"
              fontFamily={Fonts.SemiBold}
              style={{color: 'white'}}>
              Back to top
            </CustomText>
          </TouchableOpacity>
        </Animated.View>

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer containerStyle={styles.transparent}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>

          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <Content />
            <View style={{backgroundColor: '#f8f8f8', padding: 20}}>
              <CustomText
                fonSize={Math.round(RFValue(32))}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                India's last mintue app 🥭
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, marginTop: 10, paddingBottom: 100}}>
                Developed By ❤️ Harsh Prasad
              </CustomText>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

export default withLiveStatus(WithCart(withCollapsibleContext(ProductDashboard)));

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  transparent: {
    backgroundColor: 'transparent',
  },
  backToTopButton:{
    position: 'absolute',
    alignSelf:"center",
    top: Platform.OS === 'ios' ? screenHeight * 0.18 : 100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#000',
    borderRadius:20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex:999
  }
});
