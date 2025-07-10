import React from "react";
import classNames from "classnames";


const About = ({ dataCategory, classPrefix }) => {

    return (
        <section className={classNames(`${classPrefix}__about`)}>
            <h2>{dataCategory.about?.title}</h2>
            <p>{dataCategory.about?.text}</p>
        </section>
    )
};

export default About;