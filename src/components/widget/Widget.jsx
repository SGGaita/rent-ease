import "./widget.scss";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import RoofingIcon from '@mui/icons-material/Roofing';
import PeopleIcon from '@mui/icons-material/People';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import { Link } from "react-router-dom";

export const Widget = ({ type }) => {
    let data;

    //temporary

    const amount = 100;
    const diff = 20;

    switch (type) {
        case "properties":
            data = {
                title: "PROPERTIES",
                isMoney: false,
                link: "See all properties",
                route: "properties/view-properties",
                icon: (
                    <RoofingIcon
                        className="icon"
                        style={{
                            color: "black",
                            backgroundColor: "rgba(49, 49, 49, 0.2)",
                        }}
                    />
                )
            };
            break;
        case "tenant":
            data = {
                title: "TENANTS OCCUPANCY",
                isMoney: false,
                link: "View all tenants",
                icon: (
                    <PeopleIcon className="icon"
                        style={{
                            color: "black",
                            backgroundColor: "rgba(49, 49, 49, 0.2)",
                        }}
                    />
                )
            };
            break;
        case "earning":
            data = {
                title: "REVENUE",
                isMoney: true,
                link: "View earnings",
                icon: (
                    <MonetizationOnIcon className="icon"
                        style={{
                            color: "black",
                            backgroundColor: "rgba(49, 49, 49, 0.2)",
                        }}
                    />
                )
            };
            break;
        case "arrears":
            data = {
                title: "ARREARS",
                isMoney: false,
                link: "View all overdue payments",
                icon: (
                    <MoneyOffIcon className="icon"
                        style={{
                            color: "black",
                            backgroundColor: "rgba(49, 49, 49, 0.2)",
                        }}
                    />
                )
            };
            break;
        default:
            break;
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">
                    {data.isMoney && "$"} {amount}
                </span>
                <span className="link"><Link to={data.route}>{data.link}</Link></span>
            </div>
            <div className="right">
                <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff}%
                </div>
                {data.icon}
            </div>
        </div>
    )
}

