import {User } from "../../types";

export type Action =
  | {
      type: "LOG IN";
      payload: User;
    }
  | {
      type: "LOG OUT";
      payload: User;
    }
  