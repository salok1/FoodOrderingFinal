// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { stripe } from '../_utils/stripe.ts';
import { createOrRetrieveProfile } from '../_utils/supabase.ts';

// payment-sheet :

serve(async (req: Request) => {


  try {
    const { amount } = await req.json();

    const customer = await createOrRetrieveProfile(req);

    // Create an ephermeralKey so that the Stripe SDK can fetch the customer's stored payment methods.
    const ephemeralKey = await stripe.ephemeralKeys.create(
        { customer: customer },
        { apiVersion: '2020-08-27' }
    );



    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customer,
    });



    const res = {
      paymentIntent: paymentIntent.client_secret,
      publishableKey: Deno.env.get('EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY'),
      customer: customer,
      ephemeralKey: ephemeralKey.secret,
    };

    return new Response(JSON.stringify(res), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify(error), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});


/*

npx supabase functions new payment-sheet
npx supabase functions serve --env-file .env payment-sheet

then from bash :


To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  from bash :

  curl -i --location --request POST 'https://twuqldjssuvahdhrhhpp.supabase.co/functions/v1/payment-sheet' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"amount":1150}'

*/
