import {FlatList, StyleSheet, Text, Image} from 'react-native';
import React, {useCallback} from 'react';
import BaseComponent from '../../component/BaseComponent';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import {navigate} from '../../services/navigate/navigation';
import {Routes} from '../../temp/Routes';
import CustomSearch from '../../component/mainHistory/CustomSearch';
import {Center, HStack, VStack} from 'native-base';
import {AppImages} from '../../theme/images';
import {size} from '../../theme/fonts';
import colors from '../../theme/colors';

const SearchScreen = () => {
  const _renderItem = useCallback(() => {
    return;
  }, []);

  return (
    <BaseComponent
      title="Search"
      style={styles.container}
      disabledCloseKeyboard>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={null}
        renderItem={() => <></>}
        ListHeaderComponent={
          <>
            <CustomSearch
              label={''}
              placeholder="Search Order Number"
              value={undefined}
              onChangeText={undefined}
            />
            <HStack
              justifyContent={'space-between'}
              marginTop={screenWidth(20)}
              marginBottom={screenWidth(20)}>
              <Text style={styles.title}>Recently Searches</Text>
              <Center>
                <Image source={AppImages.Delate} style={styles.icon} />
              </Center>
            </HStack>
            <VStack>
              <HStack style={styles.row}>
                <Text style={styles.title}>#00000014</Text>
                <HStack>
                  <Text style={styles.title}>Completed</Text>
                  <Center marginLeft={screenWidth(70)}>
                    <Image source={AppImages.Cancel} style={styles.cancel} />
                  </Center>
                </HStack>
              </HStack>
              <HStack style={styles.row}>
                <Text style={styles.title}>#00000014</Text>
                <HStack>
                  <Text style={styles.title}>Completed</Text>
                  <Center marginLeft={screenWidth(70)}>
                    <Image source={AppImages.Cancel} style={styles.cancel} />
                  </Center>
                </HStack>
              </HStack>
              <HStack style={styles.row}>
                <Text style={styles.title}>#00000016</Text>
                <HStack>
                  <Text style={styles.title}>Rejected</Text>
                  <Center marginLeft={screenWidth(70)}>
                    <Image source={AppImages.Cancel} style={styles.cancel} />
                  </Center>
                </HStack>
              </HStack>
              <HStack style={styles.row}>
                <Text style={styles.title}>#00000018</Text>
                <HStack>
                  <Text style={styles.title}>Completed</Text>
                  <Center marginLeft={screenWidth(70)}>
                    <Image source={AppImages.Cancel} style={styles.cancel} />
                  </Center>
                </HStack>
              </HStack>
              <HStack style={styles.row}>
                <Text style={styles.title}>#00000018</Text>
                <HStack>
                  <Text style={styles.title}>Completed</Text>
                  <Center marginLeft={screenWidth(70)}>
                    <Image source={AppImages.Cancel} style={styles.cancel} />
                  </Center>
                </HStack>
              </HStack>
              <HStack style={styles.row}>
                <Text style={styles.title}>#00000018</Text>
                <HStack>
                  <Text style={styles.title}>Rejected</Text>
                  <Center marginLeft={screenWidth(70)}>
                    <Image source={AppImages.Cancel} style={styles.cancel} />
                  </Center>
                </HStack>
              </HStack>
            </VStack>
          </>
        }
      />
    </BaseComponent>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal,
  },
  icon: {
    height: screenWidth(30),
    width: screenWidth(30),
  },
  title: {
    fontSize: size.font18,
    color: colors.black,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: screenWidth(15),
  },
  cancel: {
    height: screenWidth(20),
    width: screenWidth(20),
    tintColor: colors.grayColor,
  },
});
