<template>
  <div>
    <div>
      <Skeleton height="24px" width="50px" />
      <Skeleton class="mt-2" height="20px" width="150px" />
    </div>

    <Divider />

    <div class="justify-between gap-6 sm:flex">
      <div class="w-full">
        <Skeleton height="20px" width="50px" />
        <Skeleton class="mt-2" height="24px" />
      </div>
      <div class="mt-6 w-full sm:mt-0">
        <Skeleton height="20px" width="50px" />
        <Skeleton class="mt-2" height="24px" />
      </div>
    </div>

    <div class="mt-6 w-full">
      <Skeleton height="20px" width="50px" />
      <Skeleton class="mt-2" height="24px" />
    </div>

    <div class="mt-6 gap-2 sm:flex">
      <Skeleton height="64px" shape="circle" width="64px" />
      <Skeleton class=" w-full" height="138px" />
    </div>

    <Divider />
    <div class="mt-6 flex justify-end">
      <Skeleton height="40px" width="80px" />
      <Skeleton class="ml-3" height="40px" width="80px" />
    </div>
  </div>
</template>
