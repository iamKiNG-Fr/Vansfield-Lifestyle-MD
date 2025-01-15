<template>
    <div>
        <Head>
            <Title>Vansfield Merch | {{ product.title }}</Title>
            <Meta name="description" :content="product.description" />
        </Head>
        <ProductDetails :product="product"/>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>