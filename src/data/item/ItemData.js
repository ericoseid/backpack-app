class ItemData {
  constructor(itemDefinition) {
    this.position = null;
    this.itemDefinition = itemDefinition;
  }

  static ITEM_COMPARATOR = (a, b) => {
    if (
      a.itemDefinition.shapeDefinition.height <
      b.itemDefinition.shapeDefinition.height
    ) {
      return -1;
    } else if (
      a.itemDefinition.shapeDefinition.height >
      b.itemDefinition.shapeDefinition.height
    ) {
      return 1;
    } else {
      return 0;
    }
  };
}

export default ItemData;
