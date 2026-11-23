import { defineStore } from 'pinia';
import { reactive } from 'vue';
import api from '../api';

export const useGlobalStore = defineStore('global', () => {

    let user = reactive({
        token: localStorage.getItem('token'),
        email: null,
        isAdmin: false
    });

    async function getUserDetails(token) {
        if (!token) {
            user.token = null;
            user.email = null;
            user.isAdmin = false;

            return;
        }

        let { data } = await api.get('/users/details');

        user.token = token;
        user.email = data.user.email;
        user.isAdmin = data.user.isAdmin;
    }

    return {
        user,
        getUserDetails
    };
});