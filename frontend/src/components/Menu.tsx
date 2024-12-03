import MenuItem from "@/components/MenuItem";

function Menu() {
  const menuItems: { imgUrl: string; name: string }[] = [
    { imgUrl: "menu-items/salade.jpg", name: "Salad" },
    { imgUrl: "menu-items/cake.jpg", name: "Cake" },
    { imgUrl: "menu-items/deserts.jpg", name: "Deserts" },
    { imgUrl: "menu-items/pasta.jpg", name: "Pasta" },
    { imgUrl: "menu-items/pure-veg.jpg", name: "Pure Veg" },
    { imgUrl: "menu-items/rolls.jpg", name: "Rulls" },
    { imgUrl: "menu-items/salade.jpg", name: "Pasta" },
    { imgUrl: "menu-items/sandwich.jpg", name: "Sandwich" },
    { imgUrl: "menu-items/noodles.jpg", name: "Noodles" },
  ];
  return (
    <div>
      <div className="container mx-auto">
        <div>
          <h2 className="text-3xl font-medium text-slate-900 mt-7 mb-2">
            Explore our menu
          </h2>
          <p className="w-1/2 text-neutral-500">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Exercitationem inventore saepe ratione et consectetur aliquid atque,
            voluptatibus eius pariatur
          </p>
        </div>
        <div className="flex gap-3 flex-wrap justify-between mt-6">
          {menuItems.map((item, index) => (
            <MenuItem imgUrl={item.imgUrl} itemName={item.name} key={index} />
          ))}
        </div>
        <hr className="mt-12" />
      </div>
    </div>
  );
}

export default Menu;
