import { supabase } from '@/lib/supabase';
import { View, Text, Button } from 'react-native';
import ProfileComponent from "@components/ProfileComponent";
import React from "react";

const ProfileScreen = () => {


  return (
    <View>

    <ProfileComponent />

      <Button
        title="Sign out"
        onPress={async () => await supabase.auth.signOut()}
      />
    </View>
  );
};

export default ProfileScreen;


/*

USERNAME
FULL_NAME
AVATAR_URL
WEBSITE
GROUP

 */