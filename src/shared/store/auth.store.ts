import { AppLangs, type AuthModalType } from "~/shared/enums/common.enum";
import type { User } from "~/shared/models/user.model";
import { AuthRepository } from "~/shared/repository/auth.repository";
import type { Nullable } from "~/types";
import type { User as IUser } from "~/types/user.type";

interface AuthStateType {
  token: Nullable<string>
  modal?: AuthModalType | null
  user?: User
  isPendingProfile: boolean
  localLang: { name: string, code: AppLangs }
};

// TODO: Сделать отдельный Слайс Session с использованием Модели

export const useAuthStore = defineStore("auth", {
  state: (): AuthStateType => ({
    token: null,
    modal: null,
    user: undefined,
    isPendingProfile: true,
    localLang: { name: "РУ", code: AppLangs.RU },
  }),
  getters: {
    isLoggedIn: state => !!state.token && state.user?.is_verified,
    authModalVisible: state => !!state.modal,
    courseIds: (state): number[] => state.user?.journals?.map(e => e.course_id) || [],
  },
  actions: {
    setToken(token: string) {
      this.token = token;
      this.closeAuthModal();
    },
    setUser(payload: User) {
      this.user = payload;
      if (payload) {
        this.isPendingProfile = false;
      }
    },
    async logout() {
      this.$reset();

      try {
        await AuthRepository.logout();
      } catch (error) {
        console.error("@Error Logout", error);
      }
    },
    closeAuthModal() {
      this.modal = null;
    },
    async fetchUser() {
      const { $api } = useNuxtApp();
      this.isPendingProfile = true;
      try {
        const res = await $api<{ data: User }>("user/profile", { method: "GET" });
        this.setUser(res.data);
      } catch (error) {
        console.error("Error fetch profile", error);
        this.logout();
      } finally {
        this.isPendingProfile = false;
      }
    },
  },
  persist: {
    storage: persistedState.cookies,
    key: "auth2", // Cookie key
    paths: ["token", "localLang", "user.is_verified", "user.is_ib"], // Only this fields save in Cookies
  },
});
