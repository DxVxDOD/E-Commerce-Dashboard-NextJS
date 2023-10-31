import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "@/redux/store";

type InitialState = {
    value: ModalType
}

type ModalType = {
    isOpen: boolean,
}

const initialState = {
    value: {
        isOpen: false
    } as ModalType
} as InitialState;

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        onOpen: (state, action) => {
            state.value.isOpen = true
        },
        onClose: (state, action) => {
            state.value.isOpen = false
        }
    }
});

export const { onOpen, onClose } = modalSlice.actions;
export const selectModals = (state: RootState) => state.modal.value;
export default modalSlice.reducer