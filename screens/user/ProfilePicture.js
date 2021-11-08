import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { View, Image, StyleSheet, Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import FormScreen from '../../components/FormScreen';
import Loader from '../../components/Loader';
import { updateData } from '../../store/actions';
import Button from '../../components/Button';
import colors from '../../utils/colors';

import placeholder from '../../assets/placeholder_user_photo.jpeg';

const ProfilePicture = ({
  error,
  updateData,
  loading,
  token,
  navigation,
  user,
  registrationProcess,
}) => {
  const [imageUri, setImageUri] = useState(user?.data?.avatarUrl || null);
  const [image, setImage] = useState(null);

  const hasImage = user?.data?.avatarName && user?.data?.avatarUrl;

  const chooseImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Da bi ste dodali sliku potrebno je da dozvolite pristup.',
          error,
          [
            {
              text: 'Dalje',
              style: 'cancel',
            },
          ]
        );
      } else {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result);
          setImageUri(result.uri);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const captureImage = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Da bi ste dodali sliku potrebno je da dozvolite pristup.',
          error,
          [
            {
              text: 'Dalje',
              style: 'cancel',
            },
          ]
        );
      } else {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });

        if (!result.cancelled) {
          setImage(result);
          setImageUri(result.uri);
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  const onSubmit = async () => {
    const uri =
      Platform.OS === 'android'
        ? image.uri.replace('file:/', 'file:///')
        : image.uri;
        
    const name = uri.split('/').pop();

    const match = /\.(\w+)$/.exec(name);
    const type = match ? `image/${match[1]}` : `image`;

    await updateData(token, 'UPDATE_PICTURE', {
      image: {
        name,
        type,
        uri,
      },
      oldImage: user?.data?.avatarName || null,
    });
    !registrationProcess && navigation.goBack();
  };

  if (loading) return <Loader />;

  return (
    <FormScreen
      title={hasImage ? 'Promenite sliku' : 'Dodajte sliku'}
      error={error}
    >
      <View style={styles.wrapper}>
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image style={styles.image} source={{ uri: imageUri }} />
          ) : (
            <Image style={styles.image} source={placeholder} />
          )}
          <View style={styles.imageContainerColor} />
        </View>

        <Button
          secondary
          circle
          activeOpacity={1}
          style={[styles.buttonStyle, styles.buttonChoose]}
          onPress={chooseImage}
        >
          <Ionicons name="images" size={24} color={colors.white} />
        </Button>
        <Button
          quaternary
          circle
          activeOpacity={1}
          style={[styles.buttonStyle, styles.buttonAdd]}
          onPress={captureImage}
        >
          <Ionicons name="camera" size={24} color={colors.white} />
        </Button>
      </View>
      <View>
        <Button primary square onPress={onSubmit} disabled={!image}>
          <Ionicons
            name="arrow-forward"
            size={28}
            color={image ? colors.white : colors.gray}
          />
        </Button>
      </View>
    </FormScreen>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: 240,
    height: 240,
    borderRadius: 240,
    backgroundColor: 'white',
    borderColor: colors.lightGray,
    borderWidth: 1,
    elevation: 1,
    marginBottom: 32,
  },
  imageContainerColor: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
    backgroundColor: colors.primary,
    width: 120,
    height: 120,
  },
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 8,
    left: 8,
    width: 222,
    height: 222,
    borderRadius: 222,
    borderColor: colors.lightGray,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  buttonStyle: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
  },
  buttonChoose: {
    bottom: 40,
    right: 30,
  },
  buttonAdd: {
    bottom: 70,
    right: 0,
  },
});

export default connect(
  (state) => ({
    error: state.user.error,
    user: state.user.user,
    loading: state.user.loading,
    token: state.auth.token,
    registrationProcess: state.auth.registrationProcess,
  }),
  { updateData }
)(ProfilePicture);
