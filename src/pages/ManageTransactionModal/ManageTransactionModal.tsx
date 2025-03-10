import {BottomSheet} from '../../components';
import ManageTransactionFormWidget from '../../widgets/ManageTransactionFormWidget/ManageTransactionFormWidget';
import type {RouteProp} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';

const ManageTransactionModal = () => {
  const {params} =
    useRoute<RouteProp<IRootStackParamList, 'ManageTransaction'>>();
  return (
    <BottomSheet>
      <ManageTransactionFormWidget
        backNavigate={params?.backNavigate}
        transaction={params?.transaction}
      />
    </BottomSheet>
  );
};
export default ManageTransactionModal;
