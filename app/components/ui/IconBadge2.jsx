// Componente reutilizable para el ícono decorativo
const IconBadge = ({
    icon: Icon,
    image,
    iconColor = "text-black",
    bgColor = "bg-[#00BBFF]",
    position = "center",
    size = "large",
    darkBg = "bg-[#101010]",
    lightBg = "bg-[#1E1E1E]"
}) => {
    const sizeClasses = {
        small: { icon: "h-6 w-6", padding: "p-3", container: "h-3 w-3" },
        medium: { icon: "h-7 w-7", padding: "p-3", container: "h-3 w-3" },
        large: { icon: "h-9 w-9", padding: "p-5", container: "h-4 w-4" }
    };

    const positionClasses = {
        "top-right": "absolute top-0 right-0",
        "top-left": "absolute top-0 left-0 scale-x-[-1]",
        "bottom-right": "absolute bottom-0 right-0 scale-y-[-1]",
        "bottom-left": "absolute bottom-0 left-0 scale-x-[-1] scale-y-[-1]",
        "center": "absolute top-0 left-1/2 transform -translate-x-1/2 "
    };

    const currentSize = sizeClasses[size];

    return (
        <div className={positionClasses[position]}>
            <div className="flex flex-row">
                <div className={`${darkBg} ${currentSize.container}`}>
                    <div className={`${lightBg} rounded-tr-3xl ${currentSize.container}`}>
                    </div>
                </div>
                <div className={`${darkBg} rounded-b-3xl ${currentSize.padding}`}>
                    <div className={`${bgColor} rounded-2xl ${currentSize.padding}`}>
                            <img 
                                src={`/assets/proyectos/ImgsProyectos/${image}`} 
                                alt="Badge image" 
                                className={`${currentSize.icon} object-cover rounded`}
                            />
                    </div>
                </div>
                <div className={`${darkBg} ${currentSize.container}`}>
                    <div className={`${lightBg} rounded-tl-3xl ${currentSize.container}`}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IconBadge; 