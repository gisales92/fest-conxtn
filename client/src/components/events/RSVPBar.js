import React, {useState} from "react";
import * as eventActions from "../../store/events"

const RSVPBar = ({rsvpId}) => {
    const [rsvp, setRSVP] = useState(rsvpId);
    return(
        <div className="rsvp-bar-outer">
            <div className="rsvp-bar-first">
                <span>RSVP here:</span>
            </div>
        </div>
    );

}

export default RSVPBar;