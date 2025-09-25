'use client';

import { useCallback } from "react";
import { CatalogItem } from "@/entities/catalogItem/CatalogItem";
import { useModal } from "@/shared/ui/Modal";
import { useAddCartItemMutation } from "@/shared/api/Cart/api/cart.api";
import { ProductModal } from "@/entities/productForModal";
import { ServiceItemType } from "@/shared/types";
import { useAuthRedirect } from "@/shared/lib/useAuthRedirect";
import styles from "@/widgets/catalog/catalog.module.scss";

interface CatalogProps {
    services: ServiceItemType[];
}

export const Catalog: React.FC<CatalogProps> = ({ services }) => {
    const { handleModalOpen, handleModalClose } = useModal();
    const [addCartItem] = useAddCartItemMutation();
    const { withAuth } = useAuthRedirect(handleModalClose);

    const openProductModal = useCallback(
        (slug: string) => {
            const product = services.find((item) => item.slug === slug);
            if (!product) return;

            const handleAddToCart = withAuth(async (productId: number, quantity: number) => {
                try {
                    await addCartItem({ service_id: productId, quantity }).unwrap();
                    console.log("Товар добавлен в корзину");
                } catch (error) {
                    console.error("Ошибка при добавлении товара:", error);
                }
            });

            handleModalOpen(
                <ProductModal
                    product={product}
                    onAddToCart={handleAddToCart}
                />
            );
        },
        [services, addCartItem, handleModalOpen, withAuth]
    );

    return (
        <section className={styles.catalog}>
            {services?.map((service) => (
                <CatalogItem
                    key={service.id}
                    service={service}
                    onOpenModal={openProductModal}
                />
            ))}
        </section>
    );
};