import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback} from 'react';
import {padding_horizontal, screenWidth} from '../../theme/layouts';
import ReviewCard from '../../component/review/ReviewCard';
import OrderCard from '../../component/dashboard/OrderCard';
import {AppImages} from '../../theme/images';

let Statuse = '';

const CompletedScreen = () => {
  const _renderItem = useCallback((item: any) => {
    return <ReviewCard />;
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={() => {
          return (
            <OrderCard
              images={AppImages.Sunchhay}
              title="Mao Keom Leang"
              order="#00000014"
              date="02 May,2023 10:15AM"
              Statuse="Completed"
              location="Street 31BT,Phnom Penh, GWJ4+97 Phnom Penh, 12351"
            />
          );
        }}
      />
    </View>
  );
};

export default React.memo(CompletedScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: padding_horizontal,
    marginBottom: screenWidth(120),
  },
});
