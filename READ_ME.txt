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


