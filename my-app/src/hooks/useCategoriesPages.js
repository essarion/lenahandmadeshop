import axios from "axios";
import { useEffect, useState } from "react";

const useCategoriesPage = (category) => {
    const [dataCategory, setDataCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!category) return;
        console.log("Fetching category with slug:", category);
        const takeData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/category/${category}/`);
                setDataCategory(response.data)

            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        };
        takeData();
    }, [category]);

    return { dataCategory, loading, error }
}

export default useCategoriesPage