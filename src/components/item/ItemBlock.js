import "./ItemBlock.css";

function ItemBlock(props) {
  return (
    <div
      className="ItemBlock"
      style={{
        borderTop: props.definition.borderTop ? "solid 1px black" : null,
        borderBottom: props.definition.borderBottom ? "solid 1px black" : null,
        borderLeft: props.definition.borderLeft ? "solid 1px black" : null,
        borderRight: props.definition.borderRight ? "solid 1px black" : null,
        height: `${
          50 - (props.definition.borderTop + props.definition.borderBottom)
        }px`,
        width: `${
          50 - (props.definition.borderRight + props.definition.borderLeft)
        }px`,
      }}
    ></div>
  );
}

export default ItemBlock;
