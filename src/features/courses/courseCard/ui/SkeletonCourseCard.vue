<template>
  <div
    class="flex cursor-pointer flex-col items-start gap-3 rounded-3xl border border-[#E5E7EB] bg-white px-7 py-6 transition-all hover:shadow-lg"
  >
    <Skeleton class="w-full rounded-xl" height="181px" />
    <div class="flex flex-row items-center justify-between self-stretch">
      <Skeleton height="25px" width="76px" />
      <Skeleton height="25px" width="86px" />
    </div>
    <Skeleton class="w-full" height="45px" />
    <div class="w-full">
      <Skeleton class="mb-1" width="100%" />
      <Skeleton class="mb-1" width="75%" />
      <Skeleton class="mb-1" width="35%" />
    </div>
  </div>
</template>
