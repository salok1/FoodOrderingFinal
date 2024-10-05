import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/api/orders';
import {useAuth} from "@/providers/AuthProvider";
import {useEffect, useState} from "react";
import {supabase} from "@/lib/supabase";
import {useQueryClient} from "@tanstack/react-query";


export default function OrdersScreen() {
  let { data: orders, isLoading, error } = useMyOrderList();
  const {profile} = useAuth();
  const id = profile.id;
  const queryClient = useQueryClient();

  useEffect(() => {
    const channels = supabase.channel('custom-filter-channel').on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'orders',
              filter: `user_id=eq.${id}`
            },
            (payload) => {
                queryClient.invalidateQueries(['orders', { userId: id }]);
            }
        )
        .subscribe();

    return () => {
      channels.unsubscribe();
    };
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding: 10 }}
    />
  );
}
