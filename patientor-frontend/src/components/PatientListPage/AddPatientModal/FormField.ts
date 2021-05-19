import {Gender} from "../../../types";
import {Option} from '../../FormField';
// structure of a single option
export interface GenderOption extends Option {
  value: Gender;
}