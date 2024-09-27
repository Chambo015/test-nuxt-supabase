<template>
  <div class="local-container container pb-16 pt-9 md:pl-sidebarWidth">
    <h2 class="mb-7 ml-4 text-3xl font-bold sm:ml-0">
      {{ $t("actions.profile") }}
    </h2>

    <div class="feed-card rounded-xl bg-white p-4 sm:p-6">
      <div class="tabs mb-2 flex">
        <Button
          class="btn rounded-none pt-0 text-sm font-medium hover:bg-transparent hover:text-violet-600"
          :class="{ active: active === 0 }"
          :label="$t('pages.profile.all.title')"
          :plain="active !== 0"
          :text="true"
          @click="active = 0"
        />
        <Button
          class="btn rounded-none pt-0 text-sm font-medium hover:bg-transparent hover:text-violet-600"
          :class="{ active: active === 1 }"
          :label="$t('actions.password')"
          :plain="active !== 1"
          :text="true"
          @click="active = 1"
        />
      </div>
      <template v-if="active === 0">
        <ProfileInfo />
      </template>
      <template v-if="active === 1">
        <ProfilePassword />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileInfo from "./_tabs/profile-info.vue";
import ProfilePassword from "./_tabs/profile-password.vue";

definePageMeta({
  auth: true,
});

const active = ref(0);
</script>

<style scoped lang="scss">
.local-container {
  h2 {
    font-family: 'Neue Machina', sans-serif;
  }

  .tabs {
    border-bottom: 1px solid var(--gray-50);

    .btn {
      margin-bottom: -1px;
      border-bottom: 2px solid transparent;
    }
    .active {
      border-color: var(--purple-600);
    }
  }
}
</style>
