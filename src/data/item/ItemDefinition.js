import shapeDefinition from "./ShapeDefinition";
import { sword, torch, arrow, bandage, lockpicks } from "../../assets/Assets";

export default class ItemDefinition {
  constructor(shapeDefinition, asset) {
    this.shapeDefinition = shapeDefinition;
    this.asset = asset;
  }

  static SWORD = new ItemDefinition(shapeDefinition.LINE, sword);

  static TORCH = new ItemDefinition(shapeDefinition.TWO_LINE, torch);

  static ARROW = new ItemDefinition(shapeDefinition.TWO_LINE, arrow);

  static BANDAGE = new ItemDefinition(shapeDefinition.FLAT_TWO_LINE, bandage);

  static LOCKPICKS = new ItemDefinition(shapeDefinition.SQUARE, lockpicks);
}
