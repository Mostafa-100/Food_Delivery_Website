function Intro() {
  return (
    <div className="container px-2 md:px-0 mx-auto">
      <div className="relative bg-[url('intro.jpg')] xl:w-4/5 xl:mx-auto my-3 rounded-xl pt-28 px-16 pb-8 bg-center bg-cover z-10">
        <div
          className="absolute inset-0 w-full h-full bg-orange-500 opacity-60 z-0 rounded-xl"
          style={{ zIndex: -1 }}
        ></div>
        <h2 className="text-6xl font-medium w-2/3 text-white">
          Order your favourite food here
        </h2>
        <p className="text-white mt-3 mb-5 w-2/3">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus
          est minima dolores vero maxime enim perspiciatis necessitatibus sed
          ut, explicabo, quam suscipit? Harum nesciunt qui cumque fugit.
          Temporibus, suscipit velit?
        </p>
        <button className="block bg-white px-6 py-2 rounded-full text-sm text-black hover:bg-transparent hover:text-white border-2 border-white box-border ">
          View Menu
        </button>
      </div>
    </div>
  );
}

export default Intro;
