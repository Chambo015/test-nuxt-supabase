import { PARTICIPANTS_DATA_FIELDS } from "./enum";
import { Parse } from "~/shared/parse";
import type { ParticipantOfGroupIS } from "~/types/finance.type";

export class AdapterParticipants {
  constructor(private target: ParticipantOfGroupIS) {}

  protected get fullName() {
    return Parse.string(this.target.user_name);
  }

  protected get email() {
    return Parse.string(this.target.email);
  }

  adapt() {
    const adaptee = {
      ...this.target,
      [PARTICIPANTS_DATA_FIELDS.fullName]: this.fullName,
      [PARTICIPANTS_DATA_FIELDS.email]: this.email,
    };

    return adaptee;
  }
};

export type AdapterParticipantsReturnType = ReturnType<AdapterParticipants["adapt"]>;
