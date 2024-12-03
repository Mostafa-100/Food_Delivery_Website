interface MenuItemsProps {
  imgUrl: string;
  itemName: string;
}

function MenuItem({ imgUrl, itemName }: MenuItemsProps) {
  return (
    <div className="cursor-pointer">
      <img src={imgUrl} className="size-24 object-cover rounded-full" />
      <div className="text-sm text-center text-slate-500">{itemName}</div>
    </div>
  );
}

export default MenuItem;
