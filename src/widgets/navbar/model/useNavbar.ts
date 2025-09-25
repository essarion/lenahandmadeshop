import { useGetCurrentUserQuery } from "@/entities/user/model/user.api";


export const useNavbar = () => {

    const { data: user, isLoading } = useGetCurrentUserQuery();

    const isAuthenticated = !!user;

    return {
        user,
        isLoading,
        isAuthenticated
    }
};