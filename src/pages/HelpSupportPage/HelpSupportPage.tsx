import {
  Box,
  InputContainer,
  MainContainer,
  Typography,
  Button,
  SelectInputBoxForm,
  TextInputFormBox,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import * as yup from 'yup';
import type {IHelpSupportForm} from './HelpSupportPage.types';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCallback} from 'react';
import {usePromise} from '../../hooks/usePromise';
import type IApiException from '../../types/IApiException';
import {useAlert} from '../../plugins/Alert';
import {useNavigation} from '@react-navigation/native';
import {helpSupportApi} from '../../services/supportService/supportService';
import {ScrollView} from 'react-native';

const schema: yup.ObjectSchema<IHelpSupportForm> = yup.object({
  category: yup.string().required(),
  message: yup.string().required(),
});

const HelpSupportPage = () => {
  const {showError, showSuccess} = useAlert();
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IHelpSupportForm>({
    defaultValues: {
      category: 'ACCOUNT',
      message: '',
    },
    resolver: yupResolver(schema),
  });

  const {trigger: submitForm, isLoading} = usePromise(
    useCallback(async (req: IHelpSupportForm) => {
      await helpSupportApi(req);
    }, []),
    {
      onSuccess: useCallback(() => {
        navigation.goBack();
        showSuccess(
          'Success!',
          'Your form has been submitted. Our team will review your request and get back to you shortly. Thank you for choosing us!',
        );
      }, [navigation, showSuccess]),
      onError: useCallback(
        (err?: IApiException) => {
          showError('Update failed', err?.message);
        },
        [showError],
      ),
    },
  );

  return (
    <MainContainer>
      <ScrollView keyboardShouldPersistTaps={'always'}>
        <Box>
          <Box mb={'20px'} ph={DEFAULT_CONTAINER_PADDING}>
            <Typography variant={'body'} color={'grey'}>
              Welcome to our Help and Support page. Whether you have questions,
              need assistance, or want to provide feedback, we're here to help.
              Explore our resources, contact our support team, or browse our
              FAQs to find the answers you're looking for. Your satisfaction is
              our priority, and we're dedicated to providing the support you
              deserve.
            </Typography>
          </Box>

          <Box mb={'10px'} ph={DEFAULT_CONTAINER_PADDING}>
            <Typography variant={'bodySmall'} color={'purpleLightest'}>
              Select category
            </Typography>
          </Box>
          <SelectInputBoxForm
            offsetPadding={DEFAULT_CONTAINER_PADDING}
            control={control}
            name={'category'}
            items={[
              {
                label: 'Account',
                value: 'ACCOUNT',
              },
              {
                label: 'Transaction',
                value: 'TRANSACTION',
              },
              {
                label: 'Wallet',
                value: 'WALLET',
              },
              {
                label: 'Delete account',
                value: 'DELETE_ACCOUNT',
              },
              {
                label: 'Other',
                value: 'OTHER',
              },
            ]}
          />

          <Box pt={'20px'} ph={DEFAULT_CONTAINER_PADDING}>
            <InputContainer errorMessage={errors.message?.message}>
              <TextInputFormBox
                control={control}
                name={'message'}
                placeholder={'Message'}
                multiline
              />
            </InputContainer>
          </Box>
          <Box
            pt={'40px'}
            ph={DEFAULT_CONTAINER_PADDING}
            pb={DEFAULT_CONTAINER_PADDING}>
            <Button onPress={handleSubmit(submitForm)} isLoading={isLoading}>
              Submit
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </MainContainer>
  );
};
export default HelpSupportPage;
