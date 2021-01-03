class ShapeDefinition {
  constructor(definition, id) {
    this.id = id;
    this.definition = definition;
  }

  static LINE = new ShapeDefinition(
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    0
  );
  static SQUARE = new ShapeDefinition(
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    2
  );
  static L = new ShapeDefinition(
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    1
  );
}

export default ShapeDefinition;
