import React from "react";

import FooterColumn from "./FooterColumn/FooterColumn";
import styles from "./Footer.css";

const Footer = props => {
    return(
        <div className={styles.Footer}>
            <FooterColumn />
            <FooterColumn />
            <FooterColumn />
        </div>
    )
}

export default Footer;