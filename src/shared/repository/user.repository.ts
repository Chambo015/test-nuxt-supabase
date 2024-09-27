import { useFetchApi } from "~/shared/composables/useHttp";
import { useAuthStore } from "~/shared/store/auth.store";
import { useCi18n } from "~/shared/composables/useCi18n";
import { Parse } from "~/shared/parse";
import { User } from "~/shared/models/user.model";
import { HttpMethod } from "~/shared/enums/http.enum";

export class UserRepository {
  static async getUser() {
    const useAuth = useAuthStore();
    const data = await useFetchApi({
      url: "user/profile",
      headers: {
        method: HttpMethod.GET,
      },
    });

    useAuth.setUser(Parse.object(data.data, User.fromJson) as User);
  }

  static async saveUserAvatar(file: File) {
    const useAuth = useAuthStore();
    const formData = new FormData();
    formData.append("photo", file);

    const data = await useFetchApi({
      url: "user/save-photo",
      headers: {
        method: HttpMethod.POST,
        body: formData,
      },
      successMessage: useCi18n("message.uploadSuccess"),
      errorMessage: useCi18n("message.loginFailureIncorrectUsername"),
    });

    useAuth.setUser(Parse.object(data.data, User.fromJson) as User);
  }
}
