<template>
  <Dialog
    v-model:visible="model"
    dismissable-mask
    header="Поделиться"
    modal
    :style="{ width: 'min(25rem,90vw)' }"
  >
    <div class="flex flex-col items-center">
      <Button
        icon-pos="right"
        :label="fullPath"
        outlined
        :pt="{
          root: 'flex-row-reverse',
        }"
        size="small"
        @click="copyLink(fullPath)"
      >
        <template #icon>
          <LinkIcon class="ml-2 h-5 text-2xl !leading-none" />
        </template>
      </Button>

      <div class="mt-5 flex gap-2">
        <Button
          aria-label="Whatsapp"
          class="aspect-square size-12 !p-1"
          rounded
          severity="warning"
          @click="whatsappShare(fullPath)"
        >
          <WhatsappIcon class="text-2xl" />
        </Button>
        <Button
          aria-label="Telegram"
          class="aspect-square size-12 !p-1"
          rounded
          severity="info"
          @click="telegramShare(fullPath, {})"
        >
          <TelegramIcon class="text-2xl" />
        </Button>
        <Button
          aria-label="Twitter"
          class="aspect-square size-12 !p-1"
          rounded
          severity="contrast"
          @click="twitterShare(fullPath, {})"
        >
          <TwitterIcon class="text-2xl" filled />
        </Button>
      </div>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import WhatsappIcon from "~/assets/images/icons/whatsapp.svg";
import TelegramIcon from "~/assets/images/icons/telegram.svg";
import TwitterIcon from "~/assets/images/icons/twitter.svg";
import LinkIcon from "~/assets/images/icons/link.svg";
import { useCopyToClipboard } from "~/shared/composables/useCopyToClipboard";
import { useShare } from "~/shared/composables/useShare";

const model = defineModel<boolean>();
const { copy } = useCopyToClipboard();
const { whatsappShare, telegramShare, twitterShare } = useShare();
const toast = useToast();
const fullPath = computed(() => window.location.href);

async function copyLink(link: string) {
  const res = await copy(link);
  toast.add({ severity: res ? "success" : "error", summary: res ? "Ссылка на пост скопирована" : "Не удалось скопировать ссылку", life: 3000 });
  model.value = false;
}
</script>

<style scoped>

</style>
