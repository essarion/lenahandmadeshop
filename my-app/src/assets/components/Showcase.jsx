import React from "react";
import classNames from "classnames";

const Showcase = ({ dataCategory, classPrefix }) => {

    return (
        <section className={classNames(`${classPrefix}__showcase`)}>
            <h2>{dataCategory.showcase?.title}</h2>
            <div className={classNames(`${classPrefix}__showcase__product-directiry`)}>
                {dataCategory.showcase?.items?.map((item, index) => (
                    <div key={index}
                        style={{
                            backgroundImage: `linear-gradient(to top, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 80%), 
    image-set(
      url('${item.avif_background_image}') type('image/avif'),
      url('${item.webp_background_image}') type('image/webp'),
      url('${item.background_image}') type('image/jpeg')
    )`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                        className={classNames(`${classPrefix}__showcase__product-directiry__product-element`)}
                    >

                        <p>{item.text_top}</p>
                        <h3>{item.page_name}</h3>
                        <p>{item.text_bottom}</p>
                    </div>
                ))}
            </div>

        </section>
    )
};
export default Showcase;