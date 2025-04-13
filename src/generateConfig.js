import moment from "moment-jalaali";

const toJalaaliFormat = (format) => {
  let _format;
  _format = format.replace(/(Y{1,4})/, "j$1");
  _format = _format.replace(/(M{1,2})/, "j$1");
  _format = _format.replace(/(D{1,4})/, "j$1");
  return _format;
};

export const generateConfig = {
  // get
  getNow: () => moment(),
  getFixedDate: (string) => moment(string, "jYYYY-jMM-jDD"),
  getEndDate: (date) => {
    const clone = date.clone();
    return clone.endOf("jMonth");
  },
  getWeekDay: (date) => {
    const clone = date.clone().locale("fa_IR");
    return clone.weekday() + clone.localeData().firstDayOfWeek();
  },
  getYear: (date) => date.jYear(),
  getMonth: (date) => date.jMonth(),
  getDate: (date) => date.jDate(),
  getHour: (date) => date.hour(),
  getMinute: (date) => date.minute(),
  getSecond: (date) => date.second(),
  getMillisecond: (date) => date.millisecond(),

  // set
  addYear: (date, diff) => {
    const clone = date.clone();
    return clone.add(diff, "jYear");
  },
  addMonth: (date, diff) => {
    const clone = date.clone();
    return clone.add(diff, "jMonth");
  },
  addDate: (date, diff) => {
    const clone = date.clone();
    return clone.add(diff, "day");
  },
  setYear: (date, year) => {
    const clone = date.clone();
    return clone.jYear(year);
  },
  setMonth: (date, month) => {
    const clone = date.clone();
    return clone.jMonth(month);
  },
  setDate: (date, num) => {
    const clone = date.clone();
    return clone.jDate(num);
  },
  setHour: (date, hour) => {
    const clone = date.clone();
    return clone.hour(hour);
  },
  setMinute: (date, minute) => {
    const clone = date.clone();
    return clone.minute(minute);
  },
  setSecond: (date, second) => {
    const clone = date.clone();
    return clone.second(second);
  },
  setMillisecond: (date, millisecond) => {
    const clone = date.clone();
    return clone.millisecond(millisecond);
  },

  // Compare
  isAfter: (date1, date2) => date1.isAfter(date2),
  isValidate: (date) => date.isValid(),

  locale: {
    getWeekFirstDay: (locale) => {
      const date = moment().locale(locale);
      return date.localeData().firstDayOfWeek();
    },
    getWeekFirstDate: (locale, date) => {
      const clone = date.clone();
      const result = clone.locale(locale);
      return result.jWeekday(0);
    },
    getWeek: (locale, date) => {
      const clone = date.clone();
      const result = clone.locale(locale);
      return result.jWeek();
    },
    getShortWeekDays: (locale) => {
      const date = moment().locale(locale);
      return date.localeData().weekdaysMin();
    },
    getShortMonths: (locale) => {
      const date = moment().locale(locale);
      return date.localeData().monthsShort();
    },
    format: (locale, date, format) => {
      format = toJalaaliFormat(format);
      // console.log('first,', {locale, date, format})
      const clone = date.clone();
      const result = clone.locale(locale);
      return result.format(format);
    },
    parse: (locale, text, formats) => {
      formats = formats.map(f=>toJalaaliFormat(f))
      const fallbackFormatList = [];

      for (let i = 0; i < formats.length; i += 1) {
        let format = formats[i];
        let formatText = text;

        if (format.includes("wo") || format.includes("Wo")) {
          format = format.replace(/wo/g, "w").replace(/Wo/g, "W");
          const matchFormat = format.match(/[-jYyMmDdHhSsWwGg]+/g);
          const matchText = formatText.match(/[-\d]+/g);

          if (matchFormat && matchText) {
            format = matchFormat.join("");
            formatText = matchText.join("");
          } else {
            fallbackFormatList.push(format.replace(/o/g, ""));
          }
        }

        const date = moment(formatText, format, locale, true);
        if (date.isValid()) {
          return date;
        }
      }

      // Fallback to fuzzy matching, this should always not reach match or need fire a issue
      for (let i = 0; i < fallbackFormatList.length; i += 1) {
        const date = moment(text, fallbackFormatList[i], locale, false);

        /* istanbul ignore next */
        if (date.isValid()) {
          // noteOnce(
          //   false,
          //   'Not match any format strictly and fallback to fuzzy match. Please help to fire a issue about this.',
          // );
          return date;
        }
      }

      return null;
    },
  },
};

export default generateConfig;
