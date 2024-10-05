import { Redirect } from 'expo-router';
import {notifyUserAboutAnniversaire} from "@/lib/notifications";
import {useAuth} from "@/providers/AuthProvider";

export default function TabIndex() {

  const {profile} = useAuth();

  const test = async () => {
    await notifyUserAboutAnniversaire(profile);
  }

  //TODO : check si c'est la date d'aujourd'hui
   if (true) {
     test();
  }

  return <Redirect href={'/(user)/menu/'} />;
}
