import {Image, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import BaseComponent from '../../component/BaseComponent';
import {Box} from 'native-base';
import colors from '../../theme/colors';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {AppImages} from '../../theme/images';
import {size} from '../../theme/fonts';
import {Battambang, BattambangBold} from '../../services/config/fonts';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const AboutUsScreen = () => {
  const insets = useSafeAreaInsets();
  return (
    <BaseComponent
      title="about_us"
      style={styles.container}
      disabledCloseKeyboard>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box
          style={{
            ...styles.whiteBox,
            marginBottom: screenWidth(20) + insets.bottom,
          }}>
          <Image source={AppImages.Logo} style={styles.logo} />
          <Box
            style={{
              height: screenWidth(1.5),
              backgroundColor: colors.lowOpacityGray,
              marginBottom: screenWidth(10),
            }}
          />
          <Text style={styles.title}>Who we are?</Text>
          <Text style={styles.text}>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using content here, content here, making it
            look like readable English. Many desktop publishing packages and web
            page.
          </Text>
          <Image
            source={{
              uri: 'https://www.cloudways.com/blog/wp-content/uploads/Top-Ecommerce-Websites.jpg',
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Who do we supply?</Text>
          <Text style={styles.text}>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using content here, content here, making it
            look like readable English. Many desktop publishing packages and web
            page.
          </Text>
          <Image
            source={{
              uri: 'https://blog-frontend.envato.com/cdn-cgi/image/width=1200,quality=85,format=auto/uploads/2022/04/E-commerce-App-JPG-File-scaled.jpg',
            }}
            style={styles.image}
          />
          <Text style={styles.title}>Why us?</Text>
          <Text style={styles.text}>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using content here, content here, making it
            look like readable English. Many desktop publishing packages and web
            page.
          </Text>
          <Image
            source={{
              uri: 'https://ocdn.eu/images/pulscms/ZjI7MDA_/bb6b0f53264a0ae1d90067153c065aeb.jpg',
            }}
            style={styles.image}
          />
          <Text style={styles.text}>
            Lorem Ipsum is that it has a more-or-less normal distribution of
            letters, as opposed to using content here, content here, making it
            look like readable English. Many desktop publishing packages and web
            page.
          </Text>
        </Box>
      </ScrollView>
    </BaseComponent>
  );
};

export default AboutUsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal,
  },
  whiteBox: {
    backgroundColor: colors.white,
    borderRadius: screenWidth(10),
    marginTop: screenWidth(20),
    paddingHorizontal: screenWidth(20),
    paddingVertical: screenWidth(25),
  },
  logo: {
    width: screenWidth(200),
    height: screenWidth(170),
    alignSelf: 'center',
  },
  title: {
    fontSize: size.font22,
    color: colors.black,
    ...BattambangBold,
  },
  text: {
    fontSize: size.font18,
    color: colors.grayColor,
    ...Battambang,
    textAlign: 'justify',
  },
  image: {
    height: screenWidth(250),
    width: '100%',
    borderRadius: screenWidth(10),
    marginVertical: screenWidth(15),
  },
});
