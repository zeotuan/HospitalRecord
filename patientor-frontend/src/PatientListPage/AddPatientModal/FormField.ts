import {Gender} from "../../types";
import {Option} from '../../components/FormField';
// structure of a single option
export interface GenderOption extends Option {
  value: Gender;
}