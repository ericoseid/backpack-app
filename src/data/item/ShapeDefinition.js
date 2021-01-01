class ShapeDefinition {
  constructor(definition) {
    this.definition = definition;
  }

  static LINE = new ShapeDefinition([
    [0, 0],
    [1, 0],
    [2, 0],
  ]);
  static SQUARE = new ShapeDefinition([
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ]);
  static L = new ShapeDefinition([
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
  ]);
}

export default ShapeDefinition;
