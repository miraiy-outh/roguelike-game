import { AppDispatch, RootState } from "../services/store";
import {
    useDispatch as useDispatchOriginal,
    useSelector as useSelectorOriginal,
} from "react-redux";

export const useDispatch = () => useDispatchOriginal<AppDispatch>();

export const useSelector: <TSelected>(
    selector: (state: RootState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected = useSelectorOriginal;