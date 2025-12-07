import { type FC, type ReactNode } from "react";
import { Link } from "react-router-dom";

type HeaderProps = {
    image: {
        src: string;
        alt: string;
    };
    children: ReactNode;
};

const Header: FC<HeaderProps> = ({ image, children }) => {
    return (
        <Link to={"/"} className="font-bold flex gap-1  sm:text-sm">
            <img width={20} height={20} src={image.src} alt={image.alt} />
            {children}
        </Link>
    );
};

export default Header;
