<template lang="">
    <h2>Here is some button type</h2>
    <div class="card flex justify-center gap-5">
        <Button label="Show toast" @click="show()" />
        <Button label="Secondary" severity="secondary" />
        <Button label="Success" severity="success" />
        <Button label="Info" severity="info" />
        <Button label="Warning" severity="warning" />
        <Button label="Help" severity="help" />
        <Button label="Danger" severity="danger" />
    </div>
</template>
<script setup>
import { useToast } from 'primevue/usetoast';

const toast = useToast();

const show = () => {
    toast.add({
        severity: 'success',
        summary: 'Info',
        detail: 'Message Content',
        life: 3000
    });
};
</script>
<style lang=""></style>
