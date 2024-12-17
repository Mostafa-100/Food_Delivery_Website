interface OrderInputProps {
  type: string;
  name: string;
  placeholder: string;
}

function OrderInput(props: OrderInputProps) {
  return (
    <input
      type={props.type}
      name={props.name}
      placeholder={props.placeholder}
      className="border border-neutral-200 py-1.5 px-2 rounded-md grow"
      required
    />
  );
}

export default OrderInput;
