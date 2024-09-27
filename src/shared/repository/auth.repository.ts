import { useCi18n } from "~/shared/composables/useCi18n";
import { useFetchApi } from "~/shared/composables/useHttp";
import type { EditProfileDto, LoginDto, RegisterDto, ResetPasswordDto, ResetPasswordWithTokenDTO, SocialAuth } from "~/shared/dto/auth.dto";
import { AuthModalType } from "~/shared/enums/common.enum";
import { HttpMethod } from "~/shared/enums/http.enum";
import { User } from "~/shared/models/user.model";
import { Parse } from "~/shared/parse";
import { useAuthStore } from "~/shared/store/auth.store";

export class AuthRepository {
  static async login(form: LoginDto) {
    const useAuth = useAuthStore();
    const data = await useFetchApi({
      url: "user/auth",
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
      errorMessage: useCi18n("message.loginFailureIncorrectLoginOrPassword"),
    });

    const user = Parse.object(data.data, User.fromJson);

    if (!user) throw new Error("Not Found User");

    useAuth.setToken(data.token);
    useAuth.setUser(user);

    if (user.is_verified) {
      useAuth.closeAuthModal();
    } else {
      useAuth.modal = AuthModalType.CONFIRM;
    }
  }

  static async socialAuth(body: SocialAuth) {
    const useAuth = useAuthStore();
    const data = await useFetchApi({
      url: "user/social-auth",
      headers: {
        method: HttpMethod.POST,
        body,
      },
      successMessage: useCi18n("message.loginSuccess"),
      errorMessage: useCi18n("message.loginFailureIncorrectLoginOrPassword"),
    });

    const user: User = Parse.object(data.data, User.fromJson) as User;
    useAuth.setToken(data.token);
    useAuth.setUser(user);

    if (user.is_verified) {
      useAuth.closeAuthModal();
    } else {
      useAuth.modal = AuthModalType.CONFIRM;
    }
  }

  static async confirm(token: string) {
    const useAuth = useAuthStore();
    const data = await useFetchApi({
      url: "user/verify",
      headers: {
        method: HttpMethod.POST,
        body: { token },
      },
      successMessage: useCi18n("message.loginSuccess"),
      errorMessage: useCi18n("message.loginFailureIncorrectCode"),
    });

    useAuth.setUser(Parse.object(data.data, User.fromJson) as User);
    useAuth.closeAuthModal();
  }

  static async sendVerifyCode() {
    await useFetchApi({
      url: "user/send-verify-token",
      headers: {
        method: HttpMethod.POST,
        body: {},
      },
    });
  }

  static async regis(form: RegisterDto) {
    const useAuth = useAuthStore();
    await useFetchApi({
      url: "user/register",
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
      successMessage: useCi18n("message.registrationSuccess"),
      errorMessage: useCi18n("message.regisFailed"),
    });

    useAuth.modal = AuthModalType.LOGIN;
  }

  static async update(form: EditProfileDto) {
    const useAuth = useAuthStore();
    const data = await useFetchApi({
      url: "user/profile",
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
      successMessage: useCi18n("message.profileUpdateSuccess"),
      errorMessage: useCi18n("message.profileUpdateValidationFailure"),
    });

    useAuth.setUser(Parse.object(data.data, User.fromJson) as User);
  }

  static async resetPassword(form: { email_or_login: string }) {
    const useAuth = useAuthStore();
    await useFetchApi({
      url: "user/reset-password",
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
      successMessage: useCi18n("message.passwordResetLinkSent"),
      errorMessage: useCi18n("message.passwordResetLinkSendFailure"),
    });

    useAuth.modal = undefined;
  }

  static async resetPasswordWithToken(form: ResetPasswordWithTokenDTO) {
    const useAuth = useAuthStore();
    await useFetchApi({
      url: "user/reset-password/change",
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
      successMessage: useCi18n("message.resetPasswordSuccess"),
      errorMessage: useCi18n("message.resetPasswordFailure"),
    });

    useAuth.modal = AuthModalType.LOGIN;
  }

  static async changePassword(form: ResetPasswordDto) {
    const useAuth = useAuthStore();
    await useFetchApi({
      url: "user/change-password",
      headers: {
        method: HttpMethod.POST,
        body: form,
      },
      successMessage: useCi18n("message.resetPasswordSuccess"),
      errorMessage: useCi18n("message.resetPasswordFailure"),
    });

    useAuth.modal = undefined;
  }

  static async logout() {
    await useFetchApi({
      url: "user/logout",
      headers: {
        method: HttpMethod.GET,
      },
    });
  }

  static async getHobbyDirection() {
    return useFetchApi({
      url: "catalog/hobby-direction",
      headers: {
        method: HttpMethod.GET,
      },
    });
  }

  static async getJobDirection() {
    return useFetchApi({
      url: "catalog/job-direction",
      headers: {
        method: HttpMethod.GET,
      },
    });
  }

  static async getJobPosition() {
    return useFetchApi({
      url: "catalog/job-position",
      headers: {
        method: HttpMethod.GET,
      },
    });
  }
}
