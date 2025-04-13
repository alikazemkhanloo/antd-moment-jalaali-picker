# Moment Jalaali Picker
A wrapper for Ant Design's Datepicker to support for persian calendar using `moment-jalaali`.

## Install

```bash
yarn add antd-moment-jalaali-picker

```
or 
```bash
npm i antd-moment-jalaali-picker
```


## Example

```js
import { MomentJalaaliPicker } from 'antd-moment-jalaali-picker';
import moment from "moment-jalaali";

moment.loadPersian({ dialect: "persian-modern" }); // load persian dialect

...

    <MomentJalaaliPicker ... />
...

```

## Note

* Values should be `moment-jalaali` objects.
* `antd` and `moment-jalaali` are peer dependencies.

## Pull Requests

Are welcome.

## Credits

* [rc-picker](https://github.com/react-component/picker)
* [ant design](ant.design)