import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BaseComponent from '../../component/BaseComponent'
import DropDownList from '../../component/custom/DropDownList'
import TextInputWithLabel from '../../component/input/TextInputWithLabel'
import { padding_horizontal, screenWidth } from '../../theme/layouts'
import colors from '../../theme/colors'
import SubmitButton from '../../component/custom/SubmitButton'
import { HStack } from 'native-base'
import { style } from '../../styles/style'
import { goBack } from '../../services/navigate/navigation'
import AddVariation from './AddVariation'
import { useAppDispatch, useAppSelector } from '../../hooks/dispatch'
import { requestListSize } from '../../redux/actions/listSize'
import { loadLoading } from '../../redux/actions'

const colorList = [
    {
        id: 1,
        title: 'Red'
    },
    {
        id: 2,
        title: 'Blue'
    },
    {
        id: 3,
        title: 'Yellow'
    },
]

const attributeList = [
    {
        id: 1,
        title: 'Size'
    },
    {
        id: 2,
        title: 'Fabric'
    },
    {
        id: 3,
        title: 'Kilogram'
    },
]

const setAttributeList = [
    {
        id: 1,
        title: 'S'
    },
    {
        id: 2,
        title: 'M'
    },
    {
        id: 3,
        title: 'L'
    },
]

const AddVariationScreen = () => {
    const dispatch = useAppDispatch();
    const listSize = useAppSelector(state=>state.listSize.data);
    const [state, setState] = useState<any>({
        color: {},
        attribute: {},
        setAttribute: [],
        price: '',
        qty: '',
    });

    useEffect(() => {
      dispatch(loadLoading(true));
      dispatch(requestListSize());
    }, []);

    const handleStateChange = (name: string, value: any) => {
        state[name] = value;
        setState({ ...state });
    };
    return (
        <>
            <AddVariation
                data={{
                    colorList: colorList,
                    attributeList: attributeList,
                    setAttributeList: listSize,
                    color: state.color,
                    attribute: state.attribute,
                    setAttribute: state.setAttribute,
                    price: state.price,
                    qty: state.qty,
                    handleStateChange,
                }}
            />
        </>
    )
}

export default AddVariationScreen

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