import { combineReducers } from "@reduxjs/toolkit";
import { ClassificationReducer } from "./classification.reducer";
import { LanguageReducer } from "./language.reducer";
import { LoadingReducer } from "./loading.reducer";
import { LoadMoreReducer } from "./loadMore.reducer";
import { ProductReducer } from "./product.reducer";
import { ProductDetailReducer } from "./productDetail.reducer";
import { ProfileReducer } from "./profile.reducer";
import { RefreshingReducer } from "./refreshing.reducer";
import { SizeListReducer } from "./sizeList.reducer";

const rootReducers = combineReducers({
    loading: LoadingReducer,
    refreshing: RefreshingReducer,
    loadMore: LoadMoreReducer,
    lang: LanguageReducer,
    profile: ProfileReducer,
    product: ProductReducer,
    productDetail: ProductDetailReducer,
    classification: ClassificationReducer,
    listSize: SizeListReducer,
})

export type reducerProps = ReturnType<typeof rootReducers>;

export default rootReducers;
