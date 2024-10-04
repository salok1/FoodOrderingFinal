import { Text, FlatList, ActivityIndicator } from 'react-native';
import OrderListItem from '@/components/OrderListItem';
import { useMyOrderList } from '@/api/orders';
import { useUpdateOrderSubscriptionList} from '@/api/orders/subscriptions';
import {useAuth} from "@/providers/AuthProvider";
import {string} from "prop-types";

export default function OrdersScreen() {
  let { data: orders, isLoading, error } = useMyOrderList();
  const {profile} = useAuth()
  useUpdateOrderSubscriptionList(profile.id, orders);


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
