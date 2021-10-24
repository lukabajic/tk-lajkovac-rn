import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Info from '../../components/Info';
import Button from '../../components/Button';
import Colors from '../../utils/colors';

import placeholder from '../../assets/placeholder_user_photo.jpeg';

const DataSection = ({ to, data, navigation }) => (
  <TouchableOpacity
    style={styles.section}
    onPress={() => navigation.navigate(to)}
    activeOpacity={0.7}
  >
    <View style={styles.sectionView}>
      {data?.map((d, i) => (
        <Info {...d} key={i} spacing={i < data.length - 1} />
      ))}
    </View>
    <Ionicons name="ios-chevron-forward" size={28} color={Colors.black} />
  </TouchableOpacity>
);

const UserAllSettings = ({ user, navigation }) => {
  const { displayName, phone } = user.data;
  const { email } = user;

  const all = [
    {
      to: 'ChangeName',
      data: [
        { label: 'Ime', value: displayName.split(' ')[0] },
        { label: 'Prezime', value: displayName.split(' ')[1] },
      ],
    },
    {
      to: 'ChangePhone',
      data: [{ label: 'Broj telefona', value: phone }],
    },
    {
      to: 'EmailChange',
      data: [{ label: 'Email', value: email }],
    },
    {
      to: 'ChangePassword',
      data: [{ label: 'Lozinka', value: '********' }],
    },
  ];

  return (
    <View style={styles.screen}>
      {/* <LargeTitle style={{ textAlign: 'center', color: Colors.black }}>
        Informacije
      </LargeTitle>
      <Headline style={styles.header}>Klikom možete da promenite.</Headline> */}

      <ScrollView contentContainerStyle={styles.list}>
        <View style={imageStyles.wrapper}>
          <View style={imageStyles.imageContainer}>
            {user?.data?.avatarUrl ? (
              <Image
                style={imageStyles.image}
                source={{ uri: user?.data?.avatarUrl }}
              />
            ) : (
              <Image style={imageStyles.image} source={placeholder} />
            )}
            <View style={imageStyles.imageContainerColor} />
          </View>

          <Button
            secondary
            circle
            activeOpacity={1}
            style={imageStyles.buttonStyle}
            onPress={() => navigation.navigate('ProfilePicture')}
          >
            <Ionicons name="ios-pencil" size={24} color={Colors.white} />
          </Button>
        </View>

        {all.map((i) => (
          <DataSection navigation={navigation} key={i.to} {...i} />
        ))}
        {/* <TitleThree
          style={{ textAlign: "center", color: Colors.black, marginBottom: 16 }}
        >
          Dodatne (opcionalno)
        </TitleThree> */}
      </ScrollView>
    </View>
  );
};

const imageStyles = StyleSheet.create({
  wrapper: {
    paddingTop: 20,
    alignSelf: 'center',
    position: 'relative',
  },
  imageContainer: {
    position: 'relative',
    overflow: 'hidden',
    width: 180,
    height: 180,
    borderRadius: 180,
    backgroundColor: 'white',
    borderColor: Colors.lightGray,
    borderWidth: 1,
    elevation: 1,
    marginBottom: 32,
  },
  imageContainerColor: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    right: 0,
    backgroundColor: Colors.primary,
    width: 90,
    height: 90,
  },
  image: {
    position: 'absolute',
    zIndex: 2,
    top: 8,
    left: 8,
    width: 162,
    height: 162,
    borderRadius: 162,
    borderColor: Colors.lightGray,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  buttonStyle: {
    position: 'absolute',
    zIndex: 3,
    elevation: 3,
    bottom: 40,
    right: 0,
  },
});

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  header: {
    marginBottom: 32,
    marginHorizontal: 16,
    textAlign: 'center',
    color: Colors.black,
  },
  list: {
    paddingHorizontal: 16,
  },
  section: {
    width: '100%',
    paddingBottom: 16,
    marginBottom: 16,
    borderBottomColor: 'rgba(38, 35, 34, 0.2)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionView: {
    marginRight: 16,
  },
  notLast: {
    marginBottom: 8,
  },
});

export default connect((state) => ({
  user: state.user.user,
}))(UserAllSettings);
