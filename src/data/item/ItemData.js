class ItemData {
  constructor(shapeDefinition) {
    this.position = null;
    this.shapeDefinition = shapeDefinition;
  }

  static ITEM_COMPARATOR = (a, b) => {
    if (a.shapeDefinition.id < b.shapeDefinition.id) {
      return -1;
    } else if (a.shapeDefinition.id > b.shapeDefinition.id) {
      return 1;
    } else {
      return 0;
    }
  };
}

export default ItemData;
