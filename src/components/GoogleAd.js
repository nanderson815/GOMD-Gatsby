import * as React from "react";

export default ({ type, client, slot, format = 'auto' }) => {

    if (type === "banner") {
        return (
            <div>
                <ins className="adsbygoogle"
                    style={{ display: 'block' }}
                    data-full-width-responsive="true"
                    data-ad-client={client}
                    data-ad-slot={slot}
                    data-ad-format={format}></ins>
            </div>
        )
    }

}