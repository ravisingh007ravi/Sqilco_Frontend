export default function ImageHoverExpand() {
    const images = [
        { title: "Solo Leveling Season 2: Arise from the Shadow Hindi", img: "https://i.imgur.com/H8plomd.jpeg" },
        { title: "Hunter X Hunter (2011) Season 3 BluRay Hindi", img: "https://i.imgur.com/yvPlYPS.jpeg" },
        { title: "Yu-Gi-Oh! Zexal Season 1 Dual Audio Hindi", img: "https://i.imgur.com/Vd55x2J.jpeg" },
        { title: "One Piece Season 1: East Blue Saga Multi Audio Hindi", img: "https://i.imgur.com/t2iMNT1.jpeg" },
        { title: "Dragon Ball DAIMA Season 1 Episodes Hindi", img: "https://i.imgur.com/FejTNIM.jpeg" },
    ];

    return (
        <div className="flex flex-col md:flex-col lg:flex-row items-center lg:items-start pt-20 overflow-hidden w-full px-4 md:px-10 lg:px-16 xl:px-32">
            {images.map((image, index) => (
                <div 
                    key={index} 
                    className="relative w-full md:w-4/5 lg:w-1/5 transition-all duration-300 hover:w-full md:hover:w-3/4 lg:hover:w-1/2"
                >
                    <img 
                        src={image.img} 
                        alt={image.title}
                        className="w-full hover:brightness-40 h-60 md:h-80 lg:h-100 object-cover shadow-lg "
                    />
                    <div className="absolute bottom-0 w-full text-base sm:text-lg md:text-xl lg:text-2xl text-white font-bold p-2 text-cente bg-opacity-50">
                        {image.title}
                    </div>
                </div>
            ))}
        </div>
    );
}
