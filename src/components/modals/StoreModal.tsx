import Modal from "@/components/ui/Modal";
import {onClose, selectModals} from "@/redux/features/modalSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";

const StoreModal = () => {

    const modal  = useAppSelector(state => selectModals(state));
    const dispatch = useAppDispatch();

    return (
        <Modal
            title={'Create Store'}
            description={'Add a new store to manage products and categories'}
            isOpen={modal.isOpen}
            onClose={() => dispatch(onClose(modal))}>
        </Modal>
    )
}

export default StoreModal