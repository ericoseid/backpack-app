import ShapeBlockDefinition from "./ShapeBlockDefinition";

class ShapeDefinition {
  constructor(definition, id) {
    this.id = id;
    this.definition = definition;
  }

  static LINE = new ShapeDefinition(
    [
      new ShapeBlockDefinition(0, 0, true, false, true, true),
      new ShapeBlockDefinition(1, 0, false, false, true, true),
      new ShapeBlockDefinition(2, 0, false, true, true, true),
    ],
    0
  );
  static SQUARE = new ShapeDefinition(
    [
      new ShapeBlockDefinition(0, 0, true, false, true, false),
      new ShapeBlockDefinition(0, 1, true, false, false, true),
      new ShapeBlockDefinition(1, 0, false, true, true, false),
      new ShapeBlockDefinition(1, 1, false, true, false, true),
    ],
    2
  );
  static L = new ShapeDefinition(
    [
      new ShapeBlockDefinition(0, 0, true, false, true, true),
      new ShapeBlockDefinition(1, 0, false, false, true, true),
      new ShapeBlockDefinition(2, 0, false, true, true, false),
      new ShapeBlockDefinition(2, 1, true, true, false, true),
    ],
    1
  );
}

export default ShapeDefinition;
