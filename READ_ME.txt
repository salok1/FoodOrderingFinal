npm install @supabase/supabase-js
npm install react-native-elements @react-native-async-storage/async-storage react-native-url-polyfill
npx expo install expo-secure-store


test@gmail.com


#créer la edge Fn
npx supabase functions new payment-sheet

#docker host
npx supabase functions serve --env-file .env payment-sheet 

#deploy la esge Fn sur le server
npx supabase functions deploy payment-sheet


pour connceter son phone à l'appli en dev il faut s'assurer que :
    la version d'expo sur le phone est la meme que le projet
    attention au versionning ça a fait planter mon app quand j'ai npm update

    ensuite tu lance expo go sur le phone et tu scan le QR code su rle npm start
    biensur tu te login sur le CLI et sur l'appli en amont