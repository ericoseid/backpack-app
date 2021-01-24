import shapeDefinition from "./ShapeDefinition";
import { sword, torch } from "../../assets/Assets";

export default class ItemDefinition {
  constructor(shapeDefinition, asset) {
    this.shapeDefinition = shapeDefinition;
    this.asset = asset;
  }

  static SWORD = new ItemDefinition(shapeDefinition.LINE, sword);

  static TORCH = new ItemDefinition(shapeDefinition.TWO_LINE, torch);
}
