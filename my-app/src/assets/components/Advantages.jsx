import React from "react";
import classNames from "classnames";


const Advantages = ({ dataCategory, classPrefix }) => {

    return (
        <section className={classNames(`${classPrefix}__advantages`)}>
            <h2>Преимущества</h2>
            <div className={classNames(`${classPrefix}__advantages__elements-field`)}>
                {dataCategory.advantages?.map((advantage, index) => {
                    return (<div key={index}
                        className={classNames(`${classPrefix}__advantages__elements-field__element`)}>
                        <img src={`http://localhost:8000${advantage.icon}`} alt={advantage.title} />
                        <h3>{advantage.title}</h3>
                        <p>{advantage.description}</p>
                    </div>)
                })}
            </div>

        </section>
    )
};
export default Advantages;