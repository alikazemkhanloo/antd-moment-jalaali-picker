import { DatePicker } from "antd";
import moment, { Moment } from "moment-jalaali";
import generateConfig from "./generateConfig";

export const MomentJalaaliPicker = DatePicker.generatePicker<Moment>(generateConfig);

