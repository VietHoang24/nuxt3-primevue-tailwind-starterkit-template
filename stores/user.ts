import { defineStore } from 'pinia'
import axios from '../plugins/axios'
import { useAxiosInstance } from '~/api';
import { USER_API_PATH } from '~/constants/apiPath';

const $axios =  useAxiosInstance

interface IUserStoreState {
    id: string;
    name: string;
    bio: string;
    image: string;
}

export const useUserStore = defineStore('user', {
    state: (): IUserStoreState => ({
        id: '',
        name: '',
        bio: '',
        image: ''
    }),
    actions: {

        async getTokens(): Promise<void> {
            await $axios().get(USER_API_PATH.getTokens)
        },

        async login(email: string, password: string): Promise<void> {
            console.log('$axios', axios)
            await $axios().post(USER_API_PATH.login, {
                email: email,
                password: password
            })
        },

        async register(name: string, email: string, password: string, confirmPassword: string): Promise<void> {
            await $axios().post(USER_API_PATH.register, {
                name: name,
                email: email,
                password: password,
                password_confirmation: confirmPassword
            })
        },

        async getUser(): Promise<void> {
            let res = await $axios().get(USER_API_PATH.getUser)

            this.$state.id = res.data[0].id
            this.$state.name = res.data[0].name
            this.$state.bio = res.data[0].bio
            this.$state.image = res.data[0].image
        },

        async updateUserImage(data: any): Promise<any> {
            return await $axios().post(USER_API_PATH.updateImage, data)
        },

        async updateUser(name: string, bio: string): Promise<any> {
            return await $axios().patch(USER_API_PATH.updateUser, {
                name: name,
                bio: bio
            })
        },

        async logout(): Promise<void> {
            await $axios().post(USER_API_PATH.logout)
            this.resetUser()
        },

        resetUser(): void {
            this.$state.id = ''
            this.$state.name = ''
            this.$state.bio = ''
            this.$state.image = ''
        }

    },
})
