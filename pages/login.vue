<template>
    <div class="flex justify-center flex-col align-middle">
        <div class="text-center text-[28px] mb-4 font-bold">Log in</div>
        <div class="px-6 pb-1.5 text-[15px]">Email address</div>
        <div class="px-6 pb-2">
            <InputText
                v-model:input="email"
                placeholder="Email address"
                inputType="email"
                :autoFocus="true"
                :error="errors && errors.email ? errors.email[0] : ''"
            />
        </div>
        <div class="px-6 pb-2">
            <InputText
                v-model:input="password"
                placeholder="Password"
                inputType="password"
            />
        </div>
        <div class="px-6 text-[12px] text-gray-600">Forgot password?</div>
        <div class="px-6 pb-2 mt-6">
            <Button @click="login()"> Log in</Button>
        </div>
    </div>
</template>

<script setup>


const { $userStore } = useNuxtApp();

let email = ref(null);
let password = ref(null);
let errors = ref(5);
const a = unref(errors);
const { $axios } = useNuxtApp();

const login = async () => {
    errors.value = null;
    console.log('userStore', $userStore);
    console.log('$axios', $axios);
    await $axios.post('/login1', {
        email: email.value,
        password: password.value
    });

    try {
        console.log('email', email);
        await $userStore.login(email.value, password.value);
        await $userStore.getUser();
    } catch (error) {
        console.log('error', error);
    }
};
</script>
