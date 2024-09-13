type EnumItemValue = number | string;

interface EnumItem {
  readonly key: string;
  readonly value: EnumItemValue;
  readonly text: string;
  readonly color?: string;
}

export default class Enum {
  private readonly enumList: ReadonlyArray<EnumItem>;

  constructor(enumValues: readonly [string, EnumItemValue, string, string?][]) {
    this.enumList = Object.freeze(
      enumValues.map(([key, value, text, color]) =>
        Object.freeze({ key, value, text, color })
      )
    );
    enumValues.forEach(([key, value]) => {
      this[key] = value;
    });
  }

  // 获取枚举值对象列表
  getList(): ReadonlyArray<EnumItem> {
    return this.enumList;
  }

  // 通过 value 获取对应的 text
  getText(value: EnumItemValue): string | "" {
    const enumItem = this.enumList.find((item) => item.value === value);
    return enumItem ? enumItem.text : "";
  }

  // 通过 key 获取对应的 value
  getValue(key: string): EnumItemValue | "" {
    const enumItem = this.enumList.find((item) => item.key === key);
    return enumItem ? enumItem.value : "";
  }

  getItem(keyOrValue: string | number): EnumItem {
    return this.enumList.find(
      (item) => item.key === keyOrValue || item.value === keyOrValue
    ) as EnumItem;
  }
}
