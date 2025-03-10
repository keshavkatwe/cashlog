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
import {useAppDispatch, useAppSelector} from '../../store';
import {useForm} from 'react-hook-form';
import type {IEditProfileFormState} from './EditProfile.types';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCallback, useState} from 'react';
import {usePromise} from '../../hooks/usePromise';
import {updateProfileApi} from '../../services/userService/userService';
import {splitFullName} from '../../helpers/textHelper';
import {setProfile} from '../../store/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import {useAlert} from '../../plugins/Alert';
import dayjs from 'dayjs';
import {UploadProfilePictureWidget} from '../../widgets/UploadProfilePictureWidget';
import type {Image} from 'react-native-image-crop-picker';
import {
  generateSignedUrlApi,
  uploadFileApi,
} from '../../services/uploadService/uploadService';
import type {IUpdateProfileRequestDto} from '../../services/userService/dto/updateProfile.dto';
import {ScrollView} from 'react-native';

const schema: yup.ObjectSchema<IEditProfileFormState> = yup.object({
  name: yup.string().required(),
  dob: yup.date().optional(),
});

const EditProfile = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [selectedImage, setSelectedImage] = useState<Image>();
  const {showError} = useAlert();
  const {user} = useAppSelector(state => state.user);
  const {control, handleSubmit, formState} = useForm<IEditProfileFormState>({
    defaultValues: {
      name: `${user?.firstName} ${user?.lastName}`,
      dob:
        (user?.dob && new Date(dayjs(user?.dob) as unknown as string)) ||
        new Date(),
    },
    resolver: yupResolver(schema),
  });

  const {trigger: submitForm, isLoading} = usePromise(
    useCallback(
      async (formValues?: IEditProfileFormState) => {
        if (formValues) {
          const {firstName, lastName} = splitFullName(formValues.name);
          const requestPayload: IUpdateProfileRequestDto = {
            firstName,
            lastName,
            dob: dayjs(formValues.dob).format('YYYY-MM-DD') as unknown as Date,
          };

          if (selectedImage) {
            const {signedUrl, fileName} = await generateSignedUrlApi({
              contentType: selectedImage?.mime,
              fileName: selectedImage.filename || '',
            });

            const imageBinary = await fetch(selectedImage.path);
            const imageBlob = await imageBinary.blob();
            await uploadFileApi(signedUrl, imageBlob, selectedImage.mime);
            requestPayload.profilePicture = fileName;
          }

          const updatedUser = await updateProfileApi(requestPayload);
          dispatch(setProfile(updatedUser));
        }
      },
      [dispatch, selectedImage],
    ),
    {
      onSuccess: () => navigation.goBack(),
      onError: err => showError('Update Failed', err?.message),
    },
  );

  return (
    <MainContainer>
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        contentContainerStyle={{flexGrow: 1}}>
        <Box
          ph={DEFAULT_CONTAINER_PADDING}
          pb={DEFAULT_CONTAINER_PADDING}
          flex={1}>
          <Box alignItems={'center'} pv={'40px'}>
            <UploadProfilePictureWidget
              onImageSelected={imageObj => {
                console.log(imageObj);
                setSelectedImage(imageObj);
              }}
              url={selectedImage?.path || user?.profilePictureUrl}
            />
          </Box>

          <Box>
            <Typography color={'purpleLighter'}>Name</Typography>
            <Box pt={'8px'}>
              <InputContainer errorMessage={formState.errors.name?.message}>
                <TextInputFormBox control={control} name={'name'} />
              </InputContainer>
            </Box>
          </Box>
          <Box pt={'26px'}>
            <Typography color={'purpleLighter'}>Date of birth</Typography>
            <Box pt={'8px'}>
              <InputContainer errorMessage={formState.errors.dob?.message}>
                <DateTimeInputFormBox
                  control={control}
                  name={'dob'}
                  mode={'date'}
                  dateFormat={'DD/MM/YYYY'}
                />
              </InputContainer>
            </Box>
          </Box>
        </Box>
        <Box p={DEFAULT_CONTAINER_PADDING}>
          <Button onPress={handleSubmit(submitForm)} isLoading={isLoading}>
            Save
          </Button>
        </Box>
      </ScrollView>
    </MainContainer>
  );
};
export default EditProfile;
