import React from "react";
import { PictureSetElement } from "@/shared/ui/PictureSetElement/PictureSetElement";
import { Button } from "@/shared/ui/Button/Button";

import { ProductModalComponentProps } from "./ProductModal.types";
import types from "./ProductModal.module.scss";


const ProductModalComponent: React.FC<ProductModalComponentProps> = ({ product, onAddToCart }) => {

    return (
        <section
            className={types.modalContent}
        >
            <div
                className={types.imgBlock}
            >
                <PictureSetElement
                    avif={product.avif_image ?? undefined}
                    webp={product.webp_image ?? undefined}
                    imageSrc={product.image ?? undefined}
                    alt={product.name}
                    width={250}
                    height={210}
                    loading="lazy"
                    decoding="async"

                />
            </div>

            <section
                className={types.textBlock}
            >
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Цена: {product.price}₽</p>
                <Button
                    onClick={() => onAddToCart(product.id, 1)}
                >Добавить в корзину</Button>
            </section>
        </section>
    )
};

export const ProductModal = React.memo(ProductModalComponent);