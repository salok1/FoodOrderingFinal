import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export const useInsertOrderSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const ordersSubscription = supabase
            .channel('custom-insert-channel')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'orders' },
                (payload) => {
                    console.log('Change received!', payload);
                    queryClient.invalidateQueries(['orders']);
                }
            )
            .subscribe();

        return () => {
            ordersSubscription.unsubscribe();
        };
    }, []);
};

export const useUpdateOrderSubscription = (id: number) => {
    const queryClient = useQueryClient();

    useEffect(() => {
        const orders = supabase
            .channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'orders',
                    filter: `id=eq.${id}`,
                },
                (payload) => {
                    queryClient.invalidateQueries(['orders', id]);
                }
            )
            .subscribe();

        return () => {
            orders.unsubscribe();
        };
    }, []);
};

export const useUpdateOrderSubscriptionList = (id: string, orders) => {

    const queryClient = useQueryClient();

//    const [orders, setOrders] = useState(0);

    let newOrders = orders;

    console.log ("1111111111111111111" ,newOrders)

    useEffect(() => {
        const channels = supabase.channel('custom-filter-channel')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'orders',
                    filter: `user_id=eq.${id}`
                },
                (payload) => {
                    newOrders.forEach((element, index) => {
                        if(element.id === payload.new.id) {
                            element.status = payload.new.status;
                            newOrders[index] = element;
                        }
                    });
                }
            )
            .subscribe()

        return () => {
            channels.unsubscribe();
        };
    }, []);

    console.log ("22222222222222222222", newOrders);

    return newOrders;
};


