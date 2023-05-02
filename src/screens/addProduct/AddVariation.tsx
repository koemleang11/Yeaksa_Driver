import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import BaseComponent from '../../component/BaseComponent'
import DropDownList from '../../component/custom/DropDownList'
import TextInputWithLabel from '../../component/input/TextInputWithLabel'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import SubmitButton from '../../component/custom/SubmitButton'
import { HStack } from 'native-base'
import { style } from '../../styles/style'
import { goBack } from '../../services/navigate/navigation'
import MultiSelectDropDownList from '../../component/custom/MultiSelectDropDownList'

interface Props {
    data: PropsInterface;
}

interface PropsInterface {
    colorList: any;
    attributeList: any;
    setAttributeList: Array<any>;
    color: any;
    attribute: any;
    setAttribute: any;
    price: any;
    qty: any;
    handleStateChange: (state: string, value: any) => void;
}

const AddVariation: React.FC<Props> = ({ data }) => {

    return (
        <>
            <BaseComponent title='add_variation' style={{ flex: 1 }}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={null}
                    renderItem={() => <></>}
                    ListHeaderComponentStyle={{ paddingHorizontal: padding_horizontal }}
                    ListHeaderComponent={<>
                        <DropDownList
                            label='colors'
                            data={data.colorList}
                            placeholder={'Select'}
                            value={data.color}
                            onSelectedChange={(value: any) => data.handleStateChange('color', value)}
                        />
                        <DropDownList
                            label='attribute'
                            data={data.attributeList}
                            placeholder={'Select'}
                            value={data.attribute}
                            onSelectedChange={(value: any) => data.handleStateChange('attribute', value)}
                        />
                        <MultiSelectDropDownList
                            label='set_attribute'
                            data={data.setAttributeList}
                            placeholder={'Select'}
                            value={data.setAttribute}
                            onSelectedChange={(value: any) => data.handleStateChange('setAttribute', value)}
                        />
                        <TextInputWithLabel
                            label='product_price'
                            placeholder='$0.00'
                            value={data.price}
                            onChangeText={(value: any) => data.handleStateChange('price', value)}
                        />
                        <TextInputWithLabel
                            label='qty_in_stock'
                            placeholder='0'
                            value={data.qty}
                            onChangeText={(value: any) => data.handleStateChange('qty', value)}
                        />
                    </>}
                />
            </BaseComponent>
            <HStack style={styles.boxContainer}>
                <SubmitButton
                    onPress={goBack}
                    title='save'
                    width={'100%'}
                    borderRadius={screenWidth(50)}
                />
            </HStack>
            <SafeAreaView style={{ backgroundColor: colors.white }} />
        </>
    )
}

export default AddVariation

const styles = StyleSheet.create({
    boxContainer: {
        backgroundColor: colors.white,
        paddingVertical: screenWidth(15),
        paddingHorizontal: screenWidth(20),
        justifyContent: 'space-between',
        borderTopLeftRadius: screenWidth(20),
        borderTopRightRadius: screenWidth(20),
        ...style.normalShadow
    },
})