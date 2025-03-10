import {
  Box,
  Button,
  DateTimeInputFormBox,
  InputContainer,
  MainContainer,
  TextInputFormBox,
  Typography,
} from '../../components';
import {DEFAULT_CONTAINER_PADDING} from '../../constants/spacing';
import {EyeHide} from '../../assets/icons';
import {ScrollView, TouchableOpacity} from 'react-native';
import Eye from '../../assets/icons/Eye';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useForm} from 'react-hook-form';
import * as yup from 'yup';
import type {IBasicInfoFormState} from './BasicInfoPage.types';
import {yupResolver} from '@hookform/resolvers/yup';
import {usePromise} from '../../hooks/usePromise';
import {updateBasic} from '../../services/userService/userService';
import {splitFullName} from '../../helpers/textHelper';
import {useAlert} from '../../plugins/Alert';
import dayjs from 'dayjs';
import CheckboxForm from '../../components/Checkbox/CheckboxForm';
import {StyledTextUnderline} from './BasicInfoPage.styles';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import useStartUp from '../../hooks/useStartUp';
import type {RouteProp} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';
import type IRootStackParamList from '../../types/IRootStackParamList';
import type {IUpdateBasicRequestDto} from '../../services/userService/dto/updateBasic.dto';
import {useTheme} from 'styled-components/native';

const BasicInfoPage = () => {
  const {colors} = useTheme();
  const {setupInitial} = useStartUp();
  const {showError} = useAlert();
  const {params} = useRoute<RouteProp<IRootStackParamList, 'BasicInfoPage'>>();
  const [isSecureEntry, setIsSecureEntry] = useState(true);

  const schema: yup.ObjectSchema<IBasicInfoFormState> = useMemo(
    () =>
      yup.object({
        name: yup.string().required(),
        dob: yup.date().required(),
        password: params?.uniqueRequestId
          ? yup.string().required()
          : yup.string().optional(),
        isTcAccepted: yup
          .boolean()
          .required()
          .isTrue('Please accept the Terms and Conditions and Privacy Policy'),
      }),
    [params?.uniqueRequestId],
  );

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IBasicInfoFormState>({
    defaultValues: {
      name: '',
      dob: new Date(),
      password: '',
      isTcAccepted: false,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    console.log(params?.uniqueRequestId);
  }, [params?.uniqueRequestId]);

  const toggleSecureEntry = useCallback(() => {
    setIsSecureEntry(prevState => !prevState);
  }, []);

  const {trigger: onFormSubmit, isLoading} = usePromise(
    useCallback(
      async (req?: IBasicInfoFormState) => {
        if (req) {
          const {firstName, lastName} = splitFullName(req.name);

          const payload: IUpdateBasicRequestDto = {
            firstName: firstName,
            lastName: lastName,
            dob: dayjs(req.dob).format('YYYY-MM-DD'),
            isTcAccepted: req.isTcAccepted,
          };

          if (params?.uniqueRequestId) {
            payload.password = req.password;
          }

          await updateBasic(payload, params?.uniqueRequestId);
          await setupInitial();
        }
      },
      [params?.uniqueRequestId, setupInitial],
    ),
    {
      onError: err => showError('Update failed', err?.message),
    },
  );

  const openTc = useCallback(
    async () =>
      await InAppBrowser.open('https://cashlog.in/tc', {
        toolbarColor: colors.backgroundGradient1,
        enableDefaultShare: false,
      }),
    [colors.backgroundGradient1],
  );
  const openPrivacyPolicy = useCallback(
    async () =>
      await InAppBrowser.open('https://cashlog.in/privacyPolicy', {
        toolbarColor: colors.backgroundGradient1,
        enableDefaultShare: false,
      }),
    [colors.backgroundGradient1],
  );

  return (
    <MainContainer>
      <ScrollView>
        <Box ph={DEFAULT_CONTAINER_PADDING} pb={DEFAULT_CONTAINER_PADDING}>
          <Box>
            <Typography variant={'h2'}>Basic Information</Typography>
            <Typography color={'grey'}>Record Every Penny You Spend</Typography>

            <Box pt={'50px'}>
              <Box>
                <Box pb={'8px'} pl={'14px'}>
                  <Typography color={'purpleLightest'}>Name</Typography>
                </Box>
                <InputContainer errorMessage={errors.name?.message}>
                  <TextInputFormBox
                    control={control}
                    name={'name'}
                    placeholder={'Eq. John doe'}
                    textContentType={'username'}
                  />
                </InputContainer>
              </Box>
              <Box pt={'26px'}>
                <Box pb={'8px'} pl={'14px'}>
                  <Typography color={'purpleLightest'}>
                    Date of birth
                  </Typography>
                </Box>

                <InputContainer errorMessage={errors.dob?.message}>
                  <DateTimeInputFormBox
                    control={control}
                    name={'dob'}
                    placeholder={'dd/mm/yy'}
                    mode={'date'}
                    dateFormat={'DD/MM/YYYY'}
                  />
                </InputContainer>
              </Box>
              {params?.uniqueRequestId && (
                <Box pt={'26px'}>
                  <Box pb={'8px'} pl={'14px'}>
                    <Typography color={'purpleLightest'}>Password</Typography>
                  </Box>
                  <InputContainer errorMessage={errors.password?.message}>
                    <TextInputFormBox
                      control={control}
                      name={'password'}
                      placeholder={'Secure Password'}
                      textContentType={'password'}
                      secureTextEntry={isSecureEntry}
                      postIcon={
                        <TouchableOpacity onPress={toggleSecureEntry}>
                          {isSecureEntry ? <EyeHide /> : <Eye />}
                        </TouchableOpacity>
                      }
                    />
                  </InputContainer>
                </Box>
              )}

              <Box mt={'30px'}>
                <CheckboxForm control={control} name={'isTcAccepted'}>
                  <Typography color={'purpleLightest'}>
                    I have read and agree to the{' '}
                    <StyledTextUnderline
                      color={'purpleLightest'}
                      onPress={openTc}>
                      Terms and Conditions
                    </StyledTextUnderline>{' '}
                    and{' '}
                    <StyledTextUnderline
                      color={'purpleLightest'}
                      onPress={openPrivacyPolicy}>
                      Privacy Policy
                    </StyledTextUnderline>
                    .
                  </Typography>
                </CheckboxForm>
                <Typography color={'red'}>
                  {errors.isTcAccepted?.message}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box pt={'40px'}>
            <Button onPress={handleSubmit(onFormSubmit)} isLoading={isLoading}>
              Save
            </Button>
          </Box>
        </Box>
      </ScrollView>
    </MainContainer>
  );
};
export default BasicInfoPage;
