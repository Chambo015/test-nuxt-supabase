<template>
  <div>
    <div class="mb-4 mt-8 rounded-xl bg-white p-6">
      <div class="head flex items-center gap-5">
        <Skeleton class="shrink-0" shape="circle" size="3rem" />
        <Skeleton height="2rem" width="10rem" />
      </div>
      <Divider class="mb-4 mt-6" />
      <Skeleton class="my-6" height="410px" />
      <div class="mt-4 text-base text-gray-600">
        <template v-for="i in 5" :key="i">
          <Skeleton class="mb-2" />
          <Skeleton class="mb-2" />
          <Skeleton class="mb-2" />
          <Skeleton class="mb-2 max-w-[50%]" />
        </template>
      </div>
      <div class="mt-6 flex h-12 items-center gap-4">
        <Skeleton class="h-full" height="3rem" />
        <Skeleton class="h-12" height="3rem" />
      </div>
    </div>
    <Skeleton v-for="i in 5" :key="i" class="mb-4" height="76px" />
  </div>
</template>
