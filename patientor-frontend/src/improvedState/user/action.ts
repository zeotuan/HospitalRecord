import {User } from "../../types";

export type Action =
  | {
      type: "SET USER";
      payload: User;
    }
  | {
      type: "LOG OUT";
      payload: null;
    }
  