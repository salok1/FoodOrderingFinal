import {useMutation, useQueryClient} from "@tanstack/react-query";
import {supabase} from "@/lib/supabase";

export const useUpdateProfile = (formData, id) => {

    const queryClient = useQueryClient();

    console.log('Form submitted:', formData, id);

    return useMutation({
        async mutationFn(formData, id: any) {
            const { error, data: updatedProduct } = await supabase
                .from('profiles')
                .update({
                    username: formData.username,
                    full_name: formData.fullName,
                    avatar_url: formData.avatarUrl,
                    website: formData.website,
                    group: formData.group
                })
                .eq('id', id)
                .select()
                .single();

            if (error) {
                throw new Error(error.message);
            }
            return updatedProduct;
        },
        async onSuccess(_, { id }) {
            await queryClient.invalidateQueries(['profile']);
            await queryClient.invalidateQueries(['profile', id]);
        },
    });
};