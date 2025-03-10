import {EditAvatar} from '../../components';
import {useCallback, useMemo} from 'react';
import {TouchableOpacity} from 'react-native';
import type {Image} from 'react-native-image-crop-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useTheme} from 'styled-components/native';
import {getFilenameFromPath} from '../../helpers/fileHelper';

interface IUploadProfilePictureWidgetProps {
  onImageSelected: (imageObj: Image) => void;
  url?: string;
}
const UploadProfilePictureWidget = ({
  onImageSelected,
  url,
}: IUploadProfilePictureWidgetProps) => {
  const {colors} = useTheme();
  const defaultPicture = useMemo(
    () => require('../../assets/images/avatar.png'),
    [],
  );
  const pickImage = useCallback(async () => {
    const res = await ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      cropperToolbarColor: colors.backgroundGradient1,
      cropperToolbarWidgetColor: colors.light,
      cropperToolbarTitle: 'Profile picture',
      cropperCircleOverlay: true,
      mediaType: 'photo',
      hideBottomControls: true,
    });
    const filename = getFilenameFromPath(res.path);

    onImageSelected({
      ...res,
      filename,
    });
  }, [colors.backgroundGradient1, colors.light, onImageSelected]);
  return (
    <TouchableOpacity onPress={pickImage}>
      <EditAvatar source={url ? {uri: url} : defaultPicture} />
    </TouchableOpacity>
  );
};
export default UploadProfilePictureWidget;
