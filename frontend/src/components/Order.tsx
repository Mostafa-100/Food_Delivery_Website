import packageIcon from "../assets/package.png";

interface OrderProps {
  description: string;
  montant: number;
  numberOfItems: number;
  status: string;
}

function Order(props: OrderProps) {
  let statusColor = "";

  switch (props.status) {
    case "food processing":
      statusColor = "bg-neutral-500";
      break;
    case "delivered":
      statusColor = "bg-green-500";
      break;
    case "out for delivery":
      statusColor = "bg-blue-500";
      break;
  }

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center py-2 px-4 border border-neutral-400 mb-4">
      <img src={packageIcon} className="w-16" />
      <div className="max-w-80 text-sm">{props.description}</div>
      <div>${props.montant}</div>
      <div>Items: {props.numberOfItems}</div>
      <div>
        <span
          className={`inline-block mr-1 size-3 rounded-full ${statusColor}`}
        ></span>
        <span className="capitalize">{props.status}</span>
      </div>
      <button className="py-1.5 px-6 bg-red-200 hover:bg-red-300 text-red-500 hover:text-red-600 transition-colors">
        Track Order
      </button>
    </div>
  );
}

export default Order;
