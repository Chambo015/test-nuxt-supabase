<!-- <template>
  <div>
    <div v-for="f in formValidator" :key="form[f.$label].key" class="mb-5">
      <label class="text-sm font-medium text-gray-700" :for="form[f.$label].key">{{
        $t(`actions.${form[f.$label].key}`)
      }}</label>
      <Password
        v-if="form[f.$label].pass"
        :id="form[f.$label].key"
        v-model="f.$value"
        class="mt-1 h-10 w-full font-light"
        :feedback="form[f.$label].key === 'password'"
        :invalid="!!f.$error && submitting"
        medium-label="Средней надежности"
        prompt-label="Введите пароль"
        strong-label="Надежный пароль 👍"
        strong-regex="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,}"
        weak-label="Не надежный пароль" />

      <Dropdown
        v-else-if="form[f.$label].select"
        :id="form[f.$label].key"
        v-model="f.$value"
        class="w-full h-10 mt-1 font-light"
        :invalid="!!f.$error && submitting"
        option-label="name"
        option-value="id"
        :options="sectionsData[f.$label]" />

      <InputText
        v-else
        :id="form[f.$label].key"
        v-model="f.$value"
        class="w-full h-10 mt-1 font-light"
        :invalid="!!f.$error && submitting" />
      <span v-if="f.$error && submitting" class="text-xs text-red-500">{{ f.$error.message }}</span>
    </div>

    <Button class="h-11 w-full bg-violet-600" type="button" @click="submit">
      <i v-if="loaderBtn" class="pi pi-spin pi-spinner text-white" style="font-size: 16px"></i>
      <template v-else>
        {{ $t("actions.regis") }}
      </template>
    </Button>
  </div>
</template>

<script setup lang="ts">
import { defineForm, field, isValidForm } from "vue-yup-form";
import { number, string } from "yup";
import { AuthRepository } from "~/shared/repository/auth.repository";

const { t } = useI18n();
interface formType {
  name: string;
  placeholder: string;
  pass?: true;
  select?: true;
  key?: string;
  data?: { name: string; id: number }[];
}
const regExpPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*?[#?!@$%^&*-]).{8,}/;
const loaderBtn = ref(false);
const submitting = ref(false);

function generateForm() {
  const name = field("", string().label("name").required(t("validation.requiredFieldError")));
  const login = field(
    "",
    string().label("login").required(t("validation.requiredFieldError")).email(t("validation.emailFormatError")),
  );
  const password = field(
    "",
    string()
      .matches(
        regExpPass,
        "Пароль должен содержать  не менее 8 символов, не менее одной заглавной буквы, цифры и специальный символ(#?!@$%^&*-)",
      )
      .label("password")
      .required(t("validation.requiredFieldError"))
      .min(8, t("validation.passwordLengthError")),
  );
  const re_password = field("", () =>
    string()
      .label("re_password")
      .required(t("validation.requiredFieldError"))
      .oneOf([password.$value], () => t("validation.passwordDoesNotMatch")),
  );
  const industry = field("", number().label("jobDirection").required(t("validation.requiredFieldError")));
  const position = field("", number().label("jobPosition").required(t("validation.requiredFieldError")));
  const interesting = field("", number().label("hobbyDirection").required(t("validation.requiredFieldError")));

  return defineForm({
    name,
    login,
    password,
    re_password,
    industry,
    position,
    interesting,
  });
}
const formValidator = generateForm();

const sectionsData = reactive<Record<string, { name: string; id: number }[]>>({
  jobDirection: [],
  jobPosition: [],
  hobbyDirection: [],
});
async function getSectionsData() {
  try {
    const dataHobby = await AuthRepository.getHobbyDirection();
    sectionsData.hobbyDirection = dataHobby.data.reverse();
    const dataJobDir = await AuthRepository.getJobDirection();
    sectionsData.jobDirection = dataJobDir.data.reverse();
    const dataJobPos = await AuthRepository.getJobPosition();
    sectionsData.jobPosition = dataJobPos.data.reverse();
  } catch (error) {
    console.error("Sections Data", error);
  }
}

onMounted(() => {
  getSectionsData();
});

const form = ref<Record<string, formType>>({
  name: {
    name: "Имя",
    key: "name",
    placeholder: "Введите ваше имя",
  },
  login: {
    name: "E-mail",
    key: "email",
    placeholder: "Введите ваш e-mail",
  },
  password: {
    name: "Пароль",
    key: "password",
    placeholder: "Введите пароль",
    pass: true,
  },
  re_password: {
    name: "Повторите пароль",
    key: "confPassword",
    placeholder: "Введите пароль",
    pass: true,
  },
  jobDirection: {
    name: "Укажите сферу деятельности",
    placeholder: "Выберите деятельность",
    select: true,
    key: "industry",
  },
  jobPosition: {
    name: "Укажите позицию",
    placeholder: "Укажите позицию",
    select: true,
    key: "position",
  },
  hobbyDirection: {
    name: "Что больше интересует?",
    placeholder: "Выберите вариант",
    key: "interesting",
    select: true,
  },
});

async function submit() {
  submitting.value = true;
  loaderBtn.value = true;

  try {
    if (isValidForm(formValidator)) {
      await AuthRepository.regis({
        name: formValidator.name.$value,
        last_name: formValidator.name.$value,
        login: formValidator.name.$value,
        email: formValidator.login.$value,
        password: formValidator.password.$value,
        re_password: formValidator.password.$value,
        // job_direction_id: +formValidator.industry.$value,
        // hobby_direction_id: +formValidator.interesting.$value,
        // job_position_id: +formValidator.position.$value,
      });
    }
  } catch (error) {
    console.error("@regis", error);
  } finally {
    loaderBtn.value = false;
  }
}
</script>

<style scoped lang="scss"></style> -->
