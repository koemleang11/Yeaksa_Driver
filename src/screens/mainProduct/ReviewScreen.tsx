import { FlatList, StyleSheet, View } from 'react-native'
import React, { useCallback } from 'react'
import { padding_horizontal } from '../../theme/layouts'
import ReviewCard from '../../component/review/ReviewCard'

const ReviewScreen = () => {

    const _renderItem = useCallback((item: any) => {
        return <ReviewCard />
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={[1, 2]}
                renderItem={_renderItem}
            />
        </View>
    );
}

export default React.memo(ReviewScreen);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: padding_horizontal
    },
})