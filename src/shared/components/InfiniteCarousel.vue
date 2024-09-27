<template>
  <div class="scroller relative mx-auto h-[100px] w-[90%] overflow-hidden py-2">
    <div class="scroller__inner flex w-max gap-12">
      <div
        v-for="(item, idx) in data"
        :key="`${idx}1`"
        class=""
      >
        <img
          alt=""
          class="h-[50px] object-contain"
          :src="item.image"
        />
      </div>
      <div
        v-for="(item, idx) in data"
        :key="`${idx}1`"
        aria-hidden="true"
        class=""
      >
        <img
          alt=""
          class="h-[50px] object-contain"
          :src="item.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    duration?: number
  }>(),
  {
    duration: 30000,
  },
);

const cssComputed = computed(() => ({ duration: `${props.duration}ms` }));

const data = [
  {
    image: "/images/partners-carousel/MSSP-Global.svg",
  },
  {
    image: "/images/partners-carousel/2.png",
  },
  {
    image: "/images/partners-carousel/3.png",
  },
  {
    image: "/images/partners-carousel/4.png",
  },
  {
    image: "/images/partners-carousel/5.png",
  },
  {
    image: "/images/partners-carousel/6.png",
  },
  {
    image: "/images/partners-carousel/7.png",
  },
];
</script>

<style scoped>
  .scroller {
  -webkit-mask: linear-gradient(
    90deg,
    transparent,
    white 20%,
    white 80%,
    transparent
  );
  mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
}

.scroller__inner {
  animation-name: scroll;
  animation-duration: v-bind('cssComputed.duration');
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}
@keyframes scroll {
  to {
    transform: translate(calc(-50% - 24px));
  }
}
</style>
