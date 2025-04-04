import React from "react";

const Badge = ({ props }) => {
    return (
        <>
            {props.color === "blue" && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded">
                    {props.text}
                </span>
            )}
         
            {props.color === "green" && (
                <span className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded ">
                    {props.text}
                </span>
            )}
         
        </>
    );
};

export default Badge;