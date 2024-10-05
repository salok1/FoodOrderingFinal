import {useMutation, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";

export const useUpdateProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        async mutationFn(data: any) {
            const { error, data: updatedProfile} = await supabase
                .from('profiles')
                .update({
                    ...data
                })
                .eq('id', data.id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedProfile;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['products']);
            await queryClient.invalidateQueries(['products', id]);
        },
    });
};