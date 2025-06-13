import axios from "axios";
import { useEffect, useState } from "react"


const useFetchForCard = (slug) => {

    const [dataCard, setDataCard] = useState({});
    const [loadingCard, setLoading] = useState(true);
    const [errorCard, setError] = useState(null);

    useEffect(() => {
        if (!slug) return;
        const fetchForCard = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/service/${slug}/`);
                setDataCard(response.data)
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        }
        if (slug) { fetchForCard(); }
    }, [slug])


    return { dataCard, loadingCard, errorCard }
}

export default useFetchForCard