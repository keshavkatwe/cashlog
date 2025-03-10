import {BottomSheet, Box, Typography} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {
  GridContainer,
  StyledBoxContainer,
  StyledIcon,
} from './SelectWalletTypeWidget.styles';
import {
  Image,
  Modal,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {useMemo} from 'react';
import {useAppSelector} from '../../store';
import {walletTypeIcon} from '../../constants/wallet';

interface ISelectWalletTypeWidgetProps {
  onWalletTypeSelected?: (walletTypeId: number) => void;
  isShow?: boolean;
  onClose?: () => void;
}
const SelectWalletTypeWidget = ({
  onWalletTypeSelected,
  onClose,
  isShow,
}: ISelectWalletTypeWidgetProps) => {
  const {width} = useWindowDimensions();
  const {walletTypes} = useAppSelector(state => state.walletTypes);
  const boxWidth = useMemo(() => (width - 26 * 2) / 2 - 13, [width]);
  return (
    <Modal visible={isShow} transparent animationType={'slide'}>
      <BottomSheet onOverlayTap={() => onClose?.()}>
        <Box p={DEFAULT_CONTAINER_PADDING}>
          <Box p={'20px'}>
            <Typography align={'center'} variant={'h3'}>
              Which Wallet you want to add?
            </Typography>
          </Box>
          <GridContainer pt={'50px'}>
            {walletTypes.map(typeItem => (
              <TouchableOpacity
                key={typeItem.walletTypeId}
                onPress={() => {
                  onWalletTypeSelected?.(typeItem.walletTypeId);
                }}>
                <StyledBoxContainer
                  width={boxWidth + 'px'}
                  bgColor={'purpleLight'}
                  br={'br20'}
                  ph={'24px'}
                  pv={'16px'}
                  height={'100px'}
                  alignItems={'center'}>
                  <StyledIcon>
                    <Image source={walletTypeIcon[typeItem.code]} />
                  </StyledIcon>
                  <Typography variant={'h6'} align={'center'}>
                    {typeItem.label}
                  </Typography>
                </StyledBoxContainer>
              </TouchableOpacity>
            ))}
          </GridContainer>
        </Box>
      </BottomSheet>
    </Modal>
  );
};

export default SelectWalletTypeWidget;
